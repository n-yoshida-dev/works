#!/usr/bin/env node
// Qiita の記事一覧と public-profile/articles.json を突き合わせ、サイトに載っていない記事と、Qiita から消えた記事を一覧で出す。
// 目的：記事を書いたのに Writing に足し忘れる事故を拾う。載せるかどうかは人間が決めるので、未掲載があっても失敗にはしない。
// CI には入れない（外部 API に依存し、記事を書いた直後は未掲載が正しい状態のため）。月 1 回などに手で回す。
// 使い方：node scripts/check-articles.mjs   取得や読み込みに失敗したときだけ exit 1
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Qiita API v2。認証なしで 1 時間 60 回まで使える */
const QIITA_API = 'https://qiita.com/api/v2';

/** 1 ページの件数（Qiita API の上限） */
const PER_PAGE = 100;

/** profile.md の links から Qiita のユーザー名を取る。サイトに出しているリンクを正本にし、ここに名前を直書きしない */
export function qiitaUserFromProfile(profileText) {
  const m = profileText.match(/^\s*url:\s*https:\/\/qiita\.com\/([A-Za-z0-9_-]+)\/?\s*$/m);
  if (!m)
    throw new Error(
      'profile.md の links に Qiita のユーザーページ（https://qiita.com/<名前>）がありません',
    );
  return m[1];
}

/** URL を比べられる形にそろえる（末尾のスラッシュと大文字小文字の違いを無視する） */
function normalizeUrl(url) {
  return url.replace(/\/+$/, '').toLowerCase();
}

/**
 * Qiita の記事とサイトの記事を突き合わせる。
 * missing は Qiita にあってサイトに無い記事（新しい順）、gone はサイトにあって Qiita に無い記事（platform が qiita のものだけ）
 */
export function compareArticles(qiitaItems, siteArticles) {
  const siteUrls = new Set(siteArticles.map((a) => normalizeUrl(a.url)));
  const qiitaUrls = new Set(qiitaItems.map((i) => normalizeUrl(i.url)));
  const missing = qiitaItems
    .filter((i) => !siteUrls.has(normalizeUrl(i.url)))
    .map((i) => ({ title: i.title, url: i.url, createdAt: i.created_at.slice(0, 10) }))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const gone = siteArticles
    .filter((a) => a.platform === 'qiita' && !qiitaUrls.has(normalizeUrl(a.url)))
    .map((a) => ({ title: a.title, url: a.url }));
  return { missing, gone };
}

/** Qiita のユーザーの記事を、ページをめくって全部取る */
async function fetchQiitaItems(user) {
  const items = [];
  for (let page = 1; ; page++) {
    const url = `${QIITA_API}/users/${encodeURIComponent(user)}/items?per_page=${PER_PAGE}&page=${page}`;
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`Qiita API が ${res.status} を返しました: ${url}`);
    const batch = await res.json();
    items.push(...batch);
    if (batch.length < PER_PAGE) return items;
  }
}

// コマンドとして実行されたときだけ動く（テストから関数を読むときは走らせない）
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const profile = await readFile(path.join(root, 'public-profile/profile.md'), 'utf8');
    const site = JSON.parse(
      await readFile(path.join(root, 'public-profile/articles.json'), 'utf8'),
    );
    const user = qiitaUserFromProfile(profile);
    const items = await fetchQiitaItems(user);
    const { missing, gone } = compareArticles(items, site);

    console.log(
      `Qiita（${user}）の記事 ${items.length} 本、articles.json の記事 ${site.length} 本`,
    );
    console.log(`\nQiita にあってサイトに無い記事：${missing.length} 本（載せるかは人が決める）`);
    for (const a of missing) console.log(`  ${a.createdAt}  ${a.title}\n              ${a.url}`);
    console.log(`\nサイトにあって Qiita に無い記事：${gone.length} 本（消した・URL が変わった）`);
    for (const a of gone) console.log(`  ${a.title}\n              ${a.url}`);
  } catch (error) {
    console.error(`::error::記事の突き合わせができません: ${error.message}`);
    process.exit(1);
  }
}

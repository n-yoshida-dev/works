#!/usr/bin/env node
// public-profile/projects/*.md の repo と visibility を、GitHub の実際と突き合わせる。
// 目的：リポジトリを Public にした・アーカイブしたのに、サイトの表記が古いままになる事故を拾う（private の表記だとリンクを出さないため）。
// GitHub への問い合わせは gh コマンドで行う。非公開のリポジトリはログインしないと見えず、gh はログイン済みの権限で聞けるため。
// CI には入れない（非公開のリポジトリを見る権限が CI に無いため）。月 1 回などに手で回す。
// 使い方：node scripts/check-repos.mjs   食い違いか、確かめられない作品があれば exit 1
import { readFile, readdir } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const projectsDir = path.join(root, 'public-profile/projects');
const run = promisify(execFile);

/** frontmatter の `repo:` と `visibility:` を読む（簡易パーサ。1 行に 1 項目の形しか使わない） */
export function readRepoFields(text) {
  const front = text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  const repo = front.match(/^repo:\s*(\S+)\s*$/m)?.[1];
  const visibility = front.match(/^visibility:\s*(\S+)\s*$/m)?.[1];
  return { repo, visibility };
}

/** GitHub の repo の URL から owner/name を取り出す。GitHub 以外なら undefined */
export function repoSlug(url) {
  return url.match(/^https:\/\/github\.com\/([\w.-]+\/[\w.-]+?)(?:\.git)?\/?$/)?.[1];
}

/**
 * GitHub の状態をサイトの visibility の言葉にそろえる。
 * アーカイブ済みは公開状態にかかわらず archived（src/content.config.ts の visibility と同じ 3 語）
 */
export function siteVisibilityOf(github) {
  if (github.isArchived) return 'archived';
  return github.visibility.toLowerCase();
}

/**
 * 1 作品の判定。status は ok（一致）・mismatch（食い違い）・unknown（確かめられない）・skip（repo なし）
 * github は gh から取れた状態。取れなかったときは error に理由を入れて渡す
 * GitHub は改名前の URL を新しい名前へ転送するので、正式な名前（fullName）と違えば、公開状態が合っていても食い違いにする
 */
export function judge({ file, repo, visibility }, github) {
  if (!repo) return { file, status: 'skip', note: `repo なし（visibility: ${visibility}）` };
  if (github.error) return { file, status: 'unknown', note: github.error };
  const slug = repoSlug(repo);
  if (github.fullName && slug && github.fullName.toLowerCase() !== slug.toLowerCase()) {
    return { file, status: 'mismatch', note: `repo が古い名前（今は ${github.fullName}）` };
  }
  const actual = siteVisibilityOf(github);
  if (actual === visibility) return { file, status: 'ok', note: `${visibility}` };
  return { file, status: 'mismatch', note: `サイトは ${visibility}、GitHub は ${actual}` };
}

/** gh で repo の公開状態を聞く。開けないときは error を返す（例外にしない） */
async function fetchGithub(slug) {
  try {
    const { stdout } = await run('gh', [
      'api',
      `repos/${slug}`,
      '--jq',
      '{visibility, isArchived: .archived, fullName: .full_name}',
    ]);
    return JSON.parse(stdout);
  } catch (error) {
    if (error.code === 'ENOENT')
      throw new Error('gh コマンドがありません（GitHub CLI を入れて gh auth login）');
    const reason = (error.stderr || error.message).trim().split('\n')[0];
    return { error: `GitHub で開けない（${reason}）` };
  }
}

// コマンドとして実行されたときだけ動く（テストから関数を読むときは走らせない）
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const files = (await readdir(projectsDir)).filter((f) => f.endsWith('.md')).sort();
    const results = [];
    for (const file of files) {
      const fields = readRepoFields(await readFile(path.join(projectsDir, file), 'utf8'));
      if (!fields.repo) {
        results.push(judge({ file, ...fields }, {}));
        continue;
      }
      const slug = repoSlug(fields.repo);
      const github = slug
        ? await fetchGithub(slug)
        : { error: `GitHub の URL ではない: ${fields.repo}` };
      results.push(judge({ file, ...fields }, github));
    }

    const mark = { ok: 'OK  ', mismatch: '食違', unknown: '不明', skip: '--  ' };
    for (const r of results) console.log(`  ${mark[r.status]}  ${r.file}  ${r.note}`);
    const bad = results.filter((r) => r.status === 'mismatch' || r.status === 'unknown');
    if (bad.length > 0) {
      console.error(
        `\n::error::visibility の食い違い・確かめられない作品が ${bad.length} 件あります`,
      );
      process.exit(1);
    }
    console.log(
      `\nvisibility の食い違い：0 件（repo のある ${results.filter((r) => r.status === 'ok').length} 件を確認）`,
    );
  } catch (error) {
    console.error(`::error::repo の突き合わせができません: ${error.message}`);
    process.exit(1);
  }
}

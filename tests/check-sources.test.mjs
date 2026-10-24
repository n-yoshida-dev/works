// 手で回す検算（scripts/check-articles.mjs・check-repos.mjs）の突き合わせの規則を確かめる。
// Qiita と GitHub への問い合わせはせず、作り物のデータで判定だけを見る（実際の突き合わせは npm run check:articles / check:repos）
import { describe, it, expect } from 'vitest';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compareArticles, qiitaUserFromProfile } from '../scripts/check-articles.mjs';
import { judge, readRepoFields, repoSlug, siteVisibilityOf } from '../scripts/check-repos.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

describe('記事の突き合わせ（check:articles）', () => {
  const qiita = [
    { title: 'A', url: 'https://qiita.com/u/items/aaa', created_at: '2026-01-01T10:00:00+09:00' },
    { title: 'B', url: 'https://qiita.com/u/items/bbb', created_at: '2026-03-01T10:00:00+09:00' },
    { title: 'C', url: 'https://qiita.com/u/items/ccc', created_at: '2026-02-01T10:00:00+09:00' },
  ];

  it('Qiita にあってサイトに無い記事を新しい順に、サイトにあって Qiita に無い記事を出す', () => {
    const site = [
      { title: 'A', url: 'https://qiita.com/u/items/aaa/', platform: 'qiita' },
      { title: 'D', url: 'https://qiita.com/u/items/ddd', platform: 'qiita' },
      { title: 'Z', url: 'https://zenn.dev/u/articles/zzz', platform: 'zenn' },
    ];
    const { missing, gone } = compareArticles(qiita, site);
    expect(missing.map((a) => [a.title, a.createdAt])).toEqual([
      ['B', '2026-03-01'],
      ['C', '2026-02-01'],
    ]);
    // 末尾のスラッシュの違いは同じ記事とみなし、Qiita 以外の記事は Qiita に無くても数えない
    expect(gone.map((a) => a.title)).toEqual(['D']);
  });

  it('全部載っていれば両方とも空', () => {
    const site = qiita.map((i) => ({ title: i.title, url: i.url, platform: 'qiita' }));
    expect(compareArticles(qiita, site)).toEqual({ missing: [], gone: [] });
  });

  it('Qiita のユーザー名は profile.md のリンクから取り、無ければ止まる', async () => {
    const profile = await readFile(path.join(root, 'public-profile/profile.md'), 'utf8');
    expect(qiitaUserFromProfile(profile)).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(() => qiitaUserFromProfile('---\nlinks: []\n---\n')).toThrow('Qiita');
  });
});

describe('repo の公開状態の突き合わせ（check:repos）', () => {
  it('frontmatter の repo と visibility を読む。本文の同じ形の行は読まない', () => {
    const text =
      '---\ntitle: x\nrepo: https://github.com/o/x\nvisibility: public\n---\n\nrepo: https://github.com/o/other\n';
    expect(readRepoFields(text)).toEqual({ repo: 'https://github.com/o/x', visibility: 'public' });
    expect(readRepoFields('---\ntitle: y\nvisibility: archived\n---\n')).toEqual({
      repo: undefined,
      visibility: 'archived',
    });
  });

  it('GitHub の URL から owner/name を取り、GitHub 以外は取らない', () => {
    expect(repoSlug('https://github.com/n-yoshida-dev/works')).toBe('n-yoshida-dev/works');
    expect(repoSlug('https://github.com/o/x.git')).toBe('o/x');
    expect(repoSlug('https://github.com/o/x/')).toBe('o/x');
    expect(repoSlug('https://gitlab.com/o/x')).toBeUndefined();
  });

  it('アーカイブ済みは公開状態にかかわらず archived とみなす', () => {
    expect(siteVisibilityOf({ visibility: 'PUBLIC', isArchived: false })).toBe('public');
    expect(siteVisibilityOf({ visibility: 'private', isArchived: false })).toBe('private');
    expect(siteVisibilityOf({ visibility: 'public', isArchived: true })).toBe('archived');
  });

  it('一致・食い違い・確かめられない・repo なしを分ける', () => {
    const entry = { file: 'x.md', repo: 'https://github.com/o/x', visibility: 'private' };
    expect(judge(entry, { visibility: 'private', isArchived: false }).status).toBe('ok');
    const mismatch = judge(entry, { visibility: 'public', isArchived: false });
    expect(mismatch).toMatchObject({
      status: 'mismatch',
      note: 'サイトは private、GitHub は public',
    });
    expect(judge(entry, { error: 'GitHub で開けない（HTTP 404）' }).status).toBe('unknown');
    expect(judge({ file: 'y.md', visibility: 'archived' }, {}).status).toBe('skip');
  });
});

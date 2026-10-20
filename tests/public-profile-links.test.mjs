// public-profile 内の参照が壊れていないことを確かめる。
// projects/*.md の systems: が実在する systems/*.md を指しているか、本文のサイト内リンクの行き先があるか、articles.json の id が重複していないか。
import { describe, it, expect } from 'vitest';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'public-profile');

/** frontmatter の `systems: [a, b]` を読む（簡易パーサ。この形式しか使わない） */
async function readSystemsRefs(file) {
  const text = await readFile(file, 'utf8');
  const m = text.match(/^systems:\s*\[(.*?)\]\s*$/m);
  if (!m || !m[1].trim()) return [];
  return m[1].split(',').map((s) => s.trim());
}

describe('public-profile の参照整合', () => {
  it('projects の systems: は実在する systems を指す', async () => {
    const systems = (await readdir(path.join(root, 'systems')))
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.replace(/\.md$/, ''));
    const projects = (await readdir(path.join(root, 'projects'))).filter((f) => f.endsWith('.md'));
    for (const p of projects) {
      const refs = await readSystemsRefs(path.join(root, 'projects', p));
      for (const ref of refs) {
        expect(systems, `${p} の systems: "${ref}" に対応する systems/${ref}.md が無い`).toContain(
          ref,
        );
      }
    }
  });

  // 本文のサイト内リンク（`](/...)`）が、ビルドで作られるページを指しているか。
  // kind: tool の作品は /tools、それ以外は /projects の下にあり、詳細ページは本文のある作品だけ（src/lib/content.ts の hasDetail）
  it('本文のサイト内リンクは、ビルドで作られるページを指す', async () => {
    const pages = new Set(['/', '/projects', '/tools', '/systems', '/writing', '/ask']);
    const files = ['profile.md'];
    for (const dir of ['projects', 'systems']) {
      for (const f of (await readdir(path.join(root, dir))).filter((f) => f.endsWith('.md'))) {
        files.push(`${dir}/${f}`);
        const text = await readFile(path.join(root, dir, f), 'utf8');
        const body = text.replace(/^---\n[\s\S]*?\n---\n/, '').trim();
        const id = f.replace(/\.md$/, '');
        if (dir === 'systems') pages.add(`/systems/${id}`);
        else if (body)
          pages.add(`/${/^kind:\s*tool\s*$/m.test(text) ? 'tools' : 'projects'}/${id}`);
      }
    }
    for (const f of files) {
      const text = await readFile(path.join(root, f), 'utf8');
      for (const [, href] of text.matchAll(/\]\((\/[^)\s]*)\)/g)) {
        const target = href.replace(/[#?].*$/, '').replace(/\.md$/, '') || '/';
        // AI 向けのファイル（llms.txt など）は拡張子つきのまま置いてある
        if (/\.txt$/.test(target)) continue;
        expect(pages.has(target), `${f} のリンク ${href} の行き先がビルドで作られない`).toBe(true);
      }
    }
  });

  it('articles.json の id と url は重複しない', async () => {
    const articles = JSON.parse(await readFile(path.join(root, 'articles.json'), 'utf8'));
    const ids = articles.map((a) => a.id);
    const urls = articles.map((a) => a.url);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(urls).size).toBe(urls.length);
  });
});

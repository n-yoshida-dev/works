// トップの 5 節（SPEC.md §4）が、目次の定義（src/site.ts の SECTIONS）とページ（src/pages/index.astro）の両方にそろっていることを確かめる。
// PLAN「誰のためのものか」の 3 点（何の人か・何を作ったか・どう開発しているか）に当たる節が、それぞれ 1 つ以上あることも見る。
import { describe, it, expect } from 'vitest';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SECTIONS, sectionIdForPath } from '../src/site.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** SPEC.md §4 の 5 節。この順に並ぶ */
const EXPECTED = ['about', 'projects', 'systems', 'articles', 'ask'];

/** PLAN「誰のためのものか」の 3 点と、それを読み取れる節 */
const THREE_POINTS = {
  何の人か: 'about',
  何を作ったか: 'projects',
  どう開発しているか: 'systems',
};

describe('トップの 5 節', () => {
  it('SECTIONS が SPEC の 5 節をこの順に持つ', () => {
    expect(SECTIONS.map((s) => s.id)).toEqual(EXPECTED);
    for (const s of SECTIONS) expect(s.label.length, `${s.id} の label`).toBeGreaterThan(0);
  });

  it('index.astro に 5 節すべてが 1 回ずつある', async () => {
    const page = await readFile(path.join(root, 'src/pages/index.astro'), 'utf8');
    for (const id of EXPECTED) {
      const count = page.match(new RegExp(`<HomeSection id="${id}"`, 'g'))?.length ?? 0;
      expect(count, `<HomeSection id="${id}"> の数`).toBe(1);
    }
  });

  // ここでは節の定義があることだけを見る。節に中身が出ているかは、ビルドの後に scripts/check-home.mjs（npm run check:home）が見る
  it('3 点（何の人か・何を作ったか・どう開発しているか）に当たる節がある', () => {
    for (const [point, id] of Object.entries(THREE_POINTS)) {
      expect(
        SECTIONS.some((s) => s.id === id),
        `「${point}」の節 ${id}`,
      ).toBe(true);
    }
  });

  it('「すべて →」の行き先は既存のページを指す', async () => {
    const pages = path.join(root, 'src/pages');
    for (const s of SECTIONS) {
      if (!s.more) continue;
      const name = s.more.href.slice(1);
      const candidates = [`${name}.astro`, `${name}/index.astro`].map((f) => path.join(pages, f));
      const exists = await Promise.all(
        candidates.map((f) =>
          readFile(f).then(
            () => true,
            () => false,
          ),
        ),
      );
      expect(exists.some(Boolean), `${s.id} の行き先 ${s.more.href} のページ`).toBe(true);
    }
  });

  it('詳しい版のページを、その節に対応づける', () => {
    expect(sectionIdForPath('/projects')).toBe('projects');
    expect(sectionIdForPath('/projects/orgflow')).toBe('projects');
    expect(sectionIdForPath('/systems/learning-system')).toBe('systems');
    expect(sectionIdForPath('/ask')).toBe('ask');
    expect(sectionIdForPath('/')).toBeUndefined();
    expect(sectionIdForPath('/llms.txt')).toBeUndefined();
  });
});

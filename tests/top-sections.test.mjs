// トップの About 以外の短い版（SPEC.md §4。2026-10-03 に見本から選んだ形）を作る読み取り処理（src/lib/outline.ts）を確かめる。
// About の要点の Markdown 版（highlightLine）・Writing の連載 × 公開月の表（articleCalendar）。
// 実際の public-profile で空にならないことと、読み取りの規則そのものを見る。
import { describe, it, expect } from 'vitest';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { articleCalendar, highlightLine } from '../src/lib/outline.ts';

describe('About の要点の Markdown 版', () => {
  it('「- 小見出し：見出し。補足」の 1 行になり、補足が無ければ見出しで終わる', () => {
    expect(highlightLine({ label: '何の人か', title: '見出し', detail: '補足' })).toBe(
      '- 何の人か：見出し。補足',
    );
    expect(highlightLine({ label: '何の人か', title: '見出し' })).toBe('- 何の人か：見出し');
  });
});

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

describe('トップの Writing の連載 × 公開月', async () => {
  const articles = JSON.parse(
    await readFile(path.join(root, 'public-profile/articles.json'), 'utf8'),
  );
  const cal = articleCalendar(articles);

  it('すべての記事がどこかの月に 1 回ずつ数えられる', () => {
    const counted = cal.rows.reduce((sum, r) => sum + r.perMonth.reduce((a, b) => a + b, 0), 0);
    expect(counted).toBe(articles.length);
    for (const r of cal.rows) {
      expect(
        r.perMonth.reduce((a, b) => a + b, 0),
        `${r.series} の合計`,
      ).toBe(r.total);
      expect(r.perMonth.length).toBe(cal.months.length);
    }
  });

  it('連載は最初の記事が古い順、最新はいちばん新しい記事', () => {
    const firstMonth = (r) => r.perMonth.findIndex((n) => n > 0);
    const order = cal.rows.map(firstMonth);
    expect(order).toEqual([...order].sort((a, b) => a - b));
    const newest = [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))[0];
    expect(cal.latest?.url).toBe(newest.url);
  });

  it('記事の無い月も列に入り、連載の無い記事は「その他」にまとまる', () => {
    const made = articleCalendar([
      { title: 'a', url: 'https://example.com/a', publishedAt: '2025-11-03', series: 'S' },
      { title: 'b', url: 'https://example.com/b', publishedAt: '2026-02-10' },
    ]);
    expect(made.months).toEqual(['2025-11', '2025-12', '2026-01', '2026-02']);
    expect(made.rows).toEqual([
      { series: 'S', total: 1, perMonth: [1, 0, 0, 0] },
      { series: 'その他', total: 1, perMonth: [0, 0, 0, 1] },
    ]);
    expect(made.latest?.series).toBe('その他');
  });

  it('記事が無ければ空を返す（例外にしない）', () => {
    expect(articleCalendar([])).toEqual({ months: [], rows: [] });
  });
});

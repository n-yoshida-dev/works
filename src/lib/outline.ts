// トップの短い版に出す「骨格」を、public-profile のデータから取り出す処理。
// 本文を 2 か所で持たないための処理（SPEC.md §4：HTML と Markdown 版が同じデータから作られる）。
// 対象は public-profile の書き方に合わせた最小限の処理で、汎用の Markdown パーサではない。

/** 記事 1 本のうち、連載 × 公開月の表に要る項目（articles.json の形） */
export interface CalendarArticle {
  title: string;
  url: string;
  publishedAt: string;
  series?: string;
}

/** トップの Articles 節の「連載 × 公開月」の表 */
export interface ArticleCalendar {
  /** 列になる月（YYYY-MM）。最初の記事の月から最後の記事の月まで、記事の無い月も含めて古い順 */
  months: string[];
  /** 行になる連載。最初の記事が古い順（学んだ順） */
  rows: { series: string; total: number; perMonth: number[] }[];
  /** いちばん新しい記事。記事が無ければ undefined */
  latest?: CalendarArticle & { series: string };
}

/** 連載の無い記事をまとめる名前（content.ts の groupArticlesBySeries と同じ） */
const NO_SERIES = 'その他';

/** トップの要点 1 つ（profile.md の highlights）を、Markdown 版の 1 行にする。「- 何の人か：見出し。補足」 */
export function highlightLine(h: { label: string; title: string; detail?: string }): string {
  return `- ${h.label}：${h.title}${h.detail ? `。${h.detail}` : ''}`;
}

/** 「YYYY-MM」の翌月 */
function nextMonth(month: string): string {
  const [y, m] = month.split('-').map(Number);
  return m === 12 ? `${y + 1}-01` : `${y}-${String(m + 1).padStart(2, '0')}`;
}

/**
 * 記事の一覧から、トップの Articles 節の「連載 × 公開月」の表を作る（■ 1 つが記事 1 本）。
 * 月は最初の記事の月から最後の記事の月まで切れ目なく並べ、連載は最初の記事が古い順に並べる（階段状になり、学んだ順が読める）
 */
export function articleCalendar(articles: CalendarArticle[]): ArticleCalendar {
  if (articles.length === 0) return { months: [], rows: [] };
  const sorted = [...articles].sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));
  const first = sorted[0].publishedAt.slice(0, 7);
  const last = sorted[sorted.length - 1].publishedAt.slice(0, 7);
  const months = [first];
  while (months[months.length - 1] < last) months.push(nextMonth(months[months.length - 1]));

  // 古い順に見ていくので、Map への登録順がそのまま「最初の記事が古い順」になる
  const rows = new Map<string, { series: string; total: number; perMonth: number[] }>();
  for (const a of sorted) {
    const series = a.series ?? NO_SERIES;
    const row = rows.get(series) ?? { series, total: 0, perMonth: months.map(() => 0) };
    row.total += 1;
    row.perMonth[months.indexOf(a.publishedAt.slice(0, 7))] += 1;
    rows.set(series, row);
  }
  const newest = sorted[sorted.length - 1];
  return {
    months,
    rows: [...rows.values()],
    latest: { ...newest, series: newest.series ?? NO_SERIES },
  };
}

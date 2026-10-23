// サイト全体で使う定数。ここ以外にサイト名や GitHub アカウントを直書きしない。
import type { IconName } from './lib/icons';

export const SITE = {
  /**
   * サイトの名前。表紙の見出し・左の目次の一番上・llms.txt の見出しに出す。
   * 本名を題名にせず「works」にし、持ち主は表紙の名前の下に小さく添える（2026-10-23 ユーザーがコンペの後に決めた。logs/decisions.md）
   */
  name: 'works',
  /** <title> の末尾と OGP の site_name */
  title: 'works',
  /** 持ち主の名前。表紙の名前の下の行・フッターの著作権表示・AI への依頼文に出す */
  owner: 'Naoki Yoshida',
  // 職種の言葉は入れない。作っているものだけを書く（logs/decisions.md 2026-10-20「About の一言から仕事の年数を外す」）
  description:
    'Personal apps, tools for AI-assisted development, and the systems behind them. 生活や学習で使うアプリと、AI と開発するための道具・仕組み、その記録の技術記事を公開しています。',
  github: 'n-yoshida-dev',
  githubUrl: 'https://github.com/n-yoshida-dev',
  qiitaUrl: 'https://qiita.com/n-yoshida-dev',
  // このサイトのリポジトリへのリンク（repoUrl）は 2026-10-20 に外した。リポジトリを Private にするため、訪問者に 404 を見せない
  locale: 'ja_JP',
} as const;

/**
 * Ask AI（/ask）への入口のボタンの言葉。トップの Ask AI 節・右下の追従ボタン・/ask の見出しとタブで同じ言葉を使う。
 * このサイトはポートフォリオではないので「portfolio」を使わない（2026-10-14 ユーザーが選択。logs/decisions.md）
 */
export const ASK_BUTTON_LABEL = 'Ask AI about this site';

/**
 * 左の目次の下に並べるリンク（アイコン付き）。2026-10-06 ユーザーが見本 B を選択（logs/decisions.md）：
 * トップの表紙には置かない（表紙のすぐ下に、説明つきのリンクカードがあるため）。
 * llms.txt は人間には説明なしで伝わらないので、ここには置かず、トップの Ask AI 節とフッターに説明つきで置く
 */
export const QUICK_LINKS: readonly { label: string; href: string; icon: IconName }[] = [
  { label: 'GitHub', href: SITE.githubUrl, icon: 'code' },
  { label: 'Qiita', href: SITE.qiitaUrl, icon: 'pen' },
] as const;

/** トップの 1 節。目次（左の固定目次）と、トップの見出し・「すべて →」の行き先を同じ定義から作る */
export interface Section {
  /** `<section id>` と目次リンクの `#id`。変えるときは index.astro の `<HomeSection id>` も一緒に変える */
  id: string;
  /** 目次とトップの見出しに出す名前 */
  label: string;
  /** 詳しい版のページ。無い節（About）は「すべて →」を出さない */
  more?: { href: string; label: string };
  /**
   * トップの見出しのすぐ下に出す「これは何か」の 1 行（2026-10-22 ユーザーの提案。表紙の要点 3 行の代わり）。
   * 節の中に読み方の説明を持つ節（Writing・Ask AI）と、表紙の中にある About は持たない
   */
  lead?: string;
}

/**
 * トップの 6 節。この順に縦に並べ、左の目次もこの順（SPEC.md）。
 * Projects は使うもの、Tools は入れるもの、Systems は読むもの（logs/decisions.md 2026-10-20）。
 * 節を増やす・減らすときはここと index.astro を直す（tests/home-sections.test.mjs が両方の一致を確かめる）
 */
export const SECTIONS: readonly Section[] = [
  { id: 'about', label: 'About' },
  {
    id: 'projects',
    label: 'Projects',
    more: { href: '/projects', label: 'すべてのプロジェクト' },
    lead: '生活や学習のために作ったアプリです。',
  },
  {
    id: 'tools',
    label: 'Tools',
    more: { href: '/tools', label: 'すべてのツール' },
    lead: '開発で使うために作った道具です。Claude Code のプラグインなど。',
  },
  {
    id: 'systems',
    label: 'Systems',
    more: { href: '/systems', label: 'すべての仕組み' },
    lead: 'アプリや道具を組み合わせた、開発・学習・読書の進め方です。',
  },
  { id: 'writing', label: 'Writing', more: { href: '/writing', label: 'すべての記事' } },
  { id: 'ask', label: 'Ask AI' },
] as const;

/** 現在のパスが属する節の id。詳しい版のページ（/projects など）とその配下を、その節に対応づける */
export function sectionIdForPath(pathname: string): string | undefined {
  const path = pathname.replace(/\/$/, '') || '/';
  if (path === '/ask') return 'ask';
  return SECTIONS.find(
    (s) => s.more && (path === s.more.href || path.startsWith(s.more.href + '/')),
  )?.id;
}

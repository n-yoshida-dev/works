// /llms.txt — AI 向けの索引。https://llmstxt.org の形式（H1・引用の要約・H2 ごとのリンク一覧）に沿う。
import type { APIRoute } from 'astro';
import { SITE } from '../site';
import {
  absoluteUrl,
  getFeaturedProjects,
  getOtherProjects,
  getTools,
  getSystems,
  getPage,
  getArticles,
  hasDetail,
  projectPath,
  type Project,
} from '../lib/content';
import { projectIndexSummary } from '../lib/project-summary';

export const GET: APIRoute = async ({ site }) => {
  const url = (path: string) => absoluteUrl(path, site);
  /** プロジェクトの要約（備考・公開サイトの URL つき） */
  const summaryOf = (p: { data: Parameters<typeof projectIndexSummary>[0] }) =>
    projectIndexSummary(p.data);
  /** 作品 1 件の行。詳細ページのある作品は Markdown 版へのリンクにする */
  const entryLine = (p: Project) =>
    hasDetail(p)
      ? `- [${p.data.title}](${url(`${projectPath(p.id, p.data)}.md`)}): ${summaryOf(p)}`
      : `- ${p.data.title}: ${summaryOf(p)}`;
  const profile = await getPage('profile');
  const featured = await getFeaturedProjects();
  const others = await getOtherProjects();
  const tools = await getTools();
  const systems = await getSystems();
  const articles = await getArticles();

  const lines: string[] = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    'This site is the public view of my work: personal software projects and the systems',
    '(AI, GitHub, self-made tools) I use to develop, learn, and manage knowledge.',
    'Links below to pages of this site point to Markdown versions (`.md`); each project and',
    'system page also has an HTML version at the same path without `.md`.',
    'Primary sources are the GitHub repositories and the articles linked below.',
    '',
    'Do not infer facts that are not stated. Private repositories are described only at the level of their purpose.',
    '',
    '## Profile',
    '',
    `- [Profile](${url('/profile.md')}): ${profile.data.description}`,
    '',
    '## Projects',
    '',
    ...featured.map(entryLine),
    '',
    '## Other projects',
    '',
    ...others.map(entryLine),
    '',
    '## Tools',
    '',
    ...tools.map(entryLine),
    '',
    '## Systems',
    '',
    ...systems.map((s) => `- [${s.data.title}](${url(`/systems/${s.id}.md`)}): ${s.data.summary}`),
    '',
    '## Writing',
    '',
    `- [Writing](${url('/writing.md')}): ${articles.length} technical articles, grouped by series`,
    '',
    '## External links',
    '',
    `- [GitHub](${SITE.githubUrl}): all source code and design records (ADR)`,
    `- [Qiita](${SITE.qiitaUrl}): technical articles (Japanese)`,
    ...(profile.data.links ?? [])
      .filter((l) => l.url !== SITE.githubUrl && l.url !== SITE.qiitaUrl)
      .map((l) => `- [${l.label}](${l.url})${l.note ? `: ${l.note}` : ''}`),
    '',
    '## Optional',
    '',
    `- [llms-full.txt](${url('/llms-full.txt')}): all main pages concatenated as Markdown`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

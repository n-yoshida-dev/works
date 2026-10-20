// /tools/<slug>.md — ツール詳細の Markdown 版。HTML 版と同じ条件（kind: tool・本文あり）でだけ作る
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { projectToMarkdown, markdownResponse, hasDetail, type Project } from '../../lib/content';

export const getStaticPaths: GetStaticPaths = async () => {
  const tools = await getCollection('projects', (p) => p.data.kind === 'tool' && hasDetail(p));
  return tools.map((project) => ({ params: { slug: project.id }, props: { project } }));
};

export const GET: APIRoute<{ project: Project }> = ({ props, site }) =>
  markdownResponse(projectToMarkdown(props.project, site));

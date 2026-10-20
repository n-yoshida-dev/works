// llms.txt の作品の行に出す要約（src/lib/project-summary.ts の projectIndexSummary）を確かめる。
// コードを AI が書いた作品には備考を、公開サイトのある作品には URL を、この順で続ける
import { describe, it, expect } from 'vitest';
import {
  projectIndexSummary,
  projectPath,
  publicRepoUrl,
  VIBE_CODING_NOTE,
} from '../src/lib/project-summary.ts';

describe('作品の詳細ページのパス', () => {
  it('tool は /tools、app は /projects の下に置く', () => {
    expect(projectPath('claude-plugins', { kind: 'tool' })).toBe('/tools/claude-plugins');
    expect(projectPath('orgflow', { kind: 'app' })).toBe('/projects/orgflow');
  });
});

describe('サイトに出すリポジトリの URL', () => {
  const repo = 'https://github.com/n-yoshida-dev/example';

  it('Private の作品は URL を出さない（開くと 404 になるため）', () => {
    expect(publicRepoUrl({ visibility: 'private', repo })).toBeUndefined();
  });

  it('Public と Archive の作品は URL をそのまま出す', () => {
    expect(publicRepoUrl({ visibility: 'public', repo })).toBe(repo);
    expect(publicRepoUrl({ visibility: 'archived', repo })).toBe(repo);
  });

  it('repo を書いていなければ、どの公開状態でも出さない', () => {
    expect(publicRepoUrl({ visibility: 'public' })).toBeUndefined();
  });
});

describe('llms.txt の作品の行の要約', () => {
  const summary = '学習ログを AI に読ませて理解度を判定する。';
  const site = 'https://example.com/app/';

  it('備考も公開サイトも無い作品は、要約だけ', () => {
    expect(projectIndexSummary({ summary, vibeCoding: false })).toBe(summary);
  });

  it('コードを AI が書いた作品は、要約の後ろに備考が付く', () => {
    expect(projectIndexSummary({ summary, vibeCoding: true })).toBe(
      `${summary}${VIBE_CODING_NOTE}`,
    );
  });

  it('公開サイトのある作品は、要約の後ろに URL が付く', () => {
    expect(projectIndexSummary({ summary, vibeCoding: false, site })).toBe(
      `${summary} Live site: ${site}`,
    );
  });

  it('両方ある作品は、備考の後ろに URL が付く', () => {
    expect(projectIndexSummary({ summary, vibeCoding: true, site })).toBe(
      `${summary}${VIBE_CODING_NOTE} Live site: ${site}`,
    );
  });
});

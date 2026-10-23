// ビルド後の dist/ の検査（scripts/check-dist.mjs）の回帰テスト。
// 実際の dist への検査は CI のビルドの後に走る（この単体テストはビルド前に走るため、作り物の dist で規則だけを見る）
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadDistRules, scanDist } from '../scripts/check-dist.mjs';
import { scanText } from '../scripts/check-public-profile.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const script = path.join(root, 'scripts/check-dist.mjs');
const run = promisify(execFile);

/** 問題の無い dist の中身（ファイル名 → 本文） */
const CLEAN = {
  'index.html': '<html><body><h1>works</h1><a href="/projects">Projects</a></body></html>',
  'llms.txt': '# works\n\n- [Projects](https://example.invalid/projects)\n',
  'tools/claude-plugins.md':
    '# claude-plugins\n\n[skills](https://github.com/n-yoshida-dev/claude-plugins/tree/main/plugins/apps-workflow/skills)\n',
  'sitemap-0.xml': '<urlset><url><loc>https://example.invalid/writing/</loc></url></urlset>',
};

let tmp;

/** 作り物の dist を tmp の下に作り、その場所を返す */
async function makeDist(name, files) {
  const dir = path.join(tmp, name);
  for (const [file, body] of Object.entries(files)) {
    await mkdir(path.dirname(path.join(dir, file)), { recursive: true });
    await writeFile(path.join(dir, file), body);
  }
  return dir;
}

beforeAll(async () => {
  tmp = await mkdtemp(path.join(os.tmpdir(), 'check-dist-'));
});

afterAll(async () => {
  await rm(tmp, { recursive: true, force: true });
});

describe('dist の禁止語スキャン', () => {
  it('問題の無い dist は合格', async () => {
    const dir = await makeDist('clean', CLEAN);
    expect(await scanDist(dir, await loadDistRules())).toEqual([]);
  });

  it('Markdown 版にだけ書いたキャリア系の語を、ファイル名とまわりの文字つきで検出する', async () => {
    const dir = await makeDist('career-md', {
      ...CLEAN,
      'profile.md': '# Naoki Yoshida\n\nこれまでの経歴は次のとおり。\n',
    });
    const hits = await scanDist(dir, await loadDistRules());
    expect(hits).toHaveLength(1);
    expect(hits[0]).toMatchObject({ file: 'profile.md', line: 3, rule: 'career', matched: '経歴' });
    expect(hits[0].text).toContain('これまでの経歴は');
  });

  it('1 行の長い HTML では、行全体ではなくヒットのまわりだけを出す', async () => {
    const long = `<p>${'あ'.repeat(500)}習熟度${'い'.repeat(500)}</p>`;
    const dir = await makeDist('long-html', { ...CLEAN, 'index.html': long });
    const [hit] = await scanDist(dir, await loadDistRules());
    expect(hit.matched).toBe('習熟度');
    expect(hit.text.length).toBeLessThan(100);
  });

  it('前身のサイトのページとリポジトリへの参照を検出し、ほかのリポジトリの skills は見逃す', async () => {
    const rules = await loadDistRules();
    const bad = [
      '<a href="/skills">Skills</a>',
      '<a href="/journey/">Journey</a>',
      '<loc>https://example.invalid/skills/</loc>',
      '- [Journey](/journey.md)',
      'https://github.com/n-yoshida-dev/portfolio',
    ];
    for (const text of bad) {
      expect(scanText(text, rules).length, `検出されなかった: ${text}`).toBeGreaterThan(0);
    }
    const ok = [
      'https://github.com/n-yoshida-dev/claude-plugins/tree/main/plugins/apps-workflow/skills',
      '<a href="/projects/skill-matrix">skill-matrix</a>',
      'https://github.com/n-yoshida-dev/portfolio-site-template',
      'Astro を使い、PLAN.md と Playwright で確かめる',
    ];
    for (const text of ok) {
      expect(scanText(text, rules), `誤検知: ${text}`).toEqual([]);
    }
  });

  it('画像・CSS・JS は検査しない', async () => {
    const dir = await makeDist('assets', { ...CLEAN, '_astro/app.js': 'const x = "経歴";' });
    expect(await scanDist(dir, await loadDistRules())).toEqual([]);
  });

  it('コマンドとして実行すると、ヒットがあれば終了コード 1、無ければ 0', async () => {
    const clean = await makeDist('cli-clean', CLEAN);
    await expect(run(process.execPath, [script, clean])).resolves.toBeDefined();

    const dirty = await makeDist('cli-dirty', { ...CLEAN, 'llms-full.txt': '職務の内容\n' });
    const failed = await run(process.execPath, [script, dirty]).catch((error) => error);
    expect(failed.code).toBe(1);
    expect(failed.stderr).toContain('[career]');
  });

  it('検査するファイルが無い（ビルド前の）場所では、合格にせず終了コード 1', async () => {
    const empty = await makeDist('empty', { 'favicon.svg': '<svg/>' });
    const failed = await run(process.execPath, [script, empty]).catch((error) => error);
    expect(failed.code).toBe(1);
  });
});

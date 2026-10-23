#!/usr/bin/env node
// ビルド後の dist/ 全体（HTML・Markdown 版・llms*.txt・サイトマップ）を禁止語パターンで検査する。
// 目的：public-profile/ の検査（npm run lint）は元の文章しか見ない。ページ側の定型文や生成の仕組みから、HTML に出ないものが Markdown 版や llms に出る事故をここで止める。
// 規則は public-profile/ と同じもの（rules）に、dist だけで見るもの（distOnlyRules。前身のサイトのページとリポジトリへの参照）を足す。
// 使い方：node scripts/check-dist.mjs [dist ディレクトリ]   ヒットがあれば exit 1
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadRules, scanText } from './check-public-profile.mjs';

/** 検査するファイルの拡張子。画像・CSS・JS は文章を持たないので見ない */
const TARGET = /\.(html|md|txt|xml)$/i;

/** ヒットの前後に出す文字数。HTML は 1 行がとても長いので、行全体ではなくまわりだけを出す */
const CONTEXT = 40;

/** dist の下の検査対象のファイルを、並べた順で返す */
async function listTargets(dir) {
  const entries = await readdir(dir, { recursive: true, withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && TARGET.test(e.name))
    .map((e) => path.join(e.parentPath, e.name))
    .sort();
}

/** public-profile/ と同じ規則に、dist だけの規則を足して読み込む */
export async function loadDistRules() {
  return [...(await loadRules()), ...(await loadRules(undefined, 'distOnlyRules'))];
}

/** dist 全体を検査し、ヒットを返す（ファイル名は dist からの相対） */
export async function scanDist(dir, rules) {
  const files = await listTargets(dir);
  if (files.length === 0)
    throw new Error(`${dir} に検査するファイルがありません（先に npm run build）`);
  const hits = [];
  for (const file of files) {
    const text = await readFile(file, 'utf8');
    const lines = text.split('\n');
    for (const hit of scanText(text, rules, path.relative(dir, file))) {
      const line = lines[hit.line - 1];
      const from = Math.max(0, hit.column - 1 - CONTEXT);
      const to = hit.column - 1 + hit.matched.length + CONTEXT;
      hits.push({ ...hit, text: line.slice(from, to).trim() });
    }
  }
  return hits;
}

// コマンドとして実行されたときだけ検査する（テストから関数を読むときは走らせない）
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const dist = process.argv[2] ?? 'dist';
  let hits;
  try {
    hits = await scanDist(dist, await loadDistRules());
  } catch (error) {
    console.error(`::error::dist の検査を始められません: ${error.message}`);
    process.exit(1);
  }
  if (hits.length > 0) {
    console.error(
      `::error::dist の禁止語スキャン: ${hits.length} 件ヒット。元の文章かページ側を書き直してください（許可リストはありません）`,
    );
    for (const h of hits) {
      console.error(`  ${h.file}:${h.line}:${h.column}  [${h.rule}] ${h.reason}`);
      console.error(`      一致: "${h.matched}"  まわり: ${h.text}`);
    }
    process.exit(1);
  }
  console.log(`dist の禁止語スキャン: 問題なし（${dist}）`);
}

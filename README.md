# works

[Naoki Yoshida](https://github.com/n-yoshida-dev) の制作活動ハブ。
自作アプリ（Projects）、AI・GitHub・自作ツールを組み合わせた開発・学習・知識管理の仕組み（Systems）、技術記事（Articles）を紹介する静的サイト。
AI がこのサイトを調べるための入口（`/llms.txt`、各ページの Markdown 版、Ask AI ページ）も持つ。

公開 URL：まだ無い（Vercel の新しいプロジェクトを作ってから載せる）

## 構成

```text
works/
├── public-profile/          ← 公開してよい情報だけの正本（手動管理の Markdown / JSON）
│   ├── profile.md           ← トップに出す自己紹介とリンク
│   ├── articles.json        ← Articles（技術記事へのリンク）
│   ├── projects/*.md        ← Projects。1 ファイル 1 リポジトリ
│   └── systems/*.md         ← Systems。1 ファイル 1 仕組み
├── src/
│   ├── content.config.ts    ← public-profile の frontmatter の型（ここに合わないとビルドが失敗する）
│   ├── lib/                 ← データ取得・Markdown 変換・Ask AI のプロンプト
│   ├── layouts/ components/ styles/
│   └── pages/               ← ルーティング。*.md.ts と llms*.txt.ts は AI 向けのテキスト出力
├── scripts/
│   ├── check-public-profile.mjs   ← 禁止語スキャン（npm run lint）
│   ├── public-profile-rules.json  ← 禁止語パターンと理由
│   ├── generate-og.mjs            ← OGP 画像の生成（public/og.png）
│   └── check-home.mjs             ← ビルドしたトップに 3 点が中身つきで出ているかの検査
├── tests/                   ← スキャンの回帰テスト、public-profile の参照整合・詳細ページの本文の長さ・トップの節のテスト
└── .github/workflows/ci.yml
```

技術：[Astro](https://astro.build)（静的出力）+ TypeScript + 素の CSS。ライブラリは最小限にし、JavaScript は Ask AI のプロンプトのコピーと目次のスクロール監視だけ。
ホスティングは Vercel（`vercel.json` は URL の末尾スラッシュを揃えるためだけにある）。

## ページ

| URL                | 内容                                                                                                                                      | Markdown 版           |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `/`                | Home。1 枚のページに 5 節（About / Projects / Systems / Articles / Ask AI）を短い版で並べ、About と Ask AI 以外の節から「すべて →」で下へ | `/profile.md`         |
| `/projects`        | Projects 一覧                                                                                                                             | —                     |
| `/projects/<slug>` | Projects 詳細（本文があるものだけ）                                                                                                       | `/projects/<slug>.md` |
| `/systems`         | Systems 一覧                                                                                                                              | —                     |
| `/systems/<slug>`  | Systems 詳細                                                                                                                              | `/systems/<slug>.md`  |
| `/articles`        | Articles（連載ごと）                                                                                                                      | `/articles.md`        |
| `/ask`             | Ask AI（プロンプトのコピーと各 AI へのリンク）                                                                                            | —                     |
| `/llms.txt`        | AI 向け索引（[llmstxt.org](https://llmstxt.org) 形式）                                                                                    | —                     |
| `/llms-full.txt`   | 主要ページの Markdown を 1 ファイルに連結                                                                                                 | —                     |

## 開発

```bash
npm ci
npm run dev          # http://localhost:4321
npm run build        # dist/ に静的出力
npm run preview      # ビルド結果の確認。AI エージェントから起動すると裏で動き続けるので npx astro preview stop で止める
```

CI と同じ検査をまとめて回す：

```bash
npm run format:check && npm run lint && npm run typecheck && npm run test && npm run build && npm run check:home
```

| コマンド               | 内容                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| `npm run format:check` | Prettier（`public-profile/` の Markdown は対象外）                                               |
| `npm run lint`         | `public-profile/` の禁止語スキャン                                                               |
| `npm run typecheck`    | `astro check`（Astro / TypeScript の型検査）                                                     |
| `npm run test`         | Vitest                                                                                           |
| `npm run build`        | ビルド。frontmatter が型に合わないとここで失敗する                                               |
| `npm run check:home`   | ビルドしたトップに、3 点（何の人か・何を作ったか・どう開発しているか）の節が中身つきで出ているか |

OGP 画像を作り直すとき：`node scripts/generate-og.mjs`（文言は同スクリプト内）。

## コンテンツの更新

すべて `public-profile/` の編集で完結する。コードは触らない。

- **プロジェクトを足す**：`public-profile/projects/<slug>.md` を作る。frontmatter の項目は `src/content.config.ts` を参照。
  `featured: true` で主要プロジェクト、`false` で Other / Experiments。本文が空なら詳細ページは作られない（一覧だけに出る）。
  `vibeCoding: true` はコードを AI が書いた作品に付ける（カード・詳細ページ・Markdown 版・llms.txt に備考が出る）
- **仕組みを足す**：`public-profile/systems/<slug>.md` を作る。`order` で並び順
- **一覧のカードの一文**：`tagline` に一文で書く（句点「。」なし・60 字以内。破ると `npm run build` が落ちる）
- **詳細ページの本文が長いとき**（本文 400 字超）：frontmatter に `highlights`（要点。3 行まで）を足す。書き忘れると `npm run test` が落ちる
- **記事を足す**：`public-profile/articles.json` に 1 要素足す。`series` で連載ごとにまとまる
- **トップの文章を直す**：`profile.md` の frontmatter。`tagline`・`highlights`・`links` だけがトップに出る。本文は Markdown 版と `/llms-full.txt` に出る

反映は `npm run build` が通れば完了。`main` へマージすると Vercel が自動でデプロイする。

## 公開してよい情報の線引き

このリポジトリは公開を前提にしている。`public-profile/` は、非公開の正本群から「一般公開して問題ない、作ったもの・仕組み・記事の情報」だけを **手で抜き出したもの** で、自動同期はしない。

**このサイトはキャリアの情報を載せない。** これまでの仕事の内容・技術の到達度の評価・取得した認定は、別の非公開の置き場で扱う。このサイトからそこへのリンク・案内は置かない。

**ほかに書かないもの**：家族、金銭、住所、生年月日・年齢、勤め先の名前と内部情報、人事評価・給与、健康、連絡先、認証情報、ローカルのパス。

- `npm run lint` がパターンを機械的に検査する（`scripts/public-profile-rules.json`）。ヒットしたら **書き直す**。許可リストは作らない
- パターンにできないもの（会社名・製品名・固有の案件名）は、PR を出す前に目視で確認する
- 非公開のリポジトリは「存在と目的」だけを書き、中身は書かない

## ライセンス

コード（`src/` `scripts/` `tests/` 設定ファイル）は MIT（[LICENSE](LICENSE)）。
`public-profile/` の文章と `public/og.png` は著作権を留保する（引用・要約は自由。丸ごとの転載は不可）。

## 開発ドキュメント（AI 向け）

`PLAN.md`（何を・なぜ）/ `SPEC.md`（確定仕様）/ `TODO.md`（タスク）/ `KNOWLEDGE.md`（技術判断とハマりどころ）/
`HANDOFF.md`（現在地）/ `logs/decisions.md`（合意した判断の台帳）。

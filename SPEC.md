# SPEC

**実装が参照する正本。** ユーザーの確認を経たものだけを書く。何を作るか・なぜ作るかは `PLAN.md`、決めた理由は `logs/decisions.md`。
見た目の値と部品の形は `DESIGN.md`（値の正本は `src/styles/global.css`）、人間向けの構成・運用・公開してよい情報の線引きは `README.md`。同じ事実を二重に書かない。
コードのコメントの「SPEC.md §3」「§4」は、この文書の節を指す。

## 1. コンテンツモデル（`public-profile/`）

型の正本は `src/content.config.ts`。ここには意味だけを書く。

| コレクション | 場所 | 主な項目 | 用途 |
|---|---|---|---|
| `projects` | `projects/*.md` | title / kind（app・tool）/ tagline / summary / repo / site / visibility（public・private・archived）/ status（active・paused・done・archived）/ period / stack / featured / homeWide / vibeCoding / order / systems / highlights | `kind: app`（省略時）は Projects、`kind: tool` は Tools に出す。1 ファイル 1 リポジトリ |
| `systems` | `systems/*.md` | title / tagline / summary / order / components / highlights | Systems。開発・学習・読書の仕組みの読み物 |
| `pages` | `profile.md` だけ | title / description / updated / links | トップの外部リンクのカードと、Markdown 版の本文 |
| `articles` | `articles.json` | id / title / url / platform / publishedAt / tags / series / summary | Writing。連載（series）ごとにまとめ、連載の中は古い順 |

- `tagline` は一覧のカードに出す一文。句点なし・60 字以内（スキーマで確認）。`summary`（1〜2 文）は詳細ページの冒頭・Markdown 版・`llms.txt` に出し、カードには出さない。
  カードのために summary を削ると AI 向けの情報が減るので、項目を分けている
- `highlights` は詳細ページの要点。3 行まで。本文に書いた事実だけから作る。本文が 400 字を超えるエントリは必須（テストで確認）
- `featured: false` の作品は一覧の「Other / Experiments」にまとめる。`homeWide: true` は、トップのカードが 3 列になる広い画面でだけ足す枠（§4）
- `vibeCoding: true` はコードを AI が書いた作品。カード・詳細ページ・Markdown 版・`llms.txt` に同じ備考を 1 行出す
- `visibility: private` の作品は存在と目的だけを書き、`repo` を書いてもリポジトリへのリンクを出さない（開くと 404 になるため。`src/lib/project-summary.ts` の `publicRepoUrl`）
- `site` は作品の公開サイト。カード・詳細ページ・Markdown 版・`llms.txt` にリンクを出す。本文が空の作品は詳細ページを作らない（一覧だけに出る）
- `projects.systems` は `systems` の slug を指す。`systems.components` は Projects の slug か外部の名前。参照が壊れていないことをテストで確かめる
- `updated`（`profile.md`）は最終確認日。YAML の日付は Date として読まれるので、型で `YYYY-MM-DD` の文字列にそろえる
- `profile.md` の型には `tagline`・`highlights` の項目が残っているが、書かない（表紙に一言と要点を置かない。`logs/decisions.md` 2026-10-22・23）

## 2. ページとルート

| ルート | 内容 | Markdown 版 |
|---|---|---|
| `/` | トップ。1 枚のページに 6 節（§4） | `/profile.md` |
| `/projects`・`/projects/<slug>` | Projects の一覧（`kind: app`）と詳細 | `/projects/<slug>.md` |
| `/tools`・`/tools/<slug>` | Tools の一覧（`kind: tool`）と詳細 | `/tools/<slug>.md` |
| `/systems`・`/systems/<slug>` | Systems の一覧と詳細 | `/systems/<slug>.md` |
| `/writing` | 技術記事の一覧（連載ごと） | `/writing.md` |
| `/ask` | Ask AI（プロンプトの全文・コピー・各 AI へのリンク。§3） | — |
| `/llms.txt` | AI 向けの索引（llmstxt.org の形：H1・引用の要約・H2 ごとのリンク一覧。節は Projects・Tools・Systems・Writing ほか） | — |
| `/llms-full.txt` | 主要ページの Markdown 版を 1 ファイルにつないだもの（Projects の後ろに Tools） | — |
| `/sitemap-index.xml`・`/robots.txt`・`/og.png`・`/favicon.svg` | 補助 | — |

- ページはこれだけ。仕事の内容や技術の到達度を扱うページは持たない（`PLAN.md`「やらないこと」）
- URL は拡張子・末尾のスラッシュなし（`trailingSlash: 'never'`、`build.format: 'file'`、Vercel の `cleanUrls`）
- 各 HTML ページは `<link rel="alternate" type="text/markdown">` とフッターのリンクで Markdown 版を指す
- 絶対 URL は `Astro.site`（`SITE_URL` → `VERCEL_PROJECT_PRODUCTION_URL` → localhost の順）から組み立てる
- サイトの名前は「works」、持ち主は「Naoki Yoshida」（`src/site.ts` の `SITE`）。タブの題名の末尾と OGP の site_name は名前、フッターの著作権表示と Ask AI の依頼文は持ち主

## 3. Ask AI

- 自前のチャットは持たない。訪問者の AI に渡すプロンプトを見せ、「ChatGPT で開く」「Claude で開く」「Gemini（コピーして貼り付け）」とコピーを置く
- プロンプトは `src/lib/ask.ts` の 1 か所。本文は英語（答えの言葉を指定しないと英語で返るので、日本語で答えるよう指示する）。中身：
  - `/llms.txt` を最初に読ませ、作ったもの（アプリ・開発の道具・仕組み・技術記事）を紹介させる。読む先はこのサイト・GitHub のリポジトリ・記事など `llms.txt` からリンクしたもの
  - 最初の答えは短くさせる：5 行以内の概要（1 行 1 文・40〜60 字で、作品名・何をするか・技術などの具体的な事実を入れる）、もっと聞くよう促す自然な一文、短い質問の例 3 つ（30 字前後まで）。詳しいことは聞かれてから
  - 名前は「Naoki Yoshida」と書かせ、漢字を推測させない。出典に無いことを推測させない。頼った出典をリンクで示させる
  - 職種の言葉と「このサイトに無いもの」の文は書かない（`logs/decisions.md` 2026-10-20・22）
- **入口のメニュー**（`src/components/AskEntry.astro`）：右下の追従ボタンとトップの Ask AI 節のボタンは、押すと（PC はマウスを乗せても）「ChatGPT で開く」「Claude で開く」「Gemini（コピーして貼り付け）」「プロンプトを見る」（`/ask`）のメニューを開く。
  開け閉めは HTML の popover で、外を押すか Esc で閉じる。各 AI は新しいタブで開く
- **Gemini にはサイトの全文を渡す**：Gemini は URL でプロンプトを受け取れず、`llms.txt` の URL を渡しても中身を取得できなかった。
  そこで Gemini のボタンは、「`---` の後ろがサイトの全文。URL は開かなくてよい」と書いたプロンプト（`buildPastedPrompt`。答え方の指示は URL 版と同じ）の後ろに `/llms-full.txt` の全文をつないで、クリップボードへ写す（`src/scripts/ask-copy.ts`）。
  全文は入口にマウスを乗せた・メニューを開いた・`/ask` を開いた時点で先に読み込む。写せなければ、リンクの文字で全文を貼る道を案内する
- 追従ボタン・トップの節のボタン・`/ask` の見出しとタブの題名は同じ言葉「Ask AI about this site」（`src/site.ts` の `ASK_BUTTON_LABEL`）。「portfolio」は画面にも依頼文にも使わない

## 4. トップと一覧・詳細の見せ方

見た目の値（色・文字・余白・角）と部品の形は `DESIGN.md`。ここには何をどこに置くかを書く。

- **構成は 1 枚のページ + 左の固定目次**。トップに 6 節（About / Projects / Tools / Systems / Writing / Ask AI。`src/site.ts` の `SECTIONS`）を縦に並べ、左の目次はその節へ移動する。
  スクロールに合わせて今いる節の項目を強調する（JavaScript はここと Ask AI のコピーだけ）。目次の下には GitHub・Qiita をアイコン付きで置く。
  狭い画面では目次の全項目を上部に横並びで出し、ボタンで隠さない。トップ以外のページでは目次のリンクが `/#id` に飛ぶ
- **トップの先頭は画面 1 つ分の表紙**：サイトの名前（大きく）・持ち主の行（「Naoki Yoshida / n-yoshida-dev」。`class="lead"`）・目次 6 項目だけを置き、下端に ↓。表紙の中の名前と持ち主の行が About の節
  - 目次の 1 行は番号（01〜06）・節の名前・件数。件数は Projects（全体の件数）・Tools・Systems・Writing の 4 節で、データから数える。PC では件数の横に 1 件 1 マスの小さな図を並べる
  - 開いたときに 1 回だけ、線が引かれ、文字と目次の行が下から浮かび、マスが左から現れる（CSS だけ）。`prefers-reduced-motion: reduce` では動かさない
  - PC のトップでは、左の固定目次と右下の Ask AI ボタンは表紙を過ぎてから出る。狭い画面のトップは表紙の中の目次（2 列）だけにし、上部の目次は出さない（同じ項目が二重になるため）
- **表紙の直後に外部リンクのカード**（`profile.md` の `links`。線のアイコン・名前・そこに何があるか）。表紙には文字リンクを置かない
- **各節は短い版**で、詳しい版のページへ「すべて →」で送る。Projects・Tools・Systems は見出しのすぐ下に「これは何か」の 1 行（`SECTIONS` の `lead`。件数は入れない）
  - Projects：`featured` の作品を 4 件まで。見出しに「4 / 全体 件」。カードが 3 列になる広い画面では `homeWide` の作品を足して 6 枚にし、見出しの件数も合わせる
  - Tools・Systems：全件
  - Writing：連載 × 公開月の図（■ 1 つが記事 1 本で、公開した月の列に置く。ビルド時に `articles.json` から作る）と、いちばん新しい記事 1 本。説明の文に本数・連載の数は入れない
  - Ask AI：説明の一文と入口のボタン（§3）、`llms.txt` へのリンクと「AI 向けの要約」の説明。最後に `profile.md` の最終確認日
- **画面の幅で段階的に構成を変える**：100rem（1600px）以上はトップだけ本文を広げ、Projects のカードを 3 列・6 枚にする（Tools・Systems は 2 列のまま）。
  それより狭い PC は 2 列・4 枚、64rem 未満は上部の目次で 2 列、40rem 未満は 1 列。トップ以外のページは本文の幅を広げない（長い文が読みにくくなるため）
- **一覧の 1 件は薄枠のカード**：作品・ツールは期間と状態、題名、一文（`tagline`）、AI が書いた作品は備考を 1 行、下端にリンクを定位置に置く。仕組みは題名と一文だけ（構成要素のタグは一覧ページでだけ出す）
- **詳細ページ**は題名・`summary`・リンク・技術を出し、`highlights` があれば要点を先に出して本文を「詳しく読む」（`<details>`）に畳む。無ければ本文をそのまま出す。
  開いた直後に見える文字は 800 字以下。関連する仕組み・作品は題名だけ
- **HTML は人間向けに短く、Markdown 版・`llms.txt` は AI 向けに詳しく**。Markdown 版には本文の全文を出す。同じ文章を両方に同じ量で出さない
- **右下の Ask AI ボタン**は `/ask` 以外の全ページに置く（トップでは表紙の上に出さず、本文と一緒に下から入ってくる）。トップの Ask AI 節も残す
- ボタンは文字色で描き、青はリンクにだけ使う。グラデーション・影は使わない（`DESIGN.md`「Do's and Don'ts」）

## 5. 検査

CI（`.github/workflows/ci.yml`）：`format:check` → `lint`（`public-profile/` の禁止語スキャン）→ `typecheck` → `test` → `build` → `check:home`（ビルドしたトップに「何の人か・何を作ったか・どう開発しているか」の節が中身つきで出ているか）→ `check:dist`（ビルド後の `dist/` 全体の禁止語スキャン）→ AI 向けファイルの存在確認。別のジョブで秘密情報の混入を検査する。

- 禁止語のパターンは `scripts/public-profile-rules.json`。ヒットは書き直しで解消し、許可リストを作らない
- 手で回す検算（CI には入れない）：`check:articles`（Qiita と `articles.json`）・`check:repos`（`visibility` と GitHub）。使い方は `README.md`

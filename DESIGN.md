---
name: works
description: Naoki Yoshida の制作活動ハブ。自作アプリ・開発支援ツール・開発と学習の仕組み・技術記事を紹介する静的サイト。見た目は「GitHub や技術文書と並べて違和感のない、線で区切った静かな紙面」
version: alpha
colors:
  fg: "#1f2328"
  fg-muted: "#59636e"
  line: "#d1d9e0"
  link: "#0969da"
  bg: "#ffffff"
  bg-subtle: "#f6f8fa"
  code-bg: "#f0f2f4"
typography:
  cover-name:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans JP', 'Hiragino Sans', 'Helvetica Neue', Arial, sans-serif"
    fontSize: 7rem
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.035em
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans JP', 'Hiragino Sans', 'Helvetica Neue', Arial, sans-serif"
    fontSize: 1.75rem
    fontWeight: 600
    lineHeight: 1.35
  heading:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans JP', 'Hiragino Sans', 'Helvetica Neue', Arial, sans-serif"
    fontSize: 1.35rem
    fontWeight: 600
    lineHeight: 1.35
  card-title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans JP', 'Hiragino Sans', 'Helvetica Neue', Arial, sans-serif"
    fontSize: 1.05rem
    fontWeight: 600
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans JP', 'Hiragino Sans', 'Helvetica Neue', Arial, sans-serif"
    fontSize: 1rem
    lineHeight: 1.75
  note:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans JP', 'Hiragino Sans', 'Helvetica Neue', Arial, sans-serif"
    fontSize: 0.8rem
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace"
    fontSize: 0.8rem
rounded:
  sm: 4px
  md: 6px
  lg: 8px
  pill: 999px
spacing:
  xs: 0.3rem
  sm: 0.9rem
  md: 1.5rem
  lg: 3rem
  gutter: 16px
components:
  page:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.fg}"
    typography: "{typography.body}"
  muted-text:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.fg-muted}"
  card:
    backgroundColor: "{colors.bg-subtle}"
    textColor: "{colors.fg}"
    rounded: "{rounded.lg}"
  card-link:
    backgroundColor: "{colors.bg-subtle}"
    textColor: "{colors.link}"
  card-note:
    backgroundColor: "{colors.bg-subtle}"
    textColor: "{colors.fg-muted}"
    typography: "{typography.note}"
  badge:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.fg-muted}"
    rounded: "{rounded.pill}"
  button-primary:
    backgroundColor: "{colors.fg}"
    textColor: "{colors.bg}"
    rounded: "{rounded.sm}"
  divider:
    backgroundColor: "{colors.line}"
---

## Overview

**状態：今ある決まりを写したもの**（2026-10-20 に T7 で作成）。新しい決定はしていない。
前身のサイト（非公開の保存用）で決めた見た目をそのまま引き継いでいる。決めた日付は CSS のコメントにあり、
判断の要約は `logs/decisions.md`（末尾の「前身から引き継いだ判断」と、2026-10-20 以降のエントリ）にある。
値の正本は `src/styles/global.css`。ここと食い違ったら CSS に合わせてここを直す。画面のファイルを変える前に、この 1 枚を読む。

- **誰が、どんな場面で使うか**（Claude の言葉）：作ったものに興味を持った人が、GitHub や Qiita のリンクから来て、PC かスマホで開く。
  訪問者が自分の AI に読ませることもある（Ask AI・`llms.txt`）
- **画面の仕事**（Claude の言葉）：何を作っているか（Projects・Tools・Systems・Writing）を 1 枚のトップで見せ、詳しい版とリポジトリ・記事へ送る
- **雰囲気の言葉 3 つ**（Claude の言葉。CSS 冒頭の方針から）：読みやすい・静か・技術文書のよう
- **避けたい見た目**（前身でユーザーが言ったことの要旨。原文は ops に記録）：どこにでもある部品集の見た目、文章ばかりで素っ気ない百科事典のような紙面、
  ひと目で AI が作ったと分かる見た目、ぎらついた見た目（グラデーション・光るカード・3D・ロゴの羅列のような SaaS 風）
- **手本の画面**：GitHub と技術文書（CSS 冒頭の方針「GitHub や技術文書と並べて違和感がない見た目」）
- **このサイトだけの見どころ 1 つ**：トップの表紙（開いた直後の 1 画面に、サイトの名前・持ち主の行・目次だけを置き、目次の行が浮かんで線が引かれて開く）
- **題名**：サイトの名前は「works」。表紙では名前の下に小さく「Naoki Yoshida / n-yoshida-dev」を添える。名前の下に一言は置かない（`logs/decisions.md` 2026-10-23。コンペの記録は `docs/design-candidates/2026-10-23-site-name/`）

## Colors

色は「文字・薄い文字・線・リンク・背景」の 5 つと、その補助（カードの地・コードの地）だけ（CSS 冒頭の方針）。

| 名前（CSS の変数と同じ） | 明るい画面 | 暗い画面 | 役割 |
|---|---|---|---|
| fg | #1f2328 | #e6edf3 | 本文の文字・塗りのボタンの地 |
| fg-muted | #59636e | #9198a1 | 薄い文字（補足・件数・バッジ・技術タグ）・記事の図の ■ |
| line | #d1d9e0 | #3d444d | 区切りの線・カードとバッジの枠 |
| link | #0969da | #4493f8 | リンクだけ（青はリンク専用。ボタンは文字色で描く） |
| bg | #ffffff | #0d1117 | 画面の地・塗りのボタンの文字 |
| bg-subtle | #f6f8fa | #161b22 | カードの地・表の見出しの地・コードの枠 |
| code-bg | #f0f2f4 | #1c2129 | 文中のコードの地 |

- 明暗は OS の設定に従う（`prefers-color-scheme`）。切り替えのボタンは持たない
- 文字と背景の濃さの差（WCAG 2 のコントラスト比。2026-10-20 に測定）：薄い文字は明るい画面で地 6.11・カードの上 5.74、暗い画面で地 6.50・カードの上 5.94。
  リンクはカードの上で明るい画面 4.88・暗い画面 5.58。どれも 4.5 以上
- グラフの色：グラフは使わない。トップの Writing の「連載 × 公開月」の図は ■ を薄い文字色で並べるだけ
- 上の YAML は明るい画面の値だけ（書式に暗い画面の欄が無いため）。暗い画面の値はこの表と CSS が持つ

## Typography

- **Web フォントは読み込まない**（外部への通信 0）。OS の書体の並び：`-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans JP', 'Hiragino Sans', 'Helvetica Neue', Arial, sans-serif`
- 等幅の書体（`ui-monospace` から始まる並び）は、コード・期間・技術タグ・表紙の目次の番号と件数・記事の図の月・「最新」の日付に使う
- 文字の大きさの段：表紙の名前 4.5〜7rem（画面の幅で変わる）／ページの題名 1.75rem／節の見出し 1.35rem／カードの題名 1.05rem／本文 1rem（16px。40rem 未満は 15.5px）／
  一文・表紙の持ち主の行 0.95rem／補足 0.8〜0.875rem／バッジ 0.75rem／表紙の目次の番号 0.7rem
- 太さは 600（見出し）と 400（本文）。表紙の目次の名前は 64rem 未満で 600、64rem 以上で 500
- ページの説明文（`.lead`）・トップの節の文・カードの一文・詳細ページの要点・日本語の短い見出し（リンクカードの補足・連載名）は文節で折り返す（`word-break: auto-phrase`。Chromium だけで効く）。
  カードの一文と要点は 2026-10-20 の点検で「テンプレー／ト」の折れが出たので足した（Claude が選んだ直し方。ユーザーは未確認）
- 行間：本文 1.75、見出し 1.35、表紙の名前 1
- 日本語を斜体にしない

## Layout

- **トップ**：開いた直後の 1 画面が表紙（サイトの名前・持ち主の行・目次）。PC は左に名前と持ち主の行、右に目次の 2 列で、上下の中央をそろえる。スマホは縦に並べ、目次は 2 列。
  その下に外部リンクのカード、続けて Projects / Tools / Systems / Writing / Ask AI の節を縦に並べる（`src/site.ts` の `SECTIONS`）。
  各節は短い版で、見出しのすぐ下に「これは何か」の 1 行（`SECTIONS` の `lead`。Writing は図の読み方の 1 行）を置き、詳しい版のページへ「すべて →」で送る
- **左の固定目次**：64rem 以上で左に 16rem の目次を固定する（`position: sticky`）。64rem 未満は上部に横並びで畳む。トップの 64rem 未満では、表紙の中に同じ目次があるので上部の目次を出さない
- **本文の幅**：最大 52rem で、目次の右の残りの中央に置く。トップだけは 100rem 以上で本文を最大 76rem に広げ、Projects のカードを 3 列にする（Tools・Systems は 2 列のまま）
- **カードの列**：2 列、40rem 未満は 1 列
- **余白**：左右の端は 16px（64rem 以上は 3rem）。カードの間 0.9rem、外部リンクのカードの間 0.75rem（40rem 未満は 0.5rem）。
  見出しの上は 2em。トップの節の見出しの上は 2.5rem、外部リンクのカードの直後の節だけ 2.75rem
- **右下の Ask AI ボタン**：どのページでも右下 16px に留める（`/ask` では出さない）。トップでは表紙の上には出さず、本文と一緒に下から入ってくる

## Elevation & Depth

- 影は使わない。重なるのは右下の Ask AI ボタンとそのメニューだけで、境目は背景色の縁取り（2px）と線で見せる

## Shapes

- 角：コードと技術タグとボタン 4px、コードの枠・メニュー 6px、カード 8px、バッジは丸（999px）
- 線：1px の `line`。節の見出しの下・表紙の行の区切り・カードの枠。記事の図の月の区切りだけ破線

## Components

| 部品 | CSS のクラス | 形 |
|---|---|---|
| 表紙 | `.cover` `.cover-id` `.ix` | 地色もカードも使わず線だけで区切る。名前は大きく、持ち主の行は小さく薄い文字。目次は行ごとに線で区切る |
| 節の見出しの下の説明 | `.section-lead`（`HomeSection.astro`） | 薄い文字の 1 行。「これは何か」だけを書き、件数は入れない |
| 外部リンクのカード | `.link-card` | 線のアイコン・名前（リンク色）・そこに何があるか（薄い文字） |
| 作品・ツールのカード | `.card`（`ProjectCard.astro`） | 上段に期間と公開状態・状態のバッジ、続けて題名・一文、AI が書いた作品は備考を 1 行。下端にリンクを定位置に置く |
| 仕組みのカード | `.card`（`SystemCard.astro`） | 題名と一文だけ |
| バッジ | `.badge` | 丸い枠と薄い文字 |
| 技術タグ | `.tag-list` | 等幅の小さい文字と 4px の枠 |
| 詳細ページの本文 | `.highlights` `.more`（`FoldedBody.astro`） | 要点 3 行を先に出し、本文は「詳しく読む」（`<details>`）で畳む |
| ボタン | `.button` `.button-primary` | 線だけ。塗るのは主なボタンと右下の Ask AI ボタンだけ（文字色の地 + 背景色の文字） |
| 記事の図 | `.series` | 連載 × 公開月。■ 1 つが記事 1 本 |

- キーボードのフォーカスはブラウザの既定の枠のまま（消していない）。表紙の目次はフォーカスでも名前に下線が付く

## Do's and Don'ts

守ること：

- 文字と背景の濃さの差は明暗どちらも 4.5 以上
- 動きはトップの表紙を開いたときの 1 回（約 1.7 秒）と、表紙の目次にマウスを乗せたときの → だけ。`prefers-reduced-motion` のときは動かさない
- 色を足すときは、暗い画面の値も同時に決める
- JavaScript は Ask AI のコピーと目次のスクロール監視だけ（`CLAUDE.md`）。ライブラリを足さない
- 画面のファイルを変えた PR は、/apps-workflow:look の「B 毎回の点検」を通す

避ける形：

- グラデーション・影・光るカード
- 青をリンク以外に使う（ボタンも文字色で描く）
- 同じ角丸・同じ枠の箱を、すべての部品に使う（表紙は箱を使わず線で区切る）
- 選択中や強調の印に「左の色帯」
- 小さなラベルを英大文字で組む

## 狙い

- 題名を本名から、リポジトリ名と URL（`n-yoshida-works`）にそろう「works」に変え、GitHub のリポジトリの見出しと同じ「持ち主 / 題名」の形で「n-yoshida-dev / works」とした。表紙でいちばん大きいのは本名ではなく「works」になる
- 持ち主はハンドル名で表紙の 1 行目に必ず見え、本名はフッターの著作権表示と説明文（og:description・llms.txt の About）に「持ち主の名前」として残す。本名を隠さず、題名にもしない
- 手本の「GitHub と並べて違和感のない」紙面に合う。GitHub から来た人には見慣れた形で、色・書体・目次・線・開くときの動きは今のまま

## 節ごとの工夫

- **1. サイトの名前**：`SITE.name` / `SITE.title` を「n-yoshida-dev / works」の 1 つの文字列にし、タブ・左の目次・OG 画像・llms.txt の見出し・`og:site_name` で同じに出す。フッターだけは新しく `SITE.owner`（Naoki Yoshida）を足して本名を出す。
  代わりの候補：「works — Naoki Yoshida」（本名を持ち主として添える形。GitHub と縁の薄い人にも人の名前が先に伝わるが、本名がまた表紙に大きく出る）／「n-yoshida-dev」だけ（短いが、GitHub のプロフィールと区別がつかず、サイトの中身を表さない）
- **2. 表紙の見せ方**：持ち主を 1 行目に薄い文字・小さめ（1.05〜1.45rem、400）で「n-yoshida-dev /」、2 行目に「works」を今の名前より大きく（スマホ 3.6rem〜、PC 7rem、600）置く。語が短いので、スマホでも 1 行で大きく見せられる。
  一言・目次（6 項目・順番・件数・■ の図）・PC の 2 列・スマホの 2 列の目次は今のまま。h1 の読み上げは「n-yoshida-dev / works」の 1 続き

## 文面を変えた所

- 表紙の見出し（`SITE.name`）：Naoki Yoshida → n-yoshida-dev / works（表紙では 2 行に分けて表示）
- トップのタブの題名・`og:title`・`twitter:title`（`SITE.title`）：Naoki Yoshida → n-yoshida-dev / works
- 各ページのタブの題名：ページ名 — Naoki Yoshida → ページ名 — n-yoshida-dev / works
- `og:site_name`：Naoki Yoshida → n-yoshida-dev / works
- 左の目次の一番上：Naoki Yoshida → n-yoshida-dev / works（「n-yoshida-dev /」を薄い文字にする）
- OG 画像の名前（`generate-og.mjs` 12 行目）：Naoki Yoshida → n-yoshida-dev / works（色・配置・ほかの 3 行は今のまま）
- `llms.txt` / `llms-full.txt` の見出し：Naoki Yoshida → n-yoshida-dev / works
- Ask AI の依頼文の中の名前：Naoki Yoshida → n-yoshida-dev / works（依頼文の全文は材料に無く、未確認。名前の部分だけを置き換える前提）
- フッターの著作権表示：© 2026 Naoki Yoshida → 変えない（`SITE.name` ではなく新しい `SITE.owner` から出すように直すので、文面は今のまま）
- 一言（tagline）：変えない
- 説明文（`profile.md` の description「Naoki Yoshida が作ったアプリや道具と、書いた記事を置いているサイト。」）：変えない

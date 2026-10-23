# SPEC

**T12 で書き直す。** それまでの仕様の正本は、前身のサイトの `SPEC.md`（手元の `../portfolio/SPEC.md`。非公開の保存用）の §3（Ask AI）・§4（ページとトップの節）。
コードのコメントにある「SPEC.md §3」「§4」はそこを指している。前身から変わった点だけをここに書く。

## 前身から変わった点

- トップの節は 6 つ：About / Projects / Tools / Systems / Writing / Ask AI（`src/site.ts` の `SECTIONS`）。左の目次と表紙の目次も同じ 6 つ
- 作品の frontmatter に `kind: 'app' | 'tool'`（省略時は `app`）がある。`app` は `/projects`・`/projects/<slug>`、`tool` は `/tools`・`/tools/<slug>` に出る。
  Markdown 版も同じ場所（`/tools/<slug>.md`）。`llms.txt` には `## Tools` の節があり、`llms-full.txt` は Projects の後ろに Tools を続ける
- 技術記事のページは `/writing`（Markdown 版は `/writing.md`）。`/articles` は無い（転送もしない。`logs/decisions.md` 2026-10-20）
- 見た目の決まりは `DESIGN.md`（値の正本は `src/styles/global.css`）
- サイトの名前は「works」（`src/site.ts` の `SITE.name` / `title`）。持ち主は `SITE.owner`（Naoki Yoshida）で、表紙の名前の下の行・フッター・Ask AI の依頼文に出る
- 表紙は名前・持ち主の行（「Naoki Yoshida / n-yoshida-dev」）・目次だけ。要点 3 行と一言は無い（`profile.md` の `highlights`・`tagline` は書かない）
- トップの Projects / Tools / Systems は、見出しのすぐ下に「これは何か」の 1 行を出す（`SECTIONS` の `lead`）
- Ask AI の依頼文と `llms.txt` は、作ったもの（アプリ・道具・仕組み・記事）を紹介させる。職種の言葉と「このサイトに無いもの」の文は書かない
- Skills と Journey の節・ページ・Markdown 版（`/skills` `/journey` `/skills.md` `/journey.md`）は無い。`/llms.txt` と `/llms-full.txt` にも出さない
- `public-profile/` 直下のページは `profile.md` だけ
- `visibility: private` の作品は、カード・詳細ページ・Markdown 版にリポジトリへのリンクを出さない（開くと 404 になるため。`src/lib/project-summary.ts` の `publicRepoUrl`）
- Ask AI の依頼文から、技術を区分ごとに分けて答えさせる指示を外した（依頼文の全体は T8 で作り直した。上の「Ask AI の依頼文と llms.txt」の行）

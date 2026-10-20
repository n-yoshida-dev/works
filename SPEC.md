# SPEC

**T12 で書き直す。** それまでの仕様の正本は、前身のサイトの `SPEC.md`（手元の `../portfolio/SPEC.md`。非公開の保存用）の §3（Ask AI）・§4（ページとトップの節）。
コードのコメントにある「SPEC.md §3」「§4」はそこを指している。前身から変わった点だけをここに書く。

## 前身から変わった点

- トップの節は 5 つ：About / Projects / Systems / Articles / Ask AI（`src/site.ts` の `SECTIONS`）。T7 で Tools を足し、Articles を Writing にする
- Skills と Journey の節・ページ・Markdown 版（`/skills` `/journey` `/skills.md` `/journey.md`）は無い。`/llms.txt` と `/llms-full.txt` にも出さない
- `public-profile/` 直下のページは `profile.md` だけ
- `visibility: private` の作品は、カード・詳細ページ・Markdown 版にリポジトリへのリンクを出さない（開くと 404 になるため。`src/lib/project-summary.ts` の `publicRepoUrl`）
- Ask AI の依頼文から、技術を区分ごとに分けて答えさせる指示を外した（依頼文の全体は T8 で作り直す）

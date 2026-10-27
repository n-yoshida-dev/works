# 設計判断とハマりどころ

コードを読めば分かることは書かない。書くのは次の2つだけ。

- **設計判断**：Claude が実装中に複数の選択肢から選んだこと。「なぜそうしたか」を必ず添える。
  ユーザーと合意して決めたことは、ここではなく `logs/decisions.md`（`/decide`）へ
- **ハマったこと**：想定と違った挙動、再発しそうな落とし穴。原因と回避方法をセットで

見出しは `### YYYY-MM-DD：<決めたこと>` の形式。

前身のサイト（手元の `../portfolio`）の `KNOWLEDGE.md` にある Astro・Vercel・Playwright のハマりどころは、そのまま当てはまる。必要になったら読む（写さない）。

---

### 2026-10-28：Vercel のデプロイの記録は、GitHub の deployments ではなくコミットの状態に付く

T13 で `gh api repos/{owner}/{repo}/deployments` を見ると 0 件だった。Vercel は main の先端のコミットに `vercel[bot]` の状態（context `Vercel`、success）を付けていて、記録はそちらにある。
確かめるときは `gh api repos/{owner}/{repo}/commits/<sha>/statuses` を見る。状態のリンク先の URL から Vercel のプロジェクト名も分かる。

### 2026-10-28：表紙を撮るときは、動きを減らす設定にしてから撮る

look.mjs の `shoot` でそのままトップを撮ると、表紙の開く動き（約 1.7 秒）の途中で撮れ、目次と ↓ が写らない（名前と持ち主の行だけになる）。
`--setup` で `page.emulateMedia({ reducedMotion: 'reduce' })` のあとに読み込み直してから撮ると、最初から終わりの姿で写る（SPEC.md §4 の、動きを減らす設定では動かさない決まりを使う）。

### 2026-10-24：`check:repos` は gh で GitHub に聞き、`check:articles` は未掲載があっても失敗にしない（T11）

`check:repos` は `gh api repos/<owner>/<name>` で公開状態を聞く。非公開のリポジトリは認証なしの API では 404 になり、private の表記が合っているかを確かめられないため（トークンを環境変数で渡す案は、手で回す道具に設定を増やすだけなので選ばなかった）。CI に入れないのも同じ理由。
`check:articles` は Qiita API v2 を認証なしで呼ぶ（1 時間 60 回まで）。ユーザー名は `profile.md` の Qiita のリンクから取る。未掲載の記事は「載せるかは人が決める」ので一覧を出すだけで、終了コードは取得の失敗のときだけ 1。
未掲載のうち、わざと載せていない記事の題名はターミナルに出るだけで、ファイルには書かない（このリポジトリは公開する前提）。

### 2026-10-23：`dist/` の検査は public-profile と同じ規則の JSON を使い、前身のページの検出は「パスの先頭」に限った（T9）

`scripts/check-dist.mjs` は `public-profile-rules.json` の `rules` に、dist だけで使う `distOnlyRules` を足して検査する。語の一覧を 1 か所にしておけば、元の文章と出来上がりを同じ語で調べられる（スクリプトに直書きする案はハードコード禁止に当たるので選ばなかった）。
`/skills` は単純に探すと、Tools から他のリポジトリの `.../apps-workflow/skills` へ張るリンクに誤って当たる。そこで「`href="` などの直後か、`https://ホスト` の直後に来る `/skills`」だけを拾う形にした（サイトマップの `https://…/skills/` は拾う）。
英大文字 2 字の略語の語は、前後を単語の境目（`\b`）で区切り、`PLAN.md`・`Playwright` に当たらないようにした。HTML は 1 行が長いので、ヒットはまわり 40 字だけ出す（`scanText` のヒットに `column` を足した）。

### 2026-10-23：表紙の持ち主の行は `class="lead"` のまま使い、名前は `SITE.name` と `SITE.owner` に分けた（T8）

サイトの名前を「works」にしたので、本名は `src/site.ts` の新しい `SITE.owner` に分けた。表紙の名前の下の行・フッターの著作権表示・Ask AI の依頼文（「what Naoki Yoshida makes」）は `owner` を使う。
タブ・OGP・左の目次・llms.txt の見出しは `name` / `title`（works）。OG 画像の `scripts/generate-og.mjs` は Node から `site.ts`（TypeScript）を読めないので、同じ値を直書きしている（変えるときは両方）。
表紙の持ち主の行は、前の一言と同じ `<p class="lead">` に置いた。`scripts/check-home.mjs` が「名前（h1）と、その下の lead の段落」で「何の人か」の節を確かめているため、検査の仕組みを変えずに済む。

### 2026-10-23：コンペの記録を公開リポジトリに写すときは、手元のパスと禁止語の候補を置き換える

compete スキルの記録（`docs/design-candidates/`）には、審査役が書いた `/tmp/compete.…` などの手元のパスと、キャリア系の禁止語の候補にあたる語（「案を選ぶ」の意味で使った 2 字の語。計画文書 3-9 の一覧にある）が入っていた。
このリポジトリは公開する前提で、T12 の完了条件は「リポジトリ全体で禁止語 0 件」なので、写しでは消すか置き換え、置き換えたことを記録の README に書いた。直し案は ops-h49 に残した。

### 2026-10-20：Tools は projects のコレクションに `kind` で同居させ、詳細ページは部品で共通にした（T7）

Tools 用に別のコレクションを作らず、`projects` に `kind: 'app' | 'tool'` を足した（計画文書 3-2 のとおり）。項目（公開状態・期間・技術・備考）が同じで、型を 2 つ持つと片方だけ直す事故が起きるため。
一覧と URL だけを分け、取り出しは `src/lib/content.ts` の `getApps`（Projects 側）と `getTools`、パスは `src/lib/project-summary.ts` の `projectPath` に集めた。
詳細ページの中身は `src/components/ProjectDetail.astro` に移し、`/projects/[slug]` と `/tools/[slug]` はどちらも `getStaticPaths` で `kind` を絞るだけにした（同じ HTML を 2 か所に書かないため）。

### 2026-10-20：T10 の `kind: tool` を T7 に前倒しし、トップの作品を 1 件入れ替えた（Claude が選んだ）

Tools が 0 件のままだと、T7 の見た目の点検で Tools の画面を確かめられない。そこで `claude-plugins.md`・`app-template.md` を T7 で `kind: tool` にした。
その結果、トップの主なプロジェクトが 3 件になり、2 列のカードに穴が空く。`life-plan-simulator`（進行中）を `featured: true` に上げ、
広い画面だけで足す枠（`homeWide`）には `ai-study-coach`（Public で詳細ページがある）を入れた。どれを載せるかはユーザーに確かめていない。

### 2026-10-20：Astro は、改行をはさんだ文字と要素のあいだの空白を落とすことがある

`/tools` の説明文で「組み合わせ方は」の直後で改行して `<a>Systems</a>` を書いたら、画面では「組み合わせ方はSystems」とくっついた。
文字と要素の間で改行するときは `{' '}` を明示する（Prettier も整形でそう直す）。詳細ページのバッジの隙間を余白で作っているのも同じ理由（`global.css` の `h1 .badge`）。

### 2026-10-20：リポジトリは Private で作り、中身を確かめてから本人が Public にする

`gh repo create --public` は Claude のフック（PreToolUse）が止める。公開設定はユーザーが変える決まり（`../CLAUDE.md`）なので、Private で作った。
結果として、T7〜T12 でキャリア系の語が残っていないことを確かめてから公開に切り替えられる。切り替えは T13 の前に本人が設定画面で行う。

### 2026-10-20：最初のコミットは GitHub に作らせ、写しは PR で入れた

計画では「最初のコミットが 1 つ」だったが、`main` への直接コミットは apps の決まりで禁止。
`gh repo create --license mit --add-readme` で GitHub に最初のコミット（LICENSE と仮の README。作者は noreply）を作らせ、前身からの写しは `feat/initial-setup` の PR で入れた。
`main` のコミットは 2 つになるが、どちらも前身の履歴を含まず、作者は noreply だけ。

### 2026-10-20：T6 で Skills / Journey の削除まで済ませた

計画では削除は T7 だったが、`career.md` `skills.md` を写さないとビルドが通らない（トップと各ページがこの 2 ファイルを読む）。
そのため T6 で、2 つのページ・Markdown 版・読み取りの関数・テスト・トップの節・llms の行を消した。T7 に残るのは Tools の新設・`kind` の追加・`/writing` への改名。
CSS（`src/styles/global.css` の Skills・Journey・年表の部分）と OG 画像の文言（`scripts/generate-og.mjs` の「Skills」）はまだ残っている。CSS は T7、OG は T8 で直す。

### 2026-10-20：プラグインの install が `.claude/settings.json` の整形を崩す

`claude plugin install --scope project` は `.claude/settings.json` を書き直し、Prettier の整形（短い配列を 1 行にする）と違う形にする。
その後の `npm run format:check` が CI で落ちた。install のあとは `npx prettier --write .claude/settings.json` を回してからコミットする。

### 2026-10-20：キャリア系の語の言い換え

Systems の本文にあった、計画文書 3-9 の禁止語に当たる 2 語を言い換えた（到達度を表す語は skill-matrix と同じ「理解度」に、職業上の来歴を表す語は「仕事」に）。
T9 で禁止語に足す語（計画文書 3-9）に当たり、`public-profile/` に残すと CI が落ちるため。意味は変えていない。

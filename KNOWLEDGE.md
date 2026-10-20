# 設計判断とハマりどころ

コードを読めば分かることは書かない。書くのは次の2つだけ。

- **設計判断**：Claude が実装中に複数の選択肢から選んだこと。「なぜそうしたか」を必ず添える。
  ユーザーと合意して決めたことは、ここではなく `logs/decisions.md`（`/decide`）へ
- **ハマったこと**：想定と違った挙動、再発しそうな落とし穴。原因と回避方法をセットで

見出しは `### YYYY-MM-DD：<決めたこと>` の形式。

前身のサイト（手元の `../portfolio`）の `KNOWLEDGE.md` にある Astro・Vercel・Playwright のハマりどころは、そのまま当てはまる。必要になったら読む（写さない）。

---

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

# TODO

SessionStart フックが `##` 見出しごとに `- [x]` / `- [ ]` を数えて進捗表を出し、`- [ ]` の行を 12 件まで（公開の節の分を先に）提示する。**この記法を崩さないこと。**
着手順に並べる。上ほど先にやる。1 タスク = PR 1 本。タスクには「完了条件：」の行を付ける。

タスクの ID（T6 など）と中身は ops の `docs/2026-10-20-制作活動ハブとキャリアプロフィールの分離計画.md` 4 節（Claude が書いた計画。判断 9 点は本人が承認済み）。
完了条件の言葉も多くは Claude が計画から書いたもので、本人が言い回しに合意したものではない。

## フェーズ1：初期化

- [x] 前身のサイトから必要なファイルだけを写し、Skills / Journey を外して CI を通す（T6）
  完了条件：`main` のどのコミットも作者が noreply だけ。`git grep` でキャリア系の禁止語（計画文書 3-9 の 14 語）が、禁止語スキャンの定義とテスト以外で 0 件。CI 緑

## フェーズ2：ハブの中身

- [ ] 型とナビ：`kind: 'app' | 'tool'` の追加、`SECTIONS` に Tools、Tools の一覧と詳細、`/articles` → `/writing`。残った Skills・Journey・年表の CSS を消す。画面を触るので `DESIGN.md` を今ある決まりから作る（T7）
  完了条件：`npm run build` が通り、`dist/` に `tools*` と `writing*` があり、`skills*`・`journey*`・`articles*` が無い。`DESIGN.md` があり `apps-workflow:look` の「B 毎回の点検」を通っている
- [ ] 文面：`profile.md` の一言・要点 3 行・短い本文、`llms.txt` / `llms-full.txt` の節、Ask AI の依頼文、OG 画像の文言（今は「Skills」が残っている）（T8）
  完了条件：本人が文案に OK。`llms.txt` に Skills / Journey の行が無く、OG 画像に「Skills」が無い
- [ ] 検査：禁止語にキャリア系の語を足す、`scripts/check-dist.mjs`（ビルド後の `dist/` 全体を検査）を作って CI に入れる、`check-home.mjs` の 3 点を新しい要点に合わせる（T9）
  完了条件：CI に `check-dist` が入り、わざとキャリア系の禁止語を書いたテストで落ちる
- [ ] Tools の中身：`claude-code-toolkit.md` を足し、`claude-plugins.md`・`app-template.md` を `kind: tool` に、`photo-prompt-builder.md` の visibility を public に直す（T10）
  完了条件：`/tools` に 3 件。`check:repos` の食い違いが 0
- [ ] 検算スクリプト `check:articles`（Qiita と `articles.json` の突き合わせ）・`check:repos`（`repo` の URL と visibility の突き合わせ）。CI には入れない（T11）
  完了条件：手で回して、Qiita の未掲載の記事と visibility の食い違いが一覧で出る
- [ ] 文書の書き直し：README・CLAUDE.md・PLAN・SPEC を新しい方針で書き、前身の判断台帳から引き継ぐ決定を要約して `logs/decisions.md` に移す。前身の名残（`.gitignore`・`.prettierignore` の `dashboard/`・`docs/design-candidates/`、コメントの `docs/design-candidates/` への参照、`src/lib/ask.ts` 冒頭の「区分」）も片付ける（T12）
  完了条件：`SPEC.md` が前身を参照せずに読める。`git grep` で計画文書 3-9 の禁止語が、禁止語スキャンの定義とテスト以外で 0 件

## フェーズ3：公開

公開の条件（計画文書の T13・T14 の完了条件から Claude が書いた。本人には未確認）：

1. 本番 URL でトップ・Projects・Tools・Systems・Writing・Ask AI が開ける
2. HTML・Markdown 版・`llms.txt`・`llms-full.txt`・サイトマップのどこにもキャリアの情報が無い（`check-dist` と `curl`）。3 つの AI が Ask AI でキャリアの情報を答えない
3. README に、何のサイトかと更新の仕方がある

- [ ] 本人がリポジトリを Public に切り替える（Claude はフックで止まる。フェーズ2 が終わってから）
  完了条件：`gh repo view n-yoshida-dev/works --json visibility` が PUBLIC
- [ ] 本人が Vercel に新しいプロジェクト `n-yoshida-works` を作る（Import → プロジェクト名 → Deploy）（T13）
  完了条件：本番ドメインが 200。GitHub に `vercel[bot]` の deployment が付く
- [ ] 本番で公開の条件の 1・2 を確かめる。撮影（375px・1280px）と `curl` は Claude、3 つの AI で Ask AI を試すのは本人（T14）
  完了条件：`curl` で `/llms.txt` `/llms-full.txt` `/sitemap-0.xml` にキャリア系の語が無い。3 つの AI がキャリアの情報を答えない
- [ ] 外部の参照を新しい URL に：GitHub の homepage 欄、ops の成果物公開の工程 8 と成果物台帳、Beads の epic（T15）
  完了条件：`gh repo view n-yoshida-dev/works --json homepageUrl` が本番 URL。ops の文書に旧 URL が無い

## 公開後の改善

（公開の条件に当たらない改善を 1 行ずつ置く。合計に含めない）

- [ ] 開発ダッシュボードを足すか決める（前身にはあった。`apps-workflow:dashboard`）
- [ ] 前身の TODO の保留 7 件（文面の細かいレビュー・自動取得・独自ドメイン・analytics・RAG）を、ここでやるか仕分ける

## 確認待ち（ユーザーの回答が要るもの）

（なし）

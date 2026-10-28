# TODO

SessionStart フックが `##` 見出しごとに `- [x]` / `- [ ]` を数えて進捗表を出し、`- [ ]` の行を 12 件まで（公開の節の分を先に）提示する。**この記法を崩さないこと。**
着手順に並べる。上ほど先にやる。1 タスク = PR 1 本。タスクには「完了条件：」の行を付ける。

タスクの ID（T6 など）と中身は ops の `docs/2026-10-20-制作活動ハブとキャリアプロフィールの分離計画.md` 4 節（Claude が書いた計画。判断 9 点は本人が承認済み）。
完了条件の言葉も多くは Claude が計画から書いたもので、本人が言い回しに合意したものではない。

## フェーズ1：初期化

- [x] 前身のサイトから必要なファイルだけを写し、Skills / Journey を外して CI を通す（T6）
  完了条件：`main` のどのコミットも作者が noreply だけ。`git grep` でキャリア系の禁止語（計画文書 3-9 の 14 語）が、禁止語スキャンの定義とテスト以外で 0 件。CI 緑

## フェーズ2：ハブの中身

- [x] 型とナビ：`kind: 'app' | 'tool'` の追加、`SECTIONS` に Tools、Tools の一覧と詳細、`/articles` → `/writing`。残った Skills・Journey・年表の CSS を消す。画面を触るので `DESIGN.md` を今ある決まりから作る（T7）
  完了条件：`npm run build` が通り、`dist/` に `tools*` と `writing*` があり、`skills*`・`journey*`・`articles*` が無い。`DESIGN.md` があり `apps-workflow:look` の「B 毎回の点検」を通っている
- [x] 文面：`profile.md` の一言・要点 3 行・短い本文、`llms.txt` / `llms-full.txt` の節、Ask AI の依頼文、OG 画像の文言（今は「Skills」が残っている）（T8）
  完了条件：本人が文案に OK。`llms.txt` に Skills / Journey の行が無く、OG 画像に「Skills」が無い
  結果：本人のレビューで要点 3 行と一言をやめ、各節の見出しの下に 1 行の説明を置いた。サイトの名前はコンペのあと「works」に（`logs/decisions.md` 2026-10-22・23）。2026-10-23 に本人が仕上がりに OK
- [x] 検査：禁止語にキャリア系の語を足す、`scripts/check-dist.mjs`（ビルド後の `dist/` 全体を検査）を作って CI に入れる、`check-home.mjs` の 3 点を今のトップ（名前と持ち主の行・Projects・Systems）に合わせて見直す（T9）
  完了条件：CI に `check-dist` が入り、わざとキャリア系の禁止語を書いたテストで落ちる
  結果：`check-home.mjs` は T8 の時点で今のトップに合っていたので直していない
- [x] Tools の中身：`claude-code-toolkit.md` を足し、`photo-prompt-builder.md` の visibility を public に直す。`app-template.md` の本文の「このサイトもこのテンプレートから作りました」を事実に合わせる（このサイトは前身から写した）。`claude-plugins.md`・`app-template.md` の `kind: tool` は T7 で済んだ（T10）
  完了条件：`/tools` に 3 件。`check:repos` の食い違いが 0
  結果：`check:repos` は T11 で作るので、同じ突き合わせを `gh repo view` で手で回して 12 件すべて一致を確かめた
- [x] 検算スクリプト `check:articles`（Qiita と `articles.json` の突き合わせ）・`check:repos`（`repo` の URL と visibility の突き合わせ）。CI には入れない（T11）
  完了条件：手で回して、Qiita の未掲載の記事と visibility の食い違いが一覧で出る
  結果：2026-10-24 に回して、Qiita の未掲載 4 本・visibility の食い違い 0 件
- [x] 文書の書き直し：README・CLAUDE.md・PLAN・SPEC を新しい方針で書き、前身の判断台帳から引き継ぐ決定を要約して `logs/decisions.md` に移す。前身の名残（`.gitignore`・`.prettierignore` の `dashboard/`・`docs/design-candidates/`、コメントの `docs/design-candidates/` への参照、`src/lib/ask.ts` 冒頭の「区分」）も片付ける（T12）
  完了条件：`SPEC.md` が前身を参照せずに読める。`git grep` で計画文書 3-9 の禁止語が、禁止語スキャンの定義とテスト以外で 0 件
  結果：`.prettierignore` の `docs/design-candidates/**/*.html` は、このリポジトリに名前のコンペの見本の HTML があるので残した。`ask.ts` の「区分」は T8 で消えていた

## フェーズ3：公開

公開の条件（計画文書の T13・T14 の完了条件から Claude が書いた。本人には未確認）：

1. 本番 URL でトップ・Projects・Tools・Systems・Writing・Ask AI が開ける
2. HTML・Markdown 版・`llms.txt`・`llms-full.txt`・サイトマップのどこにもキャリアの情報が無い（`check-dist` と `curl`）。3 つの AI が Ask AI でキャリアの情報を答えない
3. README に、何のサイトかと更新の仕方がある

- [x] 本人がリポジトリを Public に切り替える（Claude はフックで止まる。フェーズ2 が終わってから）
  完了条件：`gh repo view n-yoshida-dev/works --json visibility` が PUBLIC
- [x] 本人が Vercel に新しいプロジェクト `n-yoshida-works` を作る（Import → プロジェクト名 → Deploy）（T13）
  完了条件：本番ドメインが 200。GitHub に `vercel[bot]` の deployment が付く
  結果：本番は https://works-eta-rosy.vercel.app 。トップ・各一覧・`/ask`・AI 向けファイルが 200。`vercel[bot]` の記録は deployments ではなく main の先端のコミットの状態（Vercel success）に付いた（2026-10-28）
- [x] 本番で公開の条件の 1・2 を確かめる。撮影（375px・1280px）と `curl` は Claude、3 つの AI で Ask AI を試すのは本人（T14）
  完了条件：`curl` で `/llms.txt` `/llms-full.txt` `/sitemap-0.xml` にキャリア系の語が無い。3 つの AI がキャリアの情報を答えない
  結果：Claude の分は 2026-10-28 に済み。本番の 48 ファイル（HTML 23 ページ・Markdown 版・llms・サイトマップ）を `check-dist` の規則で調べて 0 件、`/skills` `/journey` `/articles` は 404、撮影ははみ出し・エラー・外部への通信 0（比較ページ https://claude.ai/artifact/J5C852szsySycHrGAEVxm6 ）。
  同じ日に本人が 3 つの AI で試し、どれもキャリアの情報を答えなかった。ChatGPT と Claude は `llms.txt` を出典に挙げて答えた。Gemini は出典が無く、サイトに無い作品も挙げた（公開後の改善に 1 行）
- [ ] 外部の参照を新しい URL に：GitHub の homepage 欄、ops の成果物公開の工程 8 と成果物台帳、Beads の epic（T15）
  完了条件：`gh repo view n-yoshida-dev/works --json homepageUrl` が本番 URL。ops の文書に旧 URL が無い

## 公開後の改善

（公開の条件に当たらない改善を 1 行ずつ置く。合計に含めない）

- [ ] 開発ダッシュボードを足すか決める（前身にはあった。`apps-workflow:dashboard`）
- [ ] トップで同じ形の箱（外部リンク・Projects・Tools・Systems）が続くのを変えるか（T7 の点検役の好みの問題。比較ページ https://claude.ai/artifact/U4RMnoabvLkEDc7M7ic5Wz ）
- [ ] 押す所の大きさ（上部の目次・カードのリンク・パンくずが 24〜27px で、44px に届かない）と、hover の見た目が `@media (hover: hover)` の外にある点（T7 の点検の気づき。前からある形）
- [ ] OG 画像の最後の行（節の名前を等幅・リンクの青・中点でつないだ行）が DESIGN.md の「青はリンクだけ」に反する。消すか薄い文字色にするか（T8 の点検役。前からある形で、本人は 2026-10-23 にこの画像を見て OK）
- [ ] 表紙の目次の「About」を押すと名前と持ち主の行しか無い表紙に着く。目次の名前か行き先を変えるか（T8 の点検の気づき）。スマホの表紙の目次の最後の行の下に線が無い点も
- [ ] `claude-plugins.md` の中身の表を今の apps-workflow 2.0.0 に合わせる（進捗表は todo-progress に移り、スキルは 7 つ。highlights の「フック 3 つ・スキル 4 つ」も古い）（T10 で気づいた）
- [ ] `check:articles` の未掲載 4 本は、わざと載せていない記事のため毎回出る。載せない記事を除く仕組みを作るか（除く一覧を公開リポジトリに書くと題名が公開される点に注意）（T11 で気づいた）
- [x] Vercel のプロジェクト名が `works`（ドメインは `works-eta-rosy.vercel.app`）で、判断台帳 2026-10-20 の `n-yoshida-works` と違う。名前を直すか、台帳を今の名前に合わせるか（T13 で気づいた。Vercel のデプロイ記録のリンク先が `/works/` だった）
  結果：本人が `n-yoshida-works.vercel.app` をドメインに足した。プロジェクト名は `works` のまま（`logs/decisions.md` 2026-10-28）
- [ ] Gemini の Ask AI の答えが、サイトの全文ではなく別の情報（GitHub・Qiita など。Claude の推定）から作られていた。出典が無く、サイトに無い作品（経費申請の Web アプリなど）を挙げた。貼り付けた文に全文が入っていたか（コピーの失敗か）、全文があっても Gemini が使わなかったのかを確かめる（T14 で気づいた）
- [ ] 前身の TODO の保留 7 件（文面の細かいレビュー・自動取得・独自ドメイン・analytics・RAG）を、ここでやるか仕分ける

## 確認待ち（ユーザーの回答が要るもの）

（なし）

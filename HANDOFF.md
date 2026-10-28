# 引き継ぎ

`/apps-workflow:handoff` で更新する。**次のセッションが最初に読むファイル。**

**ここには「今どこにいるか」だけを書く。目安 40 行。履歴を積まない。**

| 書きたくなったこと | 行き先 |
|---|---|
| 決めたこと・理由・却下した案 | `logs/decisions.md`（`/decide` で追記） |
| ハマったこと・落とし穴・技術的な選択の理由 | `KNOWLEDGE.md` |
| やること・ユーザーへの確認待ち | `TODO.md` |
| やったこと | 書かない。`git log` と PR が持っている |
| 毎回守る手順・環境の注意 | `CLAUDE.md`（短く）か `.claude/rules/` |

## 進捗

```
進捗（TODO.md より自動集計・2026-10-28） / Progress from TODO.md

                     完了率  残り/全体  フェーズ   (done %, open/total, phase)
████████████████████  100%     0 / 1     フェーズ1：初期化
████████████████████  100%     0 / 6     フェーズ2：ハブの中身
██████████░░░░░░░░░░   50%     2 / 4     フェーズ3：公開
████████████████░░░░   81%     2 / 11    合計 / Total
公開まで残り 2 件（上から「フェーズ3：公開」の節まで） / 2 open until release
公開後（合計に含めない）：9 件（済み 1 件） / After release (not in total): 9 open, 1 done

前回の区切り（2026-10-28）から：完了 +0 件、タスクの数 +0 件 / Since last checkpoint (2026-10-28): done +0, tasks +0
```

## 現在地

- フェーズ：**フェーズ3「公開」**。フェーズ2 は終わった。仕様は `SPEC.md`、判断は `logs/decisions.md`（前身から引き継いだ判断も末尾に要約済み）
- CI は `dist/` 全体の禁止語も見る（`npm run check:dist`）。手で回す検算は `check:articles`・`check:repos`（README「開発」）
- サイトの名前は「works」、表紙は名前・持ち主の行（Naoki Yoshida / n-yoshida-dev）・目次だけ（`logs/decisions.md` 2026-10-22・23）
- トップの節は About / Projects / Tools / Systems / Writing / Ask AI。Projects は 9 件（AI Study Coach は 2026-10-28 に外した。`logs/decisions.md`）、Tools は 3 件（claude-code-toolkit・claude-plugins・app-template）
- 見た目の決まりは `DESIGN.md`。画面を触る前に読む
- 計画の全体は ops の `docs/2026-10-20-制作活動ハブとキャリアプロフィールの分離計画.md` 4 節。このリポジトリで残っているのは T14〜T15。Beads の epic は ops-ei4
- リポジトリは Public（2026-10-25 に本人が切り替え）
- 本番は https://n-yoshida-works.vercel.app （2026-10-28 に本人がドメインを足した。最初の `works-eta-rosy.vercel.app` も開ける。Vercel のプロジェクト名は `works`。`logs/decisions.md` 2026-10-28）。main へのマージで自動でデプロイされる。デプロイごとの URL はログインが要るので、確かめるのは本番のドメイン
- `llms.txt` のリンクと canonical が新しい URL を指すかは、この PR のマージ後のデプロイで確かめる。古いほうのままなら、Vercel の環境変数 `SITE_URL` に新しい URL を入れてもらう（`astro.config.mjs` は `SITE_URL` を最優先で使う）
- T14 の Claude の分（撮影・`curl`・本番の禁止語の検査）は済み。残りは本人が 3 つの AI で Ask AI を試すこと
- 前身のサイトの文書（`../portfolio`。非公開の保存用）は読んでよいが写さない。ふだんは読まなくてよい
- 進め方：ユーザーの判断が要らない作業は、PR ごとに止まらず続けて進める（2026-10-23 本人が、判断の要らない作業は自動で進めてよいとした）
- ユーザー待ち：3 つの AI（ChatGPT・Claude・Gemini）で Ask AI を試し、キャリアの情報を答えなかったかを知らせること（T14 の残り）

## 次セッションで最初にやること

1. 本人の Ask AI の結果を受け取る。3 つともキャリアの情報を答えなければ T14 を閉じ、T15（GitHub の homepage 欄・ops の文書・Beads の epic を本番の URL に）に進む。答えたら、`logs/decisions.md` 2026-10-22 の見直す条件に当たるので本人に報告する

`TODO.md` の先頭と一致させる。書くのは最初の一手だけで、一覧は `TODO.md` が持つ。

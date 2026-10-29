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
████████████████████  100%     0 / 4     フェーズ3：公開
████████████████████  100%     0 / 11    合計 / Total
公開まで残り 0 件（上から「フェーズ3：公開」の節まで） / 0 open until release
公開後（合計に含めない）：11 件（済み 1 件） / After release (not in total): 11 open, 1 done

前回の区切り（2026-10-28）から：完了 +1 件、タスクの数 +0 件 / Since last checkpoint (2026-10-28): done +1, tasks +0
```

## 現在地

- フェーズ：**公開済み（2026-10-28）。今は「公開後の改善」**。フェーズ3 まで全部終わった。仕様は `SPEC.md`、判断は `logs/decisions.md`（前身から引き継いだ判断も末尾に要約済み）
- CI は `dist/` 全体の禁止語も見る（`npm run check:dist`）。手で回す検算は `check:articles`・`check:repos`（README「開発」）
- サイトの名前は「works」、表紙は名前・持ち主の行（Naoki Yoshida / n-yoshida-dev）・目次だけ（`logs/decisions.md` 2026-10-22・23）
- トップの節は About / Projects / Tools / Systems / Writing / Ask AI。Projects は 9 件（AI Study Coach は 2026-10-28 に外した。`logs/decisions.md`）、Tools は 3 件（claude-code-toolkit・claude-plugins・app-template）
- 見た目の決まりは `DESIGN.md`。画面を触る前に読む
- 計画の全体は ops の `docs/2026-10-20-制作活動ハブとキャリアプロフィールの分離計画.md` 4 節。このリポジトリの分（T6〜T15）は済んだ。T16（旧 Vercel を works へ転送）は 2026-10-29 にやめた（本人の判断。旧サイトはまだ誰にも見られていないので転送は要らない）。
  T17 も同じ日に済んだ（本人が旧 Vercel プロジェクトを削除し、portfolio を Archive にした）。計画の残りは無い
- リポジトリは Public（2026-10-25 に本人が切り替え）
- 本番は https://n-yoshida-works.vercel.app （2026-10-28 に本人がドメインを足した。最初の `works-eta-rosy.vercel.app` も開ける。Vercel のプロジェクト名は `works`。`logs/decisions.md` 2026-10-28）。main へのマージで自動でデプロイされる。デプロイごとの URL はログインが要るので、確かめるのは本番のドメイン
- `llms.txt` のリンク・canonical・OGP・サイトマップは新しい URL を指している（Vercel が新しいドメインを本番の URL として渡すので、環境変数 `SITE_URL` は要らなかった）
- GitHub の homepage 欄・ops の成果物公開の工程 8 と成果物台帳（A-14）は本番の URL を指す（T15）。プラグインや記事を公開したら、ops の工程 8 からこのリポジトリに PR が来る
- 前身のサイトの文書（`../portfolio`。非公開の保存用）は読んでよいが写さない。ふだんは読まなくてよい
- 進め方：ユーザーの判断が要らない作業は、PR ごとに止まらず続けて進める（2026-10-23 本人が、判断の要らない作業は自動で進めてよいとした）
- ユーザー待ち：なし（確認待ちは `TODO.md`「確認待ち（本人）」に書く。Qiita のプロフィールに URL を載せるかは本人の任意。`TODO.md`「公開後」）

## 次セッションで最初にやること

1. 「公開後の改善」から判断の要らないもの：`claude-plugins.md` の中身の表と highlights を今の apps-workflow（`~/.claude/plugins/installed_plugins.json` の導入版）に合わせる

`TODO.md` の先頭と一致させる。書くのは最初の一手だけで、一覧は `TODO.md` が持つ。

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
進捗（TODO.md より自動集計・2026-10-24） / Progress from TODO.md

                     完了率  残り/全体  フェーズ   (done %, open/total, phase)
████████████████████  100%     0 / 1     フェーズ1：初期化
████████████████░░░░   83%     1 / 6     フェーズ2：ハブの中身
░░░░░░░░░░░░░░░░░░░░    0%     4 / 4     フェーズ3：公開
██████████░░░░░░░░░░   54%     5 / 11    合計 / Total
公開まで残り 5 件（上から「フェーズ3：公開」の節まで） / 5 open until release
公開後（合計に含めない）：8 件（済み 0 件） / After release (not in total): 8 open, 0 done

前回の区切り（2026-10-23）から：完了 +1 件、タスクの数 +0 件 / Since last checkpoint (2026-10-23): done +1, tasks +0
```

## 現在地

- フェーズ：**フェーズ2「ハブの中身」**。T11（検算スクリプト）は PR `feat/check-scripts` で入った前提で書いている。CI は `dist/` 全体の禁止語も見る（`npm run check:dist`）。手で回す検算は `check:articles`・`check:repos`（README「開発」）
- サイトの名前は「works」、表紙は名前・持ち主の行（Naoki Yoshida / n-yoshida-dev）・目次だけ（`logs/decisions.md` 2026-10-22・23）
- トップの節は About / Projects / Tools / Systems / Writing / Ask AI。Tools は 3 件（claude-code-toolkit・claude-plugins・app-template）
- 見た目の決まりは `DESIGN.md`。画面を触る前に読む
- 計画の全体は ops の `docs/2026-10-20-制作活動ハブとキャリアプロフィールの分離計画.md` 4 節。このリポジトリで残っているのは T12〜T15。Beads の epic は ops-ei4
- **リポジトリはまだ Private。** Public への切り替えは本人がやる（TODO フェーズ3 の 1 件目。フェーズ2 が終わってから）
- Vercel のプロジェクトはまだ無い（T13。本人がブラウザで作る）
- 前身のサイトの文書（`../portfolio`。非公開の保存用）は読んでよいが写さない。SPEC と判断台帳はまだ前身を参照している（T12 で移す）
- 進め方：ユーザーの判断が要らない作業は、PR ごとに止まらず続けて進める（2026-10-23 本人が、判断の要らない作業は自動で進めてよいとした）
- ユーザー待ち：なし

## 次セッションで最初にやること

1. T12（文書の書き直し：README・CLAUDE.md・PLAN・SPEC を新しい方針で、前身の判断台帳から引き継ぐ決定を `logs/decisions.md` へ、前身の名残の片付け）。フェーズ2 の最後

`TODO.md` の先頭と一致させる。書くのは最初の一手だけで、一覧は `TODO.md` が持つ。

---
title: claude-plugins
kind: tool
tagline: 自作アプリで使い回す Claude Code プラグインのマーケットプレイス
summary: 自作アプリで使い回す Claude Code プラグインのマーケットプレイス。秘密情報のコミット阻止、編集直後の型チェック、進捗表、引き継ぎ、PR フロー、マージ前の受け入れレビュー役をまとめている。
repo: https://github.com/n-yoshida-dev/claude-plugins
visibility: public
status: active
period: 2026-08 〜
stack: [Shell, Claude Code plugin, GitHub Actions, shellcheck]
vibeCoding: true
order: 5
systems: [ai-assisted-development]
highlights:
  - 複数のアプリに設定をコピーせず、直す場所を 1 か所にするために作った
  - 中身はフック 4 つ・スキル 7 つ・エージェント 2 つ
  - 検査ロジックはシェルスクリプトに置いて単体で試せるようにし、CI で shellcheck とプラグインの検証を通す
---

## なぜ作ったか

複数の自作アプリを並行して進めると、Claude Code の設定（フック・スキル）を各リポジトリにコピーすることになり、
直すたびに全リポジトリを回ることになります。プラグインにすれば直すのは 1 か所で済みます。

## 中身（apps-workflow プラグイン）

| 種別 | 名前 | 何をするか |
|---|---|---|
| フック | guard-secrets | `git add` / `commit` / `stash` の直前にステージ済みファイルを検査し、秘密情報やローカル専用ファイルがあればブロックする |
| フック | check-edited | フロントエンドの TypeScript・Astro を編集したら typecheck と lint、Go なら `go vet` を自動で走らせる |
| フック | look-notice | 画面のファイルを変えたら、見た目の決まり（`DESIGN.md`）を読むことと、PR の前の見た目の点検を知らせる |
| フック | session-briefing | セッション開始時に、引き継ぎ文書と判断の台帳を先に読むよう知らせる |
| スキル | handoff / pr-check / pr-flow | 引き継ぎ文書の更新、CI と同じ検査のローカル実行、PR 作成からマージまでの手順 |
| スキル | look | 画面の見た目の方向を見本の比較で決め、画面を変えた PR ごとに撮影して点検する |
| スキル | codex-review / compete | 設計書を Codex に読み取り専用でレビューさせ、指摘を別のモデルが確かめる。設計案・画面案を複数のモデルが独立に作り、作り手を伏せて比べる |
| スキル | dashboard | 開発の状況（進捗・確認待ち・CI・最近の変更）を 1 画面で見るダッシュボードを、リポジトリごとに作る手順とテンプレート |
| エージェント | acceptance-reviewer | マージ前に差分を「完了条件」と仕様に照らして検品する読み取り専用の評価役。判定だけ返し、直すのは呼び出し側 |
| エージェント | look-reviewer | 撮った画面を、見た目の決まり・AI がよく作る形・使いやすさの基本に照らして点検する読み取り専用の点検役 |
| 依存 | todo-progress | 進捗表は公開版の [claude-code-toolkit](/tools/claude-code-toolkit) に移し、このプラグインを入れると一緒に入る |

## 守っていること

- 検査ロジックはシェルスクリプトに置き、単体で `echo '<json>' | bash hooks/xxx.sh` と叩いて検証できる状態を保つ
- フックはプロジェクトに無いもの（`frontend/` が無い等）を黙ってスキップし、エラーを出さない
- 利用側に配る変更は `version` を上げる。CI で `claude plugin validate --strict` と shellcheck を通す
- ハマった点（スキル内のシェル埋め込みは単純な 1 コマンドだけにする、`enabledPlugins` に書くだけでは install されない等）は README に残す

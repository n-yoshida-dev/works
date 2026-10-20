# works

Naoki Yoshida の制作活動ハブ（公開サイト）。自作アプリ・開発支援ツール・開発と学習の仕組み・技術記事を紹介する。
Astro の静的サイトで、コンテンツは `public-profile/` の Markdown / JSON。構成と運用は `README.md`。

## セッション開始時にすること

1. **`HANDOFF.md` を読む** — 現在地と次の一手だけがある（決定事項や履歴は持たない）
2. **設計・方針を提案する前に `logs/decisions.md` を読む** — ユーザーと合意済みの判断。蒸し返さない

未完タスクは SessionStart フックが `TODO.md` から自動で提示する。
引き継ぎは、区切りごとに Claude が `apps-workflow:handoff` をユーザーに聞かずに呼んで書く（`../CLAUDE.md`）。

## ドキュメントの役割

| ファイル | 役割 | 読み手 |
|---|---|---|
| `HANDOFF.md` | 現在地と次の一手だけ。履歴は持たない | AI |
| `logs/decisions.md` | ユーザーと合意した判断の台帳。`/decide` で追記 | AI |
| `PLAN.md` | 何を作るか・なぜ作るか | AI |
| `SPEC.md` | 確定仕様。コンテンツの型・ページ・AI 向け出力 | AI |
| `TODO.md` | タスクと進捗 | AI |
| `KNOWLEDGE.md` | 技術的な設計判断・ハマりどころ | AI |
| `README.md` | 構成・運用・公開情報の線引き | 人間 |

**同じ事実を AI 用と人間用の両方に書かない。** AI 用から人間用へリンクする。

## 守ること

- **このサイトはキャリアの情報を載せない。** これまでの仕事の内容・技術の到達度の評価・取得した認定は、別の非公開の置き場で扱う。
  ここからそこへのリンク・案内文は書かない（リンクは向こうからここへの一方向）。置き場の名前もこのリポジトリに書かない
- **このリポジトリは公開する前提。** `public-profile/` にも開発ドキュメント（TODO・HANDOFF・decisions・指示書）にも、「一般公開して問題ない情報」以外を書かない。
  線引きは `README.md`「公開してよい情報の線引き」。`npm run lint`（禁止語スキャン）がヒットしたら**書き直す**。許可リストは作らない
- **ユーザーの発言の原文を文書に写さない。** 要旨にとどめる（`../CLAUDE.md`「個人情報の取り扱い」）。原文を残したいときは ops に置き、ここには「ops に記録」とだけ書く
- **非公開リポジトリ（personal-ai-context / study / ops / writing ほか）の中身をコピーしない。** 参照するのは「存在と目的」まで。
  固有名詞（会社名・製品名・案件名・家族・地名）はスキャンで拾えないので目視で確認する
- **旧サイト（手元の `../portfolio`。非公開の保存用）の文書は読んでよいが、写さない。** コードの写しはこのリポジトリの最初の PR で済んでいる
- **コンテンツの正本は `public-profile/`。** ページ側（`src/pages/`）に文章を直書きしない。見出し・説明文などの定型文だけを置く
- **HTML は人間向けに短く、Markdown 版・llms.txt は AI 向けに詳しく。** 長い本文は `highlights`（要点 3 行）を書いて HTML では畳み、Markdown 版は全文のまま
- **frontmatter の項目を増やすときは `src/content.config.ts` と `README.md`「コンテンツの更新」を同時に直す**
- **ライブラリを増やさない。** 素の CSS、JavaScript は Ask AI のコピーと目次のスクロール監視だけ。追加するなら `KNOWLEDGE.md` に理由を書く
- `frontend/` `backend/` には分けない（サイトがリポジトリ直下）。そのため apps-workflow の `check-edited.sh` は効かない。編集後は `npm run typecheck` を自分で回す
- git の作者メールは noreply（`git config user.email` をこのリポジトリに設定済み）。Gmail で commit しない

## Claude Code の設定

共通のフック・スキル・エージェントは [apps-workflow プラグイン](https://github.com/n-yoshida-dev/claude-plugins)から来る（`.claude/settings.json` の `enabledPlugins`）。
部品の一覧はプラグインの [README](https://github.com/n-yoshida-dev/claude-plugins/blob/main/plugins/apps-workflow/README.md) にあり、ここには写さない（写すと古くなる）。
`enabledPlugins` に書くだけでは入らず、アプリごとに project スコープの install が要る（手順は `../app-template/SETUP.md` §2）。

`/apps-workflow:pr-check` は `frontend/` が無いので使えない。代わりに README の「CI と同じ検査」を回す。

## 共通ルール

自作プロダクト共通の開発ルール（Git 運用・コーディング規則）は `../CLAUDE.md` にある。上位ディレクトリの CLAUDE.md は自動でロードされる。

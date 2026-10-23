---
title: About
description: Naoki Yoshida が作ったアプリや道具と、書いた記事を置いているサイト。
updated: 2026-10-22
links:
  - label: GitHub
    url: https://github.com/n-yoshida-dev
    note: すべてのコードと設計判断（ADR）の一次情報
    icon: code
  - label: Qiita
    url: https://qiita.com/n-yoshida-dev
    note: Spring Boot / 認証 / API 設計の学習記録（連載）
    icon: pen
  - label: Reading Log
    url: https://n-yoshida-dev.github.io/reading-log/
    note: 読書記録の公開サイト（GitHub Pages）
    icon: book
---

## 作っているもの

- **自分のためのアプリ**：学習の理解度を可視化する skill-matrix、読書記録 Reading Log、家計・タスク・メールの半自動化。何を作るかと仕様は自分で決め、コードが要る部分は AI（Claude Code）が書いています。一覧は [Projects](/projects)
- **開発の道具**：秘密情報のコミットを止めるフック、PR の作成からマージまでの手順を書いたスキル、マージ前に検品するレビュー役を Claude Code のプラグインにまとめ、どのアプリにも同じものを入れています。新しいアプリを始めるときのテンプレートもあります。一覧は [Tools](/tools)
- **仕組み**：アプリと道具の組み合わせ方。AI 間で共有する個人コンテキストのリポジトリや、学習・読書の仕組みがあります。[Systems](/systems) にあります

## 書いているもの

学習用の [OrgFlow](/projects/orgflow)（Java / Spring Boot のワークフロー API）で、設計・実装・開発基盤づくりを自分で書いて学び、その過程を Qiita に連載しています。
バイブコーディングはせず、AI と壁打ちしながら自分で実装しています。記事の一覧は [Writing](/writing) にあります。

## 開発の進め方

- **設計判断を文書に残す**：ADR（Architecture Decision Record）、OpenAPI を先に書く契約先行、ER 図を概念・論理・物理の 3 段で持つ
- **AI との分担を作品ごとに決める**：自作アプリはコードを AI が書き、何を作るかと判断は自分。学習用の OrgFlow は AI を壁打ち相手にして自分で書く
- **仕組みで防ぐ**：秘密情報のコミット阻止フック、CI、マージ前の受け入れレビュー、公開する文章の禁止語スキャン
- **根拠のない「分かった」を書かない**：理解度は根拠（確認問題・自分の言葉での説明・実装）付きでしか上げない。仕組みは [Learning System](/systems/learning-system) にあります

## 公開している範囲

非公開のリポジトリ（学習ログ・個人コンテキスト・雑務）は、存在と目的だけを書いています。中身は載せていません。
AI に調べさせたい場合は [Ask AI](/ask) と [llms.txt](/llms.txt) を使ってください。

---
title: Profile
description: Naoki Yoshida。生活や学習で使うツールと、AI と開発する仕組みを作り、Java / Spring Boot を学んでいます。
updated: 2026-10-20
tagline: 生活や学習で使うツールと、AI と開発する仕組みを作っています。
highlights:
  - label: 個人で作っているもの
    title: 生活や学習で使うツールを、AI と作っている
    detail: 理解度を見える化する skill-matrix、次に読む 1 冊を AI が提案する Reading Log など。何を作るかは自分で決める
  - label: AI と開発する仕組み
    title: AI に開発を任せるための道具を、自分で作っている
    detail: 秘密情報のコミットを止めるフックや、マージ前に検品するレビュー役を Claude Code のプラグインにまとめ、どのアプリにも同じものを入れている
  - label: 学んでいること
    title: Java / Spring Boot を自分で書いて学んでいる
    detail: 学習用の OrgFlow。バイブコーディングはせず、AI と壁打ちしながら実装
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

## どんな人か

日本のソフトウェアエンジニアです。生活や学習で使うツールと、AI と開発する仕組みを作り、その記録を記事に書いています。

## 個人で作っているもの

- **自分のためのツール**：学習の理解度を可視化する skill-matrix、読書記録 Reading Log、家計・タスク・メールの半自動化。何を作るかと仕様は自分で決め、コードが要る部分は AI（Claude Code）が書いています
- **AI と開発する仕組み**：秘密情報のコミットを止めるフック、PR の作成からマージまでの手順を書いたスキル、マージ前に検品するレビュー役を Claude Code のプラグインにまとめ、どのアプリにも同じものを入れています。AI 間で共有する個人コンテキストのリポジトリもあります

一覧は [Projects](/projects)、組み合わせ方は [Systems](/systems) にあります。

## 学んでいること

2026 年 3 月から、学習用の [OrgFlow](/projects/orgflow)（Java / Spring Boot のワークフロー API）で、設計力・コーディング力・開発基盤や環境を作る力を身につけています。
バイブコーディングはせず、AI と壁打ちしながら自分で実装しています。並行して React を学習中です。

## 開発の進め方

- **設計判断を文書に残す**：ADR（Architecture Decision Record）、OpenAPI を先に書く契約先行、ER 図を概念・論理・物理の 3 段で持つ
- **AI との分担を作品ごとに決める**：自作ツールはコードを AI が書き、何を作るかと判断は自分。学習用の OrgFlow は AI を壁打ち相手にして自分で書く
- **仕組みで防ぐ**：秘密情報のコミット阻止フック、CI、マージ前の受け入れレビュー、公開プロフィールの禁止語スキャン
- **根拠のない「分かった」を書かない**：理解度は根拠（確認問題・自分の言葉での説明・実装）付きでしか上げない。仕組みは [Learning System](/systems/learning-system) にあります

## このサイトについて

このサイトは「公開してよい情報だけ」を明示的に置いた場所です。
非公開のリポジトリ（学習ログ・個人コンテキスト・雑務）から、公開可能な部分だけを抜き出して手で書いています。
AI に調べさせたい場合は [Ask AI](/ask) と [llms.txt](/llms.txt) を使ってください。

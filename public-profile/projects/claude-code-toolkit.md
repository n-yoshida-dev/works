---
title: claude-code-toolkit
kind: tool
tagline: 毎日使っている Claude Code のプラグインを、誰でも入れられる形にした公開版
summary: 個人開発で毎日使っている Claude Code のプラグインとスキルを、ほかの人も導入できる形にしたマーケットプレイス。最初の 1 つは、TODO.md から進捗表を作る todo-progress。
repo: https://github.com/n-yoshida-dev/claude-code-toolkit
visibility: public
status: active
period: 2026-10 〜
stack: [Shell, Claude Code plugin, GitHub Actions, shellcheck]
vibeCoding: true
order: 3
systems: [ai-assisted-development]
---

道具ごとに 1 つのプラグインに分け、要るものだけを入れられるようにしています。

最初に公開した todo-progress は、`TODO.md` のチェックボックスを見出しごとに数え、進捗バー・残り件数・公開までの残り・前回の区切りからの増減を表にします。
セッションを始めるたびに表を Claude に渡し、Claude が最初の返答で見せます。見出しの語は設定で変えられます。

各プラグインの README に、フックが読むもの・書くもの・ネットワークへの接続の有無を書いています。
CI で JSON の検査・shellcheck・回帰テスト・`claude plugin validate --strict` を通します。
自作アプリ用の [claude-plugins](/tools/claude-plugins) も、進捗表はこの todo-progress を使っています。

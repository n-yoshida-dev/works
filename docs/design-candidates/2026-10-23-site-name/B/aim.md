## 狙い
サイト名を「Yoshida Works」とし、本名を大きく掲げる気恥ずかしさを和らげる。
「Works」を主役にして、人物よりも作ったものを見に来る入口にする。
本名は小さな署名として表紙に残し、GitHub で見た名前とのつながりを保つ。

## 節ごとの工夫
1. サイトの名前：「Yoshida Works」。姓で本人とのつながりを保ち、Works でアプリ・道具・仕組み・記事をまとめて受け止める。固有性の強さより、持ち主と内容が読み取れることを優先した。
2. 表紙の見せ方：題名を「Yoshida」「Works」の2段に組み、Works を大きく、本名を小さく添える。PC は左右2列、スマホは縦並びと目次2列を保ち、スマホでも件数分の ■ を小さく表示する。

## 文面を変えた所
- サイト名（input/site.ts:5 の SITE.name）：Naoki Yoshida → Yoshida Works。表紙・左の目次・著作権表示・llms.txt／llms-full.txt の見出し・Ask AI の依頼文中のサイト名にも同じ置換を適用する想定。
- トップのタブの題名（input/site.ts:7 の SITE.title、input/Base.astro:19）：Naoki Yoshida → Yoshida Works。トップの og:title・twitter:title、og:site_name も同じ名前にする。
- 各ページのタブの題名（input/Base.astro:19）：ページ名 — Naoki Yoshida → ページ名 — Yoshida Works。各ページの og:title・twitter:title も同じ置換。
- OG 画像の名前（input/generate-og.mjs:12）：Naoki Yoshida → Yoshida Works。画像の色・配置・その他の文面は維持する想定。この見本には OG 画像を含めていない。
- 表紙の署名：なし → Naoki Yoshida。題名の下に追加し、持ち主を明示する。
- 一言（input/profile.md:5）：変更なし。「作ったアプリや道具と、書いた記事を置いています。」を維持。
- 説明文（input/profile.md:3）：変更なし。「Naoki Yoshida が作ったアプリや道具と、書いた記事を置いているサイト。」を維持。

見本の目次は既存トップの節へのリンク先を保持している。表紙だけの見本のため、About 以外の移動先本文は含めていない。ブラウザでの実表示検証は未実施。

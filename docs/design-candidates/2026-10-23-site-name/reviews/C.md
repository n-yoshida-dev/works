## Slot C Review

### Spec Compliance: PASS

**確かめ方**：`index.html` と `aim.md` を全文読み、材料（`site.ts`・`profile.md`・`Base.astro`・`generate-og.mjs`・`index.astro`・`global.css`・`DESIGN.md`・3 枚の画像）と照らした。表示は手元の headless Chromium（`--force-prefers-reduced-motion` で動きを止めて撮影）で 1280px・375px・320px を見た。横のはみ出しは 1280px では数値で確認（`scrollWidth` 1280 = `innerWidth` 1280、はみ出し無し）。375px・320px は headless の最小ウィンドウ幅の都合で数値が取れず、撮影画像の目視だけ（右端の「10 件」まで切れずに収まっている）。

**Requirements checked:**
- 1 案につき名前は 1 つ → ADDRESSED: `aim.md`「1. サイトの名前」で `SITE.name` / `SITE.title` を「n-yoshida-dev / works」の 1 つの文字列と明記。`index.html` の `<title>`（6 行目）と `<h1>`（322〜325 行目）も同じ名前
- 表紙の見本はその名前で描く → ADDRESSED: `index.html` 318〜341 行目の `.cover`。1 行目「n-yoshida-dev /」（薄い文字・400）、2 行目「works」（600）
- 代わりの名前の候補を理由付きで aim.md に → ADDRESSED: `aim.md`「1. サイトの名前」の末尾に 2 候補（「works — Naoki Yoshida」「n-yoshida-dev」だけ）と、それぞれを採らなかった理由
- 節「1. サイトの名前」「2. 表紙の見せ方」 → ADDRESSED: `aim.md`「節ごとの工夫」に両方
- 文面を変えたら、変えた所と元の文を並べて書く → ADDRESSED: `aim.md`「文面を変えた所」に 11 行。`index.html` の全文面を正本と照らした結果、申告漏れの言い換えは無し（下の Pass 2）
- Private の原文・個人の事実を書かない → ADDRESSED: `aim.md`・`index.html` とも、材料にある公開情報（ハンドル名・本名・一言・説明文・リンクの説明）だけ
- キャリアの情報を名前・一言に入れない → ADDRESSED: 名前は「n-yoshida-dev / works」、一言は現行のまま（`profile.md` の `tagline` と一字一句同じ）
- 色は DESIGN.md の 7 色、Web フォント無し、グラデーション・影・光るカード無し、青はリンクだけ → ADDRESSED: `:root`（9〜19 行目）の 7 値と暗い画面の値（20〜30 行目）は DESIGN.md の表と一致。`<link>` 無し、`box-shadow` / `gradient` / `@import` を grep して 0 件。青（`--link`）はリンクカードの名前（`.link-label`）と OG 見本の 3 行目（`.og-l3`。現行の `og.png`・`generate-og.mjs` 25 行目も `#0969da`）だけ
- 表紙に置くのは名前・一言・目次。題名と持ち主の名前は合わせて「名前」の枠 → ADDRESSED: 持ち主と題名を 1 つの `<h1>` に入れている（322〜325 行目）。表紙の中身は h1・`.lead`・`.ix`・↓ の矢印（矢印は現行 `index.astro` にもある）
- 目次 6 項目・並び順・件数・■ の図を残す → ADDRESSED: 331〜336 行目に About / Projects 10 件 / Tools 2 件 / Systems 4 件 / Writing 21 本 / Ask AI。件数は `cover-1280.png` と一致。■ は `data-n` から script（392〜398 行目）で並べ、PC の撮影で現行と同じ形
- どの名前でも持ち主が分かる → ADDRESSED: ハンドル名が h1 の 1 行目にある。GitHub のリンクカード（345 行目）も表紙の直後に残し、フッターの見本（379 行目）に本名
- OG 画像は文言だけ変え、色と配置は今のまま → ADDRESSED: `.og` の見本（368〜374 行目）は名前だけ差し替え、2〜4 行目の英文と色（`#1f2328` / `#59636e` / `#0969da`）は `generate-og.mjs` 13〜15・22〜25 行目と一致。`aim.md` でも「色・配置・ほかの 3 行は今のまま」
- 見本は明るい画面だけでよい → ADDRESSED（暗い画面の値も付けているが、害は無い）
- リポジトリ名・Vercel 名・URL は変えない → ADDRESSED: 触れていない

**Unrequested additions:**
- 表紙の下の「名前が出るほかの場所」の節（351〜390 行目）。353 行目で「見本の説明です。実際のページにはこの節を置きません」と断っている。タブ・左の目次・OG 画像・フッター・llms.txt・説明文の 6 か所を 1 画面で見比べられ、ブリーフの「タブの題名・OG 画像に出す名前（表紙と変えてもよい）」の判断材料になるので、害ではなく助け
- 表紙の直後のリンクカード 3 枚（343〜349 行目）。現行ページにもある部分で、文面は `profile.md` の `links` と一致。アイコンは線の四角の仮置き（`.icon-ph`）

### Issues

**Critical**:
None found.

**Important**:
1. **名前が「GitHub の Private リポジトリの見出し」と同じ形になる点を、aim.md が検討していない**
   What: 案の狙いは「GitHub のリポジトリの見出しと同じ『持ち主 / 題名』の形」（`aim.md`「狙い」1 つ目）。だがこのサイトのリポジトリは Private にする前提で、`site.ts` 15 行目のコメントに「このサイトのリポジトリへのリンク（repoUrl）は 2026-10-20 に外した。リポジトリを Private にするため、訪問者に 404 を見せない」とある
   Where: `aim.md`「狙い」・`index.html` 62〜65 行目のコメント
   Impact: 「n-yoshida-dev / works」を見た GitHub 慣れの訪問者が `github.com/n-yoshida-dev/works` を開き、404 に当たる。「訪問者に 404 を見せない」ために repoUrl を外した判断と、表紙の見せ方が逆向きになる
   Fix: 採るなら、aim.md にこの点を書き、受け入れるか（ハンドル名からプロフィールへは行ける）、区切りを「/」以外（「—」や改行だけ）にして「リポジトリの見出し」の連想を弱めるかを示す
2. **左の目次の一番上（PC）で 1 行に収まるか、aim.md が確かめていない**
   What: `aim.md`「文面を変えた所」は「左の目次の一番上：n-yoshida-dev / works」を 1 行の前提で書くが、PC の左の目次は 16rem 幅・左右 1.5rem の余白（`global.css` 228・240 行目）で、文字に使えるのは 13rem = 208px。`.side .brand` は PC で 1.25rem（`global.css` 243〜245 行目）。手元の撮影で、見本の `.brand-mock`（1.1rem）は約 185px だったので、1.25rem では約 210px になり 208px を超える
   Where: `index.html` 363 行目の `.brand-mock`（1.1rem で描いている。PC の 1.25rem ではない）
   Impact: PC の左上で「n-yoshida-dev /」「works」の 2 行に折れる。折れ方自体は読めるが、aim.md の「1 行の『n-yoshida-dev / works』で出す」（353 行目の説明文にも同じ記述）と食い違う。実際の幅は OS の書体で変わるため、折れるかは [UNVERIFIED]（手元は Linux の代替書体）
   Fix: `.brand` の文字を 1.25rem→1.1rem に落とす、または左の目次だけ 2 行（持ち主を薄く上、題名を下）にすると決めて aim.md に書く

**Minor**:
1. **h1 の文字列に「/」の前の空白が無い** — `index.html` 323 行目 `n-yoshida-dev<span class="slash">/</span>` — 見た目の間隔は `margin-left: 0.35em`（79 行目）で作っているため、h1 の `textContent` は「n-yoshida-dev/ works」になり、ほかの場所の「n-yoshida-dev / works」と一致しない。コピーや検索、読み上げの切れ目がわずかに違う。`/` の前に通常の空白を入れれば済む
2. **「開くときの動きは今のまま」は厳密には違う** — `aim.md`「狙い」3 つ目と `index.html` 175〜192 行目 — 現行は h1→一言（0.12s 遅れ）だが、案は持ち主→題名（0.08s）→一言（0.16s）の 3 段。1 行足した分の調整として妥当だが、「今のまま」ではなく「1 段足した」と書くほうが正確
3. **DESIGN.md の「表紙の名前 2.4〜4.5rem」を外れることを書いていない** — `index.html` 84・150 行目（スマホ 3.6〜6.25rem、PC 7rem）と `DESIGN.md` Typography — 大きさの変更はブリーフで許されているが、採ると DESIGN.md の `cover-name`（4.5rem / 1.08 / -0.02em）と「文字の大きさの段」の行を直す必要がある。aim.md にその一言が無い
4. **一言に `max-width: 30em` が新しく付いている** — `index.html` 91 行目 — 現行 `global.css` 303〜308 行目には無い。今の一言は短いので見た目は変わらないが、「一言は今のまま」の範囲を少し超える。申告は不要な程度だが、実装時に CSS を写すなら意識する点
5. **OG 画像で題名とハンドル名が 72px 太字で並び、説明文は本名で始まる** — `index.html` 370 行目と 387 行目 — SNS のカードでは `og:title`「n-yoshida-dev / works」の直下に `og:description`「Naoki Yoshida が作った…」が出るので、1 枚のカードに 2 つの名乗りが並ぶ。案は意図して本名を説明文に残している（`aim.md`「狙い」2 つ目）ので矛盾ではないが、持ち主が「本名が目立つのが気恥ずかしい」なら、OG の見え方も含めて判断する材料になる

### Strengths (Worth Keeping for Synthesis)

1. **「持ち主 / 題名」を 1 つの h1 に入れ、サイズと濃さで役割を分けた** — `index.html` 66〜88 行目・322〜325 行目 — ハンドル名は 400・薄い色・1.05〜1.45rem、題名は 600・本文色・スマホ 3.6rem 以上。ブリーフの「題名と持ち主の名前は合わせて名前の枠」を、見出しを増やさずに満たしている。本名を題名にしないという持ち主の要望（ブリーフ「本人の考えの要旨」）に、本名を消さずに応えている
2. **短い題名の利点を実測で活かしている** — `aim.md`「2. 表紙の見せ方」「語が短いので、スマホでも 1 行で大きく見せられる」 — 375px・320px の撮影で「works」は 1 行のまま 4.45rem 相当（19vw）で出ており、現行の「Naoki Yoshida」（375px で 10vw = 2.3rem 相当）より大きい。主張が画面で裏づけられている
3. **名前が出る 6 か所を 1 枚で並べた説明の節** — `index.html` 351〜390 行目 — タブ（トップと「Projects — …」の 2 種）・左の目次・OG 画像（1200×630 を `container-type` と `cqw` で縮小し、`generate-og.mjs` の座標比 x=120/1200=10%、y=230/630≈36% に近い配置）・フッター・llms.txt・説明文を、正本の文面のまま再現している。ほかの案と比べるとき、「表紙以外でどう見えるか」をここだけで確かめられる
4. **「文面を変えた所」が場所ごとに元→後を書き、変えない所も明記している** — `aim.md`「文面を変えた所」 — フッター・一言・説明文の「変えない」を並べたことで、照合に漏れが出ない。Ask AI の依頼文は「材料に無く、未確認」と正直に書いている（`index.html` 側にも Ask AI の依頼文の見本は無く、推測で作っていない）
5. **代わりの候補の却下理由が具体的** — `aim.md`「1. サイトの名前」 — 「works — Naoki Yoshida」は「本名がまた表紙に大きく出る」、「n-yoshida-dev」だけは「GitHub のプロフィールと区別がつかず、サイトの中身を表さない」と、持ち主の悩み（本名の大きさ）と訪問者の視点（中身が分かるか）の両方で切っている

### Approach Hint Influence

Hint was: "なし（作り手に方向の指定はしていない）"
How it shaped the draft: 指定が無いぶん、作り手は材料の中の手がかり（リポジトリ名 `works`・Vercel 名 `n-yoshida-works`・ハンドル名 `n-yoshida-dev`・DESIGN.md の手本「GitHub と並べて違和感のない」）だけから名前を組み立てている。結果として「GitHub のリポジトリの見出しの形」という 1 本の筋で、名前・表紙の段組み・左の目次・OG 画像まで同じ形に揃えた。方向の指定が無いことで、既存の資産名に寄せる保守的な案になっている（新しい造語の名前は候補にも無い）。

### Verdict

**Contender?** Yes
**Why:** ブリーフの要件は全て満たし（Critical 0）、申告漏れの言い換えは正本との照合で 0 件、表紙は 1280px・375px・320px で崩れず、主張（スマホで 1 行・現行より大きい）は撮影で裏づけられる。Important は 2 件で、どちらも設計の見落とし（Private リポジトリの見出しを模す形になること、PC の左の目次で 1 行に収まらない見込み）であり、文面を直せば解消できる範囲。本名を題名から外しつつフッター・説明文・GitHub カードで持ち主が分かる構成は、持ち主の「気恥ずかしい」に正面から答えた案として比較の軸になる。

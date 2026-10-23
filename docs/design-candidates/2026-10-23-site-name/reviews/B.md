## Slot B Review

### Spec Compliance: PASS

**Requirements checked:**
- 1 案につき名前は 1 つ → ADDRESSED: aim.md「節ごとの工夫 1」で「Yoshida Works」の 1 つ。index.html の `<title>`・`og:site_name`・`og:title`・`twitter:title`・`<h1>` すべて同じ名前
- 表紙の見本はその名前で描く → ADDRESSED: index.html の `<h1 id="site-name"><span class="surname">Yoshida</span> <span class="works">Works</span></h1>`。headless Chromium で 1280px・1024px・375px・320px を描画して確認した
- 代わりの名前の候補があれば理由付きで添える → 任意の項目。aim.md に候補は無い（「狙い」「節ごとの工夫」「文面を変えた所」の 3 節だけ。「候補」「代わり」の語は無い）
- 節 1「サイトの名前」 → ADDRESSED: aim.md「節ごとの工夫 1」
- 節 2「表紙の見せ方」 → ADDRESSED: aim.md「節ごとの工夫 2」と index.html
- 文面を変えた所と元の文を aim.md に並べて書く → ADDRESSED: aim.md「文面を変えた所」に 7 行。参照した行番号を材料と照合：site.ts 5 行目 `name: 'Naoki Yoshida'` ✓、7 行目 `title: 'Naoki Yoshida'` ✓、Base.astro 19 行目 `fullTitle` ✓、generate-og.mjs 12 行目 `const name = 'Naoki Yoshida'` ✓、profile.md 3 行目 description ✓・5 行目 tagline ✓。すべて正しい
- Private の原文・個人の事実を書かない → ADDRESSED: 本名・サイト名・既存の一言以外の個人の事実は無い
- キャリアの情報を名前・一言に入れない → ADDRESSED: 名前「Yoshida Works」、署名「Naoki Yoshida」、一言は元のまま。職種・肩書きの語は無い
- 色は DESIGN.md の 7 色の範囲、Web フォント無し、グラデーション・影・光るカード無し、青はリンクだけ → ADDRESSED: `:root` の `--fg:#1f2328 --muted:#59636e --line:#d1d9e0 --bg:#ffffff --link:#0969da` はすべて DESIGN.md の表の値。`--link` は宣言だけで未使用（青はどこにも出ない）。`@font-face`・`<link>` 無し。`box-shadow`・`gradient` 無し。書体の並びは DESIGN.md と同じ文字列
- 表紙に置くのは名前・一言・目次。題名と持ち主の名前を両方置くときは合わせて「名前」の枠 → ADDRESSED: `.identity` に h1（題名）・`.owner`（Naoki Yoshida）・`.tagline`、`nav` に目次、他は `↓` だけ（元の `index.astro` 91 行目にも `↓` がある）
- 目次の 6 項目・並び順・件数と ■ の図を残す → ADDRESSED: About / Projects / Tools / Systems / Writing / Ask AI の順。件数 10 件・2 件・4 件・21 本は `cover-1280.png` と同じ。`<i>` の数を数えた：Projects 10・Tools 2・Systems 4・Writing 21 で件数と一致
- どの名前でもサイトのどこかから持ち主が分かる → ADDRESSED: 表紙の `.owner` に本名。加えてブリーフの事実のとおり GitHub のリンクカードと左の目次の下のリンクが残る前提
- リポジトリ名・Vercel・URL は変えない → ADDRESSED: aim.md はこれらに触れていない
- OG 画像は名前の文言だけ変える → ADDRESSED（文章のみ）: aim.md「OG 画像の名前：Naoki Yoshida → Yoshida Works。画像の色・配置・その他の文面は維持する想定」。見本の画像は無い（aim.md が「この見本には OG 画像を含めていない」と明記）
- 見本は明るい画面だけでよい → ADDRESSED: `color-scheme:light` の 1 組だけ

**Unrequested additions:**
- スマホ（1023px 以下）の目次にも ■ の図を出す（aim.md「スマホでも件数分の ■ を小さく表示する」、CSS `@media(max-width:1023px){ .squares{grid-column:2/-1;grid-row:2;...} .squares i{flex-basis:4px;width:4px;height:4px} }`）。今のサイトは 64rem 未満で `.ix-sq,.ix-go{display:none}`（global.css）で、`cover-375.png` にも ■ は無い。ブリーフの「変えてよいこと」は名前・一言・その 2 つの見せ方・タブ・OG だけで、目次の見せ方は含まれない。aim.md に書いてあるので黙っての変更ではないが、お題の外の変更
- マウスを乗せたときの `→`（`.ix-go`）と、開いたときの 1 回の動き（`cover-rise` / `cover-draw` / `cover-count`）が見本に無い。見本の範囲として省いたと読めるが、aim.md に「省いた」とは書いていない

### Issues

**Critical** (blocks shipping — missing requirements, factual errors, fundamental structural problems):

None found.

**Important** (should fix — weak arguments, unsupported claims, clarity problems):

1. **スマホの目次の作り替えがお題の外**
   What: 今のサイトはスマホで ■ を出さない（global.css `.ix-sq,.ix-go{display:none}`、`cover-375.png`）のに、見本は 4px の ■ を 2 行目に並べ、1 行の高さを `min-height:72px`（今は `padding:0.45rem 0` で約 44px）にしている。375px の描画で目次の高さは 461〜673px の 212px
   Where: index.html `@media(max-width:1023px)` の `.index a{...min-height:72px}` と `.squares{grid-column:2/-1;grid-row:2}`。aim.md「節ごとの工夫 2」末尾
   Impact: 審査で「名前と表紙の見せ方」を比べるときに、目次の作り替えが混ざり、名前の案の良し悪しと切り分けられない。採択するとお題に無い変更を一緒に持ち込む
   Fix: スマホの目次は今の姿（■ 無し・行の高さも今のまま）に戻すか、aim.md に「お題の外。要らなければ外せる」と切り分けて書く

2. **名前の弱さを aim.md 自身が認めているのに、代案が無い**
   What: aim.md「固有性の強さより、持ち主と内容が読み取れることを優先した」と書き、「Yoshida」が固有性の弱い名前（よくある姓）であることを認めている。一方でブリーフが任意で求めた「代わりの名前の候補」は 1 つも無い
   Where: aim.md「節ごとの工夫 1」
   Impact: 本人は「もっと良い案があるかを知りたい」（ブリーフの事実）。1 案だけで、しかも弱点を認めた上で代案が無いと、本人が比べる材料にならない
   Fix: 「Yoshida Works」を選んだ理由に、URL `n-yoshida-works.vercel.app` と同じ語順（yoshida → works）で読めることを足し、代案（例：ハンドル名を使う形）を 1〜2 件、捨てた理由付きで並べる

3. **著作権表示が「© 2026 Yoshida Works」になる点の検討が無い**
   What: aim.md は SITE.name の置換先に「著作権表示」を含める（Base.astro 94 行目 `© {year} {SITE.name}`）。すると全ページのフッターの著作権者が人ではなくサイト名になり、本名はトップの表紙の 14px の署名だけになる
   Where: aim.md「文面を変えた所」1 行目
   Impact: 「サイトのどこかから持ち主が分かる」は表紙と GitHub のリンクで満たすが、トップ以外のページ（/projects など）には本名が 1 度も出なくなる。これは設計の帰結であって誤りではないが、aim.md が触れていないので本人が気づかずに決めることになる
   Fix: 著作権表示だけ本名のままにするか（SITE に `owner` を足す）、サイト名にする理由を aim.md に 1 行書く

**Minor** (nice to fix — word choice, tone, small structural tweaks):

1. **フォーカスの枠を自前にしている** — index.html `.index a:focus-visible{outline:2px solid var(--fg);outline-offset:4px}` — DESIGN.md「キーボードのフォーカスはブラウザの既定の枠のまま（消していない）」と食い違う。見本の範囲では影響が小さい
2. **`↓` がリンクでない** — index.html `<span class="down">` — 元は `<a class="cover-down" href="#after-cover">`。見本だけなら構わないが、実装時に戻す必要がある
3. **署名の小ささ** — `.owner{font-size:14px;color:var(--muted)}`。1280px で幅 100px・高さ 16px、112px の「Works」の直下。狙いどおり「小さな署名」だが、本名を「出したくないわけではない」本人の言葉に対し、ここまで小さくする必要があるかは本人の好みの問題
4. **320px で目次の名前と件数が 6px まで近づく** — 375px は問題なし。320px で「Projects」の右端 267px・「10 件」の左端 273px（`.label{white-space:nowrap}` のため、これより狭いと重なる）。ブリーフの要求は 375px なので支障はない
5. **PC の左右の余白が今より狭い** — `.cover{padding:64px 48px 80px}`。今は 1280px で左右 64px（`clamp(1.5rem,5vw,4.5rem)`）。読み比べると見本の方が左に寄る。配置の変更は許されている範囲

### Strengths (Worth Keeping for Synthesis)

1. **「Yoshida」を小さく、「Works」を大きく積む 2 段の題名** — index.html `.surname{font-size:42px}` `.works{font-size:112px}`、1280px の描画で「Yoshida」の高さ 49px・「Works」130px — 本名の気恥ずかしさを「姓は添え物、主役は作ったもの」という文字の大きさの差だけで解いている。色も書体も足さず、DESIGN.md の「線で区切った静かな紙面」から外れない。h1 の中身は `Yoshida Works` の 1 語なので、読み上げ・検索には 1 つの名前として伝わる
2. **本名を署名として表紙に残す** — index.html `<p class="owner">Naoki Yoshida</p>` — GitHub の表示名「Naoki Yoshida」（ブリーフの事実）とサイトを同じ画面でつなぐ。ブリーフの「持ち主が分かること」を、リンクを辿らずに表紙だけで満たす
3. **文面の変更台帳が正確** — aim.md「文面を変えた所」 — 7 行すべてのファイル名と行番号が材料と一致し（上の Spec Compliance）、一言と説明文を「変更なし」と明記して原文を並べている。黙った言い換えは無い（tagline・description を材料と文字単位で照合）
4. **今の CSS の骨組みを保っている** — `.cover-inner{grid-template-columns:minmax(0,1.45fr) minmax(0,1fr);max-width:1088px}` は今の `minmax(0,1.65fr) minmax(17rem,1fr)` / `max-width:68rem`（=1088px）とほぼ同じ。目次の名前の太さ（1024px 未満 600・以上 500）も DESIGN.md のとおり。実装に移すときの差分が小さい
5. **横のはみ出し無し** — 1280 / 1024 / 375 / 320px で `scrollWidth` が `innerWidth` と一致（headless Chromium で計測）

### Approach Hint Influence

Hint was: "なし（作り手に方向の指定はしていない）"
How it shaped the draft: 指定が無いので、作り手の判断で「姓 + Works」の折衷に落ち着いた。本名を捨てる（ハンドル名だけ）でも本名を残す（今のまま）でもなく、題名と署名を分けて「名前」の枠に 2 つ置くというブリーフの許した形を使った。構成は今の表紙を保ち、変えたのは題名の組み方と署名の追加だけで、保守的な案。代案を添えていないので、方向の広がりは他の案に頼ることになる

### Verdict

**Contender?** Yes
**Why:** ブリーフの必須項目はすべて満たし（Critical 0）、文面の台帳は行番号まで正確で黙った言い換えが無い。「Works を大きく、Yoshida を小さく、本名は署名」という見せ方は、本人の「本名が題名になるのが気恥ずかしい」に対して色や装飾を足さずに答えており、合成の芯にできる。弱点は Important 3 件：スマホの目次の作り替え（お題の外）、代案が無いこと、著作権表示が「Yoshida Works」になる帰結の未検討。いずれも案の核には触れず、直すのは容易

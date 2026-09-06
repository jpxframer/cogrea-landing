# Cogrea — Session Log

Running log of what was done, newest first. Read this first when picking the
project back up. Project conventions live in [README.md](README.md).

---

## Where things stand — 2026-09-06 14:10 WAT

**Repo:** https://github.com/jpxframer/cogrea-landing (public, branch `main`).
Pushed and in sync through "Translate the site with routed locales"; all commits
authored by `jpxframer`. (Check `git status -sb` rather than trusting a hash
written here — an early session recorded a commit that had never been pushed.)

> The user asked that no AI attribution appear anywhere near this repo. Do NOT
> add `Co-Authored-By`, "Generated with", or similar to commits or PRs.
> `AGENTS.md` and `CLAUDE.md` (auto-written by `next dev`) are gitignored on
> purpose — leave them untracked.

**Deployed:** the user has it live on Vercel with a custom domain. The URL was
never shared, so ask for it if you need to check the deployed build.
**Worth checking on the live domain:** the `next.config.ts` rewrite that keeps
`/` and `/legal/terms` working for English was only verified locally.

**Picking back up — open items, highest value first:**
1. Native-speaker review of the six-language copy in `src/i18n/messages/`
   before promoting those languages (especially Arabic).
2. An Arabic webfont — Poppins ships `latin` only, so Arabic falls back.
3. The five Figma copy questions for the designer (08:05, 08:30, 09:15 and
   11:40 entries).
4. Placeholder routes that 404: `/contact`, `/sign-in`, `/get-started`,
   `/download/google-play`, `/download/app-store` — now per-locale too.
5. Self-host Poppins; revisit the 1216px desktop legal measure.

**Built so far** — landing page, desktop + mobile:

| Section | Desktop node | Mobile node |
| --- | --- | --- |
| Nav | `18728:22992` | `18728:23398` |
| Hero | `18728:23017` | `18728:23412` |
| About | `18728:23029` | `18728:23424` |
| Audiences | `18728:23092` | `18728:23487` |
| How It Works | `18728:23186` | `18728:23581` |
| Why Choose Cogrea | `18728:23234` | `18728:23630` |
| Features | `18728:23278` | `18728:23674` |
| Get Started | `18728:23336` | `18728:23732` |
| Footer | `18728:23364` | `18728:23760` |

**Other routes:**

| Route | Desktop node | Mobile node |
| --- | --- | --- |
| `/legal/terms` | `18728:10408` | `18728:10519` |
| `/legal/privacy` | `18728:10623` | `18728:10735` |

**Next up:** every Figma frame the user has pointed at is now built — the whole
landing page plus both legal pages. Nothing is queued. The open items are the
copy questions below and the loose ends in README's "Not in the designs".
Full landing frames: desktop `18728-22990`, mobile `18728-23394`.

**Waiting on the user:** confirm the copy calls in the 08:05, 08:30 and 09:15
entries. The `#features` anchor question is settled — see 09:15. **All four nav
anchors now resolve.**

**Housekeeping:** local dev server stopped, ports 3000 and 3100 free.
`TaskStop` does not kill the Node process — kill the PID from
`netstat -ano | grep :3000` as well.

---

## 2026-09-06 14:10 WAT

**Done: the marketing site is genuinely translated, on routed locales.**

The user asked why content was not translating — it was the agreed scope of the
previous session (picker only). They then asked for the full thing, choosing:
- **routed locales** over client-side swapping, for SEO
- **legal pages left in English**, for browser translation to handle
- **no persistence** — a returning visitor starts on English again

### Architecture

Everything moved under `src/app/[lang]/`, which is now the root layout (it
renders `<html>`). `generateStaticParams` + `dynamicParams = false` prerenders
**18 pages** (6 locales x 3 routes). `<html lang>`/`dir` are set server-side, so
Arabic is RTL from first paint and indexable — no flash, no client context.

**English is unprefixed** so the already-live URLs keep working. `next.config.ts`
rewrites `/` -> `/en` and `/legal/:path*` -> `/en/legal/:path*`. Other locales are
prefixed (`/fr`, `/fr/legal/terms`). `hreflang` + canonical emitted per page.

**The old `src/lib/locales.ts` and `locale-provider.tsx` were deleted** —
localStorage, `useSyncExternalStore` and the whole client state layer are gone.
The URL is the only source of truth now. The picker calls `router.push` to the
same path in the new locale (`stripLocale` + `localePath`).

### Copy

`src/i18n/messages/{en,fr,de,es,it,ar}.ts`. **`en.ts` exports the `Dictionary`
type and every other locale is typed against it**, so a missing key is a build
error. Server components call `getDictionary(lang)` and pass slices as props —
no client i18n context.

Verified with a script that all six have **identical key shape AND array
lengths (92 leaves each)** — TypeScript alone would not catch a short array.

### Next 16 gotchas

- The generated route validator types params as `Promise<{ lang: string }>`,
  NOT your own union. Use the global `PageProps<"/[lang]">` /
  `LayoutProps<"/[lang]">` helpers and narrow with a `toSegment()` helper;
  annotating params with `LocaleSegment` fails the build.
- Stale `.next/types/validator.ts` from the old routes breaks `tsc` after
  moving files — `rm -rf .next` before rebuilding.
- Middleware is called **Proxy** in Next 16. Not needed here.

Verified in the browser: all 9 sampled routes 200 with correct lang/dir/nav/h1;
translated content present in all six; switching from `/` lands on `/de`;
switching on `/legal/terms` lands on `/fr/legal/terms` (**keeps the page**);
switching back to English drops the prefix; a fresh browser context starts on
English with **0 localStorage keys**.

### Flagged to the user

- Poppins loads the `latin` subset only, so Arabic falls back to a system font.
  A dedicated Arabic face would render it better.
- Picker shows English language names ("German"), per the Figma design.
  Endonyms ("Deutsch") are usually better in a switcher.
- Marketing copy was translated by me and reads naturally, but a native
  speaker should review before launch.

---

## 2026-09-06 12:35 WAT

**Done: the language picker works (Figma `18740:1539` / `18740:2024`).**

The user asked for six locales only: English (US), French, German, Spanish,
Italian, Arabic. **Two decisions were put to them and both were answered:**
1. Scope — the picker remembers the choice and sets `lang`/`dir`; **copy stays
   English** until translated copy exists. NOT a full i18n build.
2. Structure — **a single list of six locales**, not the design's two-column
   Country + Language picker.

New files: `src/lib/locales.ts`, `src/components/locale-provider.tsx`,
`src/components/ui/language-dialog.tsx`. `language-selector.tsx` rewritten as a
client component that opens the dialog. `layout.tsx` wraps children in
`LocaleProvider`.

### Things worth remembering

- **State uses `useSyncExternalStore`, not `useState` + `useEffect`.** The
  project's eslint runs the React Compiler rules and **rejects calling setState
  synchronously inside an effect** (`react-hooks/set-state-in-effect`). The
  external-store hook is the right primitive for reading localStorage after
  hydration, and it gives cross-tab sync via the `storage` event for free.
  Server snapshot returns the default so hydration matches.
- The dialog is a **native `<dialog>`** with `showModal()` — focus trap, Esc and
  inert background come free. Backdrop styled with Tailwind's `backdrop:`
  variant. Selection is provisional; **Continue** commits, Esc/backdrop cancels.
- `CtaButton` was split: `CtaButton` (renders a Link) and **`CtaAction`**
  (renders a real `<button>`) sharing one visual shell. Use `CtaAction` for
  in-page actions rather than a Link with `preventDefault`.
- **`SiteHeader` renders TWO `LanguageSelector`s** (desktop + mobile), so there
  are two `<dialog>` elements on the page. Only the visible one is reachable,
  since the other's ancestor is `display:none`. Scope any test selector with
  `:visible` / `dialog[open]` or it hits a strict-mode violation.

### Assets

The Figma flag component is an **external library** — `search_design_system`
finds nothing and the file lists only one page, so its variants cannot be
enumerated. It only exposes US, AD, AE, AF, AU. FR/DE/ES/IT/SA were taken from
**flag-icons (MIT, Copyright (c) 2013 Panayiotis Lipiridis)** via unpkg;
attribution is in README. Spain uses the three-band **civil flag** because the
arms version is 91KB (16.5KB gzipped) and invisible at 24x18. The search icon
came from Figma. General internet access works from this machine (unpkg and the
npm registry both returned 200).

Verified in the browser end to end: dialog 512x584 desktop / 343x620 mobile,
24px radius, 36px vs 32px title, all six rows with correct grouping and pressed
state, focus trapped inside, search filters and shows an empty state, picking
Arabic + Continue sets `lang="ar-SA"`, `dir="rtl"`, nav "SA | AR" and persists;
survives reload AND a route change to /legal/terms; **Esc after picking German
correctly leaves Arabic in place**.

### Flagged to the user

- **RTL with English copy reads oddly** (trailing punctuation jumps, e.g.
  ".ecosystem"). That is correct RTL behaviour for LTR text and resolves when
  Arabic copy lands. Offered to gate `dir` until then.
- Flags for languages is a known anti-pattern (a flag is a country, not a
  language — Arabic is not Saudi-only, Spanish is not Spain-only). Implemented
  as designed since Figma uses flags and the nav reads "US | EN".

---

## 2026-09-06 11:40 WAT

**Done: the Terms of Service and Privacy Policy pages — `18728:10408` /
`18728:10519` and `18728:10623` / `18728:10735`.**

These four Figma nodes are two *pages* at two breakpoints, not four screens.
Each is header + legal body + Get Started + footer, so **the only new thing was
the body**; `SiteHeader`, `GetStarted` and `SiteFooter` are reused whole.

Added `src/components/legal-document.tsx` (layout + a `MailLink` helper) and
`src/app/legal/terms/page.tsx` / `src/app/legal/privacy/page.tsx`, which hold
their own copy. Both prerender static. Each has its own `metadata` export.

New tokens: `type-display-lg` (52/56, -1.04) and `type-display-sm` (44/48,
-0.88), plus a `list-parenthesised` utility that numbers list items "(1)",
"(2)"… via a CSS counter and `::before` (NOT `::marker` — Safari only supports
`::marker { content }` from 17).

### Header and footer links had to become root-relative

`SiteHeader` and `SiteFooter` used bare `#about`, `#features` etc. Those resolve
against the current route, so on `/legal/terms` they would have dead-linked.
They are now `/#about`, `/#features`, `/#how-it-works`, `/#get-the-app` and
`/#audiences`. **Verified both directions:** clicking `/#audiences` from
`/legal/terms` lands on `/` with the section at top 93 (the sticky-header
offset), and all four header anchors still scroll correctly on `/` itself.
**Any future sub-route needs this.**

Verified: `tsc --noEmit`, `eslint`, `next build` pass; measured both pages at
1440 and 375 (100/32 vs 50/16 padding, 48 vs 24px gaps, centred title on desktop
and left-aligned on mobile, h1 52/56 and 44/48, h2 32/40 and 28/36, body 18/28
and 16/24, 7 sections each, hanging-indent lists, "(n)" markers, mailto links in
primary-500). Also confirmed the sticky header does not overlap the h1 at rest
(100px clear on desktop, 50px on mobile).

### Design discrepancies

1. **The Privacy Policy's mobile frame repeats the Terms of Service intro
   verbatim** instead of its own. Fourth copy-paste artifact of this kind in the
   file (see also About/Audiences/Why Cogrea). The desktop frame's
   Privacy-specific intro is used at both widths.
2. Figma's desktop frames merge some bullets with the paragraph that follows
   into a single text run — a fixed-width text-wrap artifact. Split at the "•"
   markers; the mobile frames segment them correctly and were used to check.
3. The Figma copy is full of doubled spaces from line wrapping ("you have
   read,  understood"). Normalised to single spaces.
4. The Privacy intro was missing its closing full stop. Added.

### Deviations from Figma

- Lists are real `<ul>`/`<ol>` with hanging indents. Figma draws them flat,
  with literal "•" / "(1)" characters inside one text node, so wrapped lines run
  back to the left margin. The numbering style is preserved.
- The desktop body is a 1216px measure at 18px — about 150 characters per line,
  well past comfortable reading. Implemented as designed; worth raising.
- The mobile frames include an iOS status bar and home indicator. Those are
  Figma device chrome, not page content, and were not implemented.

---

## 2026-09-06 10:45 WAT

**Done: the site footer (`18728:23364` / `18728:23760`). The landing page is
now complete — every section from the Figma landing frames is built.**

Added `src/components/site-footer.tsx`, rendered after `</main>` in
`page.tsx` (it is a `<footer>`, so it sits outside `<main>`). Brand block with
logo, tagline and store badges; two link columns; a full-width oversized
wordmark below a `neutral-300` divider.

**Zero new assets.** Verified by md5 / path-coordinate comparison:
- the 100x28 logo is byte-identical to `cogrea-logo.svg`
- the App Store badge is byte-identical to `badge-app-store.svg`
- the Google Play badge differs **only in Figma's internal filter/gradient id
  suffixes** (`_0_101` vs `_0_79`) — same artwork, so the existing file is used
- the oversized wordmark is the same artwork as `hero-wordmark.svg`: its
  viewBoxes differ (1216x340 desktop, 343x96.04 mobile, 564x158 existing) but
  every path coordinate normalises to the same fraction of the viewBox
  (0.89059, 0.83184). **This is now the fourth reuse of that file.**

**Extracted `src/components/ui/store-badges.tsx`.** The badge block was
identical in Get Started and the footer; the only difference is label alignment,
so the component takes `className` and `labelClassName`. Get Started passes its
absolute positioning through `className`. Regression-checked afterwards: still
273x80, absolute, top 28px, centred with 0px delta.

New tokens: `--color-neutral-300 #d1d5db` and `type-p-lg` (18/28 regular —
the project already had `type-p-lg-medium`).

Verified: `tsc --noEmit`, `eslint`, `next build` pass; measured at 1440 and 375
(100/32 vs 50/16 padding, 24px wrap gap, top row row+space-between vs
column+48px, 1px #D1D5DB border with 48px pb, 592px brand block, 20px/16px
inner gaps, 273x80 badges, 14px column gap with 4px row gap, 20/28 headings,
16/24 w500 links with 8px padding, wordmark aspect 3.5715 against a 3.5714
target). All footer anchors resolve.

### Deviation from Figma

- Figma indents the "Menu" and "Legal" headings with **two literal leading
  spaces** to line them up with the links' 8px padding. Implemented as `px-2`
  instead, which aligns exactly — asserted in the browser (heading left ==
  link left at both breakpoints). Do not copy the whitespace hack.
- Figma marks the Legal column `items-center` while Menu is `items-start`, but
  both render left-aligned because the link rows are `w-full` with
  shrink-to-fit text. Implemented as two plain left-aligned lists.
- Desktop uses a literal `gap: 338px` between the brand block and the link
  columns; implemented as `justify-between`, which is equivalent at 1216 and
  does not break at other widths.

---

## 2026-09-06 10:05 WAT

**Done: the Get Started / download section (`18728:23336` / `18728:23732`).**

Added `src/components/get-started.tsx`, wired in after `<Features />`. Centred
pill and heading over two halves: a laptop render card plus a card with the
two audience CTAs, beside a phone panel carrying the store badges.
`id="get-the-app"` — **the last dead nav link now resolves.**

A local `Panel` helper wraps the three white hairline-bordered cards
(`border-neutral-100`, `rounded-2xl`, `shadow-ds-md`) since all three share it.

**Asset reuse.** Verified by md5: the phone render is byte-identical to
`about-scene.png` — **the third section to reuse it** (About, How It Works,
Get Started). Desktop and mobile exports were identical for every asset here.
New: `get-started-app.png` (laptop render), `badge-google-play.svg` (135x40),
`badge-app-store.svg` (120x40). No new type tokens — everything already existed.

Verified: `tsc --noEmit`, `eslint`, `next build` pass; measured at 1440 and 375
(48/24px wrap gap, 800px centred header on desktop, h2 36/44 and 32/40, panels
p-16 r16 with a 1px #F3F4F6 border, laptop card inner 557x376 matching the
2746/1856 aspect, CTA row 16px gap going row->column, phone panel 593x580 and
343x580, overlay centred at both widths, 481x944 render, 6px badge gap).

### Bug caught by measuring — `SectionPill` alignment (now fixed properly)

The 08:30 entry recorded that `SectionPill` hardcoded `self-start` and that the
workaround was `desk:self-center`. That workaround only worked **because
variants sort after plain utilities**. Passing a plain `self-center` here did
nothing and the pill rendered 326px left of centre.

**`SectionPill` no longer sets any `align-self`.** Callers state their own:
- `self-start` — About, Audiences, Why Cogrea (parents are `items-stretch`)
- `self-start desk:self-center` — How It Works, Features
- nothing — Get Started, whose header is `items-center` at every width

Asserted every pill in the browser afterwards, not just the new one. General
lesson: **`cn()` cannot merge Tailwind classes**, so a shared component must not
bake in a property a caller may need to override — expose it or omit it.

### Deviation from Figma

- Figma gives the two store badges equal-width flex slots, which stretches the
  App Store badge from its natural 120px to 134px. Implemented with
  `object-contain` so the trademarked artwork is not distorted. The slots are
  still equal width.
- Badge links point at placeholder routes (`/download/google-play`,
  `/download/app-store`) — the apps are not published.

---

## 2026-09-06 09:15 WAT

**Done: two sections — Why Choose Cogrea (`18728:23234` / `18728:23630`) and
Features (`18728:23278` / `18728:23674`).**

Added `src/components/why-cogrea.tsx` and `src/components/features.tsx`, wired
into `page.tsx` after `<HowItWorks />`. Section order follows Figma node order:
Hero, About, Audiences, How It Works, Why Cogrea, Features.

**`#features` belonged to the Features section, not Audiences.** The Features
pill literally reads "Features". Audiences is now `id="audiences"` (no nav
link). `#about`, `#features` and `#how-it-works` all resolve; only
`#get-the-app` is still dead. Asserted in the browser, not just by eye.

**Extracted `src/components/ui/feature-card.tsx`.** About's local `FeatureCard`
was byte-for-byte what both new sections needed, so it moved to `ui/` and
`about.tsx` now imports it. The only variation is title size, exposed as an
optional `titleClassName`. If a fourth section wants this card, reuse it.

New token: `type-h6-desktop` (20/28, -0.4). Despite the Figma style name,
Features applies it at **both** breakpoints.

**Asset reuse — only one new file.** Verified by md5:
- Features' wordmark is the same artwork as `hero-wordmark.svg`, uniformly
  scaled (564x158 -> 428x120, factor 1.3172). Reused, as How It Works does.
- **The 24px "Cogea 3" export is NOT usable** — Figma emits it as separate
  layers and the single-node export is just the bare blue gradient circle with
  no compass glyph. `icons/cogea-mark.svg` (assembled in the first session) is
  the complete mark. Always reuse it rather than re-exporting.
- New: `features-app.png` (2770x1928, 1.37MB) — the web-app render. In line
  with the other PNGs; `next/image` resizes it on serve.

Verified: `tsc --noEmit`, `eslint`, `next build` pass; rendered at 1440 and 375
and measured with `getComputedStyle` (Why Cogrea: 32px row gap, 592px columns,
16px between card rows and 32px within, 280x136 and 343x136 cards, CTA padding
12/32; Features: 48px vs 24px wrap gap, header centred at 800 on desktop with
pill centre == h2 centre, three 384px columns ordered 1/2/3 around a 384x440
render, 343x391 on mobile, wordmark 428x120, app render 816x568).

**`CtaButton` needed no new props** — its default `contentClassName` of
`px-8 py-3` is already this CTA's px-32/py-12. It does need `className="self-start"`
in a `flex-col`, or it stretches full width.

### Design discrepancies

1. **Why Cogrea's mobile frame repeats the About feature cards verbatim**
   (AI-Powered Personalization / Verified Talent Pool / Goal Tracking / Global &
   Inclusive) instead of its own. Same class of copy-paste artifact as the
   Audiences mobile business list. The desktop set is used at both widths:
   Actionable framework / Better & Innovative Approach / Lifelong Career
   Support / Growth & Success. **Flagged, not implemented as designed.**
2. Features card 1 ("24/7 Career Coaching") has an 18px title where the other
   five are 20px. **Both frames agree**, so implemented as designed — but it
   looks unintentional.
3. Why Cogrea's caption is 12px on mobile and 14px on desktop. A real
   responsive difference, implemented as designed.

---

## 2026-09-06 08:30 WAT

**Done: the How It Works section (desktop `18728:23186`, mobile `18728:23581`).**

Added `src/components/how-it-works.tsx` and wired it into `src/app/page.tsx`
after `<Audiences />`. Pill + centred heading (left-aligned on mobile) over a
white card holding four step items beside a preview panel.

**It is a client component** — the steps are buttons and clicking one swaps the
preview title/description. Figma only draws step 1 active; a highlighted step
that did nothing would be a dead control. Steps use `aria-current="step"`;
native buttons cover keyboard use without ARIA tab plumbing.

New tokens: `type-h2-desktop` (36/44, -0.72) and `type-p-lg-medium` (18/28).

**Asset reuse — nothing new but icons.** Verified by md5:
- the preview phone render is byte-identical to `about-scene.png`
- the preview wordmark is byte-identical to `hero-wordmark.svg`

New icons: `paint-board.svg`, `profile-2user.svg`, `chart-rose-dark.svg`. The
last is the **same geometry** as the existing `chart-rose.svg`, differing only
in stroke colour (`#111827` here vs `#F5F8FF` on About's gradient tile). Icons
render through `next/image`, so a recolour cannot use `currentColor` and needs
its own file. Two icon geometries recur, already established in `about.tsx`:
`paint-board`/`chart-rose` are a 21.5px glyph inset 1.25px in a 24px box;
`profile-2user` fills the 24px box.

Verified: `tsc --noEmit`, `eslint`, `next build` pass; rendered at 1440 and 375
and measured with `getComputedStyle` (48px outer gap, header centred at 800 on
desktop / left-aligned on mobile, card p-24 vs py-16/px-0, 488px step column,
40x40 r4 tiles, 18/28 step titles, 36/44 and 28/36 preview headings, hero panel
600x427 and 311x351, wordmark 564x158 and 272x76, phone 454x891 and 258x505).
Also asserted the click behaviour: step 3 swaps the preview to "Follow
Personalized Pathways".

### Design discrepancies (flagged to the user, NOT implemented as designed)

1. **The step order differs between breakpoints.** Desktop runs Sign Up / Meet
   Your Assistant / Join the Community / Follow Personalized Pathways; mobile
   swaps the last two. The mobile order is used at both widths — it reads as
   the more logical progression.
2. **The preview panel differs.** Desktop shows only the step *description* as
   a 36px heading with no title; mobile shows the title as a 28px heading with
   the description below. The mobile treatment is used at both widths, sized
   responsively.
3. Not a conflict but worth raising: the icon mapping looks wrong in Figma.
   "Join the Community" gets `chart-rose` (a pie-chart glyph) while
   "Follow Personalized Pathways" and "Meet Your Assistant" **share**
   `profile-2user` (two people). Community would suit the people glyph better.
   Implemented as designed.

### Gotcha hit

- **`SectionPill` hardcodes `self-start`**, which beats a parent's
  `items-center` — the desktop How It Works pill sat at the left edge of the
  800px header box instead of centred. `cn()` is a plain joiner with no
  tailwind-merge, so the fix is to pass a variant that wins in the cascade:
  `<SectionPill className="desk:self-center">`. Any future centred header needs
  the same. Left-aligned callers (About, Audiences) rely on the `self-start`
  default because their parents are `items-stretch`.

### Notes

- The nav's `#how-it-works` link now resolves. `#about` and `#features` also
  resolve; only `#get-the-app` is still dead.
- Figma copy had stray leading spaces (" Simple. Personal. Effective.",
  " Learn, share, and grow...") — stripped.

---

## 2026-09-06 08:05 WAT

**Done: the Audiences section (desktop `18728:23092`, mobile `18728:23487`).**

Added `src/components/audiences.tsx` — two mirrored blocks ("For Individuals",
"for Businesses"), each a pill + H3 + intro + a 3x2 benefit-card grid beside a
photo. Desktop puts the photo right of the copy for block 1 and left for
block 2 (`desk:flex-row-reverse`); mobile stacks copy then photo. Wired into
`src/app/page.tsx` after `<About />`.

`SectionPill` gained an optional `icon` prop (defaults to the Cogrea mark) —
this section needs `profile` and `briefcase` glyphs instead.

New token: `bg-gradient-accent` (Figma Gradient 1, the warm purple->yellow tile
on the Individuals icons). The Businesses tile reuses the existing
`bg-gradient-brand` — Gradient 2 is byte-for-byte the same gradient already
added for Mission/Vision, so don't add a second copy.

New assets: `individuals-scene.jpg`, `businesses-scene.jpg`,
`icons/profile.svg`, `icons/briefcase.svg`, `icons/medal-star.svg`.
**Both photos are byte-identical between the desktop and mobile frames**
(verified by md5), so there is one file each and `object-cover` handles the
different crops. The icon exports were clean this time — no ancestor chrome —
only empty `opacity="0"` placeholder groups, which were stripped.

Anchor: the section is `id="features"` because it sits directly after About and
the nav's second link is `#features`. **This is a guess** — if a later section
turns out to be the real Features block, rename this one.

Verified: `tsc --noEmit`, `eslint`, `next build` all pass; rendered at 1440 and
375 and measured with `getComputedStyle` against the Figma spec (section
padding, 17px row / 16px column gaps, 288x80 and 343x80 cards, 40x40 tiles,
24x24 icons, 592x463 and 343x250 media, H3 32/40 and 28/36).

### Design discrepancies (flagged to the user, NOT implemented as designed)

Unlike the About section, these were unified rather than shipped per-breakpoint:

1. **The mobile "for Businesses" block repeats the Individuals benefit list
   verbatim** — a copy-paste artifact in Figma. The desktop business list
   (Hire verified talent / Track and grow your workforce / Retain top
   performers / HR + business support / All-in-one platform / Operations
   guidance) is used at both widths.
2. Two Individuals benefits differ by breakpoint. Mobile wording was used:
   - "24/7 Expert Assistant & career coach" (desk) -> "24/7 AI + human career coach"
   - "Only pay for Courses you need" (desk) -> "Only pay for what you need"
3. Not a breakpoint conflict, but flagged: the "for Businesses" intro paragraph
   is individual-focused in BOTH frames. Implemented as designed.

### Deviations from Figma

- Desktop block 1 is 595 + 32 + 589 in Figma and block 2 is 592 + 32 + 592.
  Both are implemented as a symmetric 592/592 split, so block 1's cards are
  288px rather than 289.5px. The 3px asymmetry looks unintentional.

### Gotchas hit

- `next/image`'s `priority` prop is **deprecated in Next 16** in favour of
  `preload` (`node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md`).
  Switched the two existing uses in `hero.tsx` and `site-header.tsx`.
- No Playwright browsers are cached, but Chrome is installed. Use
  `playwright-core` (no browser download) with `chromium.launch({ channel: "chrome" })`
  from the scratchpad.
- `page.goto(..., { waitUntil: "networkidle" })` never settles against
  `next start` — use `"domcontentloaded"`. And do NOT await an
  `img.onload` promise for lazy images that are still off-screen; it hangs
  forever. Scroll the section through the viewport, then wait a fixed beat.

---

## 2026-09-06 07:46 WAT

**Resolved: the About feature-card titles now match at both breakpoints.**

The user chose the mobile set as canonical, so cards 1 and 4 read
"AI-Powered Personalization" and "Global & Inclusive" at every width. The
desktop-only alternatives ("Predictive skill gap analyzer" / "Career Pathway
Engine") are gone — they did not describe the copy underneath them, and the
mobile names share the benefit-led voice of the two cards that were already
identical across breakpoints.

This deletes the `desktopTitle` field from `Feature` and the responsive-span
branch in `FeatureCard`; `about.tsx` now diverges by breakpoint only in the
Mission/Vision body copy. **The landing page no longer matches Figma here** —
the desktop frame `18728:23029` still shows the old titles, so re-syncing that
section from Figma will reintroduce them.

Verified: `tsc --noEmit` and `eslint` pass.

### Gotcha hit

- **There is no `python` on this machine** (the Windows Store alias shim
  intercepts it and exits). Use `node - <<'JS'` for scripted file edits; it
  sidesteps the heredoc-apostrophe problem noted below without needing the
  Write tool.

---

## 2026-09-05 23:20 WAT

**Done: About section (desktop `18728:23029`, mobile `18728:23424`).**

Added `src/components/about.tsx` (with local `FeatureCard` / `PillarCard`) and
`src/components/ui/section-pill.tsx`; wired into `src/app/page.tsx`.

New tokens in `globals.css`: `primary-300 #6275B9`, `primary-150 #CBDAFF`,
`neutral-900 #111827`, `neutral-50 #F9FAFB`, the `bg-gradient-brand` utility
(Figma Gradient 2), and type styles `type-h3-desktop/mobile`,
`type-h5-desktop/mobile`, `type-p-xs`.

New assets: `about-scene.png`, `icons/cogea-mark.svg`, `icons/chart-rose.svg`,
`icons/microscope.svg`. **Reused `hero-wordmark.svg`** for the purple card's
background wordmark — verified it is the same artwork scaled 2.2021x, so don't
add a second copy.

Also added `scroll-mt-[90px]` / `desk:scroll-mt-[93px]` to the section so the
nav's `#about` anchor clears the sticky header. **Every future section with an
`id` needs this too.**

### Gotchas hit

- `download_assets` on an icon node exported the whole page behind it (a
  `#262628` rect + the `Landing`/`Desktop` ancestor frames clipped to a 24x24
  viewBox). Fix: extract the `<g id="...">` subtree plus `<defs>` and drop the
  unreferenced clipPath. Check any icon export for baked-in ancestor chrome
  before committing it.
- A bash heredoc broke on an apostrophe in the copy ("today's"). Use the Write
  tool for files containing prose, not `cat <<'EOF'`.

### Design discrepancies (flagged to user, implemented as designed)

- Feature cards 1 and 4 have different titles per breakpoint: desktop says
  "Predictive skill gap analyzer" / "Career Pathway Engine", mobile says
  "AI-Powered Personalization" / "Global & Inclusive" — while sharing the same
  descriptions. The desktop titles do not match their descriptions.
- Mission and Vision body copy also differs per breakpoint.
- Handled with responsive spans, same approach as the hero copy.

---

## 2026-09-05 22:37 WAT

**Done: landing page nav + hero (desktop & mobile), plus 3 follow-up fixes.**

Scaffolded the project from empty: Next.js 16.3.4 (App Router) · React 19 ·
TypeScript · Tailwind v4. Implemented from Figma file `P36EvMfoHaBqid0zogZ2ZN`:

| Section | Desktop node | Mobile node |
| --- | --- | --- |
| Nav | `18728:22992` | `18728:23398` |
| Hero | `18728:23017` | `18728:23412` |

Files created:

```
src/app/globals.css              tokens + Figma text styles
src/app/layout.tsx               Poppins via next/font/google
src/app/page.tsx                 SiteHeader + Hero
src/components/site-header.tsx
src/components/hero.tsx
src/components/ui/cta-button.tsx
src/components/ui/language-selector.tsx
src/lib/cn.ts
public/assets/                   Figma exports (logo, wordmark, phone render, icons)
```

Follow-up fixes applied after review:
1. Desktop hero CTAs were centred in the 591px column — removed `justify-center`,
   added `desk:justify-start`. Now flush left with the copy at x=112. Mobile
   (full-width stacked) deliberately left as-is.
2. Header is `sticky top-0 z-50` at every breakpoint so all content scrolls
   underneath it (mobile first, desktop added the same session). The open menu is
   `absolute inset-x-0 top-full` so it overlays content instead of pushing it.
3. Added `public/assets/icons/close.svg` — authored to match `menu.svg` exactly
   (24×24, `#F5F8FF` stroke, 1.5 width, round caps) because the Figma library
   has no close icon. Hamburger swaps to X while open.

Verified: `next build`, `tsc --noEmit`, `eslint` all pass; rendered at 1440px and
375px and compared against the Figma frames.

### Gotchas hit (don't repeat these)

- **Tailwind v4:** custom classes in `@layer components` CANNOT take responsive
  variants. `desk:type-h1-desktop` silently produced nothing and the desktop
  headline rendered at the mobile 32px. All type styles use `@utility` now —
  keep it that way when adding new ones.
- Verify with `getComputedStyle`, not just screenshots — the size bug was
  invisible until measured.
- If a stale `next start` holds the port, a new server fails with EADDRINUSE
  while the old one serves a mismatched asset manifest (page renders unstyled).
  Kill the PID from `netstat -ano | grep :3000` before restarting.
- `next/font/google` fetches Poppins at build/dev time and this network is slow
  (~5s to fonts.gstatic.com); it has 500'd a cold start once.

### Open / offered, not done

- Self-host Poppins via `next/font/local` to kill the Google Fonts dependency.
- Scroll lock + dimmed backdrop when the mobile menu is open.
- Language selector is a static button — needs real i18n wiring.
- All CTA/nav hrefs are placeholder routes.

### Next up

Superseded — see "Where things stand" at the top of this file.

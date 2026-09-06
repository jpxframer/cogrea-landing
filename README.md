# Cogrea — Landing Page

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, built from the Cogrea
Figma file (`P36EvMfoHaBqid0zogZ2ZN`).

## Implemented so far

| Section | Desktop node | Mobile node |
| --- | --- | --- |
| Nav       | `18728:22992` | `18728:23398` |
| Hero      | `18728:23017` | `18728:23412` |
| About     | `18728:23029` | `18728:23424` |
| Audiences | `18728:23092` | `18728:23487` |
| How It Works | `18728:23186` | `18728:23581` |
| Why Choose Cogrea | `18728:23234` | `18728:23630` |
| Features | `18728:23278` | `18728:23674` |
| Get Started | `18728:23336` | `18728:23732` |
| Footer | `18728:23364` | `18728:23760` |

**The landing page is complete.**

## Other routes

| Route | Desktop node | Mobile node |
| --- | --- | --- |
| `/legal/terms` | `18728:10408` | `18728:10519` |
| `/legal/privacy` | `18728:10623` | `18728:10735` |

Both wrap `SiteHeader`, `LegalDocument`, `GetStarted` and `SiteFooter`. Their
copy lives in the page files; `legal-document.tsx` only handles layout.

## Languages

Six locales: English (US), French, German, Spanish, Italian, Arabic. **The
locale lives in the URL** — every route is prerendered per language.

```
/            /fr            /de            /es      /it      /ar
/legal/terms /fr/legal/terms  …
```

English is served **unprefixed**, so the URLs that were already live keep
working; a rewrite in `next.config.ts` maps `/` to `/en` internally.

- Locales: [`src/i18n/config.ts`](src/i18n/config.ts). Copy:
  [`src/i18n/messages/`](src/i18n/messages) — one file per language.
- **`en.ts` is the source of truth for the shape.** Every other locale is typed
  `: Dictionary`, so a missing key fails the build.
- Server components read the dictionary via `getDictionary(lang)` and pass
  slices down as props; there is no client-side i18n context.
- `<html lang>` and `<html dir>` are set server-side per route, so **Arabic
  renders RTL from the first paint** — no flash, and it is indexable.
- `hreflang` alternates and a canonical are emitted for every page.
- The picker (Figma `18740:1539` / `18740:2024`) is a native `<dialog>`, which
  supplies the focus trap, Esc handling and inert background. Choosing a
  language **navigates** to the same page in that locale. Nothing is stored, so
  a returning visitor starts on English again — deliberate.

### What is not translated

The Terms of Service and Privacy Policy **bodies stay in English** in every
locale; only the surrounding chrome is translated. Translated legal text needs
professional review, so browser translation is left to handle it. The pages are
still reachable at `/fr/legal/terms` and so on.

## Third-party assets

The French, German, Spanish, Italian and Saudi flags come from
[flag-icons](https://github.com/lipis/flag-icons) (MIT) — Copyright (c) 2013
Panayiotis Lipiridis. The Figma flag component only exposes US, AD, AE, AF and
AU, so the rest were sourced rather than redrawn. Spain uses the three-band
civil flag: the arms version is 91KB and invisible at 24x18.

### Anchors

**Section links are root-relative** (`/#about`, not `#about`) because the header
and footer also render on `/legal/*`. A bare `#about` would resolve against the
sub-route and dead-link.

The footer links to `#how-it-works`, `#audiences` ("Who We Help") and
`#features`; its Legal links are placeholder routes.

All four nav anchors resolve: `#about`, `#features`, `#how-it-works` and
`#get-the-app`. Audiences is `#audiences` — it has no nav link. Every section with an `id` needs `scroll-mt-[90px] desk:scroll-mt-[93px]`
so the anchor clears the sticky header.

## Design system

Tokens live in [`src/app/globals.css`](src/app/globals.css) under Tailwind v4's
`@theme` block, named after the Figma styles:

- **Colors** — `primary-500 #1B2353`, `primary-100 #F5F8FF`,
  `secondary-500 #FF6A2B`, `neutral-50/100/200/300/500/700/900`,
  `grey-200 #EAECF0`
- **Effects** — `shadow-ds-sm` (Drop shadow/Small), `shadow-ds-md` (Drop shadow/Medium)
- **Gradients** — `bg-gradient-accent` (Gradient 1, the warm tile on the
  "For Individuals" benefit icons), `bg-gradient-brand` (Gradient 2, the blue
  tile on Mission/Vision and the "for Businesses" benefit icons)
- **Type styles** — `.type-h1-desktop`, `.type-h2-desktop`, `.type-h2-mobile`,
  `.type-h3-desktop`, `.type-h3-mobile`, `.type-h5-desktop`, `.type-h5-mobile`,
  `.type-display-lg`, `.type-display-sm`, `.type-h6-desktop`, `.type-p-lg`,
  `.type-p-lg-medium`, `.type-p-md`, `.type-p-md-medium`, `.type-p-sm`,
  `.type-p-sm-medium`, `.type-p-xs`, `.type-body-bold`

### Breakpoint

The Figma frames are 1440 (desktop) and 375 (mobile). The desktop layout takes
over at a custom `desk` breakpoint of **1200px** (`--breakpoint-desk`), which is
the narrowest width where the 591 + 33 + 592 hero row still reads correctly.
Below that, the mobile design is used and centred at `max-w-[420px]`.

Desktop horizontal padding is expressed as `desk:px-8` plus a `max-w-[1216px]`
centred content box, so at the 1440 design width the gutters land on the
designed 112px.

### Fonts

- **Poppins** via `next/font/google` (400 / 500 / 600).
- **SF Pro Text** is used for button labels in Figma. It is not a webfont, so
  `--font-body` falls back to the platform UI stack — real SF Pro Text on Apple
  devices, Segoe UI / Roboto elsewhere. Swap in a licensed webfont if exact
  parity matters.

## Assets

Exported from Figma and committed under `public/assets/`. The logo, flag,
chevron and phone render are byte-identical across both breakpoints; only the
hero wordmark was exported at two sizes (same artwork, uniform scale), so a
single `hero-wordmark.svg` is scaled per breakpoint.

`individuals-scene.jpg` and `businesses-scene.jpg` are likewise one file each —
the desktop and mobile frames share the same source photo and only differ in
crop, which `object-cover` handles.

How It Works adds no new imagery: its phone render is byte-identical to
`about-scene.png` and its wordmark to `hero-wordmark.svg`. It does add
`icons/chart-rose-dark.svg` — the same glyph as `icons/chart-rose.svg` but
stroked `#111827` instead of `#F5F8FF`. Icons render through `next/image`, so a
recolour needs its own file rather than `currentColor`.

## Shared components

`ui/section-pill.tsx` sets **no** `align-self`. It used to hardcode
`self-start`, which silently beat anything a caller passed — [`cn()`](src/lib/cn.ts)
is a plain joiner with no tailwind-merge, so equal-specificity utilities are
resolved by stylesheet order, not argument order. Every caller now states its
own alignment (`self-start`, `self-start desk:self-center`, or nothing when the
parent already centres).

`ui/store-badges.tsx` is "Download The Mobile App" above the two store badges,
shared by the Get Started section and the footer — they differ only in label
alignment.

`ui/feature-card.tsx` is the pale card with a Cogrea-mark tile above a title and
description. About, Why Choose Cogrea and Features all use it — the three Figma
frames draw it identically, differing only in title size, which is the optional
`titleClassName` prop.

## Not in the designs

- The mobile hamburger has no open state in Figma. A minimal expanding panel
  with the nav links and both CTAs is included so the button works.
- **Audiences copy is unified across breakpoints.** The Figma frames disagree:
  the mobile "for Businesses" block repeats the Individuals benefit list
  verbatim, so the desktop business list is used at both widths. Two individual
  benefits also differ by breakpoint; the mobile wording is used. See
  [memory.md](memory.md) for the full list.
- The "for Businesses" intro paragraph is individual-focused in both Figma
  frames ("Whether you're just starting out, switching paths...") and is
  implemented as designed.
- **The How It Works stepper is interactive.** Figma only shows step 1 active;
  clicking any step swaps the preview panel. Without this the highlighted step
  would be a dead control.
- How It Works step order differs per breakpoint in Figma; the mobile order is
  used. Its preview panel also differs — desktop shows only the step
  description as a 36px heading, mobile shows title + description. The mobile
  treatment is used at both widths. See [memory.md](memory.md).
- **Why Choose Cogrea's mobile frame repeats the About feature cards verbatim**
  rather than its own. The desktop set (Actionable framework / Better &
  Innovative Approach / Lifelong Career Support / Growth & Success) is used at
  both widths.
- Features card 1 has an 18px title where the other five are 20px. Both Figma
  frames agree, so it is implemented as designed.
- The store badges are laid out as two equal-width slots, which would stretch
  the App Store badge from its natural 120px to 134px. They use
  `object-contain` instead so the trademarked artwork keeps its aspect ratio.
- Store badge links point at placeholder routes; the apps are not published.
- The Figma language modal has **two** columns, Country and Language. It is
  built as a single list of six locales instead, which is what was asked for.
  The mobile frame omits the Language column altogether.
- The legal pages' bullet and numbered lists are real `<ul>`/`<ol>` elements
  with hanging indents. Figma draws them flat, as literal "•" and "(1)"
  characters inside one text node. The "(n)" numbering is preserved with a
  counter so the markers still read as designed.
- **The Privacy Policy's mobile frame repeats the Terms of Service intro.** The
  desktop frame's Privacy-specific intro is used at both widths.
- The desktop legal body is a 1216px measure at 18px, which is a very long line
  (~150 characters). Implemented as designed, but worth revisiting.
- Poppins is loaded with the `latin` subset only, so Arabic falls back to a
  system font. A dedicated Arabic face would render it better.
- Language names in the picker are shown in English ("German", not "Deutsch").
  Endonyms are usually better in a language switcher; the Figma design uses
  English names.
- All CTA/nav destinations are placeholder routes.

## Next.js 16 notes

- `next/image`'s `priority` prop is deprecated in favour of `preload`. The
  header and hero use `preload`.

## Scripts

```bash
npm run dev
npm run build
npm run lint
```

# Cogrea — Landing Page

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, built from the Cogrea
Figma file (`P36EvMfoHaBqid0zogZ2ZN`).

## Implemented so far

| Section | Desktop node | Mobile node |
| --- | --- | --- |
| Nav   | `18728:22992` | `18728:23398` |
| Hero  | `18728:23017` | `18728:23412` |

Remaining landing-page sections and the other five screens are not built yet.

## Design system

Tokens live in [`src/app/globals.css`](src/app/globals.css) under Tailwind v4's
`@theme` block, named after the Figma styles:

- **Colors** — `primary-500 #1B2353`, `primary-100 #F5F8FF`,
  `secondary-500 #FF6A2B`, `neutral-100/200/500/700`, `grey-200 #EAECF0`
- **Effects** — `shadow-ds-sm` (Drop shadow/Small), `shadow-ds-md` (Drop shadow/Medium)
- **Type styles** — `.type-h1-desktop`, `.type-h2-mobile`, `.type-p-md`,
  `.type-p-md-medium`, `.type-p-sm`, `.type-p-sm-medium`, `.type-body-bold`

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

## Not in the designs

- The mobile hamburger has no open state in Figma. A minimal expanding panel
  with the nav links and both CTAs is included so the button works.
- The language selector renders as a button with no dropdown — it needs real
  i18n wiring.
- All CTA/nav destinations are placeholder routes.

## Scripts

```bash
npm run dev
npm run build
npm run lint
```

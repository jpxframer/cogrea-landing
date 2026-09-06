# Cogrea — Session Log

Running log of what was done, newest first. Read this first when picking the
project back up. Project conventions live in [README.md](README.md).

---

## Where things stand — 2026-09-06 08:05 WAT

**Repo:** https://github.com/jpxframer/cogrea-landing (public, branch `main`).
Pushed and in sync through "Add the Audiences section"; all commits authored by
`jpxframer`. (Check `git status -sb` rather than trusting a hash written here —
the previous session recorded a commit that had never actually been pushed.)

> The user asked that no AI attribution appear anywhere near this repo. Do NOT
> add `Co-Authored-By`, "Generated with", or similar to commits or PRs.
> `AGENTS.md` and `CLAUDE.md` (auto-written by `next dev`) are gitignored on
> purpose — leave them untracked.

**Deployed:** the user has it live on Vercel with a custom domain. The URL was
never shared, so ask for it if you need to check the deployed build.

**Built so far** — landing page, desktop + mobile:

| Section | Desktop node | Mobile node |
| --- | --- | --- |
| Nav | `18728:22992` | `18728:23398` |
| Hero | `18728:23017` | `18728:23412` |
| About | `18728:23029` | `18728:23424` |
| Audiences | `18728:23092` | `18728:23487` |

**Next up:** the remaining landing-page sections, then the other 4 screens —
`18728-10408`, `18728-10519`, `18728-10623`, `18728-10735`.
Full landing frames: desktop `18728-22990`, mobile `18728-23394`.

**Waiting on the user:** confirm the Audiences copy calls (see the 2026-09-06
08:05 entry) and whether `#features` is the right anchor for that section.

**Housekeeping:** local dev server stopped, ports 3000 and 3100 free.
`TaskStop` does not kill the Node process — kill the PID from
`netstat -ano | grep :3000` as well.

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

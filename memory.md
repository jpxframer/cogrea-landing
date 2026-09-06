# Cogrea — Session Log

Running log of what was done, newest first. Read this first when picking the
project back up. Project conventions live in [README.md](README.md).

---

## Where things stand — 2026-09-06 09:15 WAT

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
| How It Works | `18728:23186` | `18728:23581` |
| Why Choose Cogrea | `18728:23234` | `18728:23630` |
| Features | `18728:23278` | `18728:23674` |

**Next up:** the remaining landing-page sections, then the other 4 screens —
`18728-10408`, `18728-10519`, `18728-10623`, `18728-10735`.
Full landing frames: desktop `18728-22990`, mobile `18728-23394`.

**Waiting on the user:** confirm the copy calls in the 08:05, 08:30 and 09:15
entries. The `#features` anchor question is settled — see 09:15.

**Housekeeping:** local dev server stopped, ports 3000 and 3100 free.
`TaskStop` does not kill the Node process — kill the PID from
`netstat -ano | grep :3000` as well.

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

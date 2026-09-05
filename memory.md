# Cogrea — Session Log

Running log of what was done, newest first. Read this first when picking the
project back up. Project conventions live in [README.md](README.md).

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

Remaining landing-page sections, then the other 4 screens:
`18728-10408`, `18728-10519`, `18728-10623`, `18728-10735`.
Full landing frames: desktop `18728-22990`, mobile `18728-23394`.

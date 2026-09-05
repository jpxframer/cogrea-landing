# Cogrea — Session Log

Running log of what was done, newest first. Read this first when picking the
project back up. Project conventions live in [README.md](README.md).

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
2. Mobile header is `sticky top-0 z-50` (`desk:static`), and the open menu is
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
- Sticky header on desktop too (currently mobile-only, as requested).
- Language selector is a static button — needs real i18n wiring.
- All CTA/nav hrefs are placeholder routes.

### Next up

Remaining landing-page sections, then the other 4 screens:
`18728-10408`, `18728-10519`, `18728-10623`, `18728-10735`.
Full landing frames: desktop `18728-22990`, mobile `18728-23394`.

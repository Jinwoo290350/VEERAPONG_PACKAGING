---
name: veerapong-design
description: Design system and content conventions for the Veerapong Packaging website — brand palette, colour discipline, component patterns, how to add product photos, and the 4-language content workflow. Use when styling pages, adding products or photos, or changing anything visual in this repo.
---

# Veerapong Packaging — design system

Corporate site for หจก. วีรพงษ์ แพคเกจจิ้ง (PP Board boxes, EPE/EVA foam, air bubble,
printing services). Next.js App Router + Tailwind v4 + next-intl, 4 locales (th default, en, ja, zh).

## Brand palette

Defined in `src/app/globals.css` under `@theme`. Taken from the VP puzzle logo.

| Token | Use |
|---|---|
| `forest-950` `#0a2a1a` | dark section backgrounds (hero, footer, CTA) |
| `forest-900` `#14472c` | logo dark green, deep gradients |
| `forest-700` `#1c6a3e` | **primary buttons**, links, active states |
| `forest-500` `#2f9e5e` | logo mid green, gradient ends, glows |
| `forest-50/100` | tinted section backgrounds, quiet chips |
| `amber-500` `#f4701a` | **accent only** — the orange rule in the logo |

Never introduce a colour outside this scale (no sky/rose/indigo/violet). Product
category `accent` values in `src/data/products.ts` are all forest gradients, with a
single amber one for contrast.

## Colour discipline (the "no colour hit" rule)

The site must read premium and trustworthy, not loud:

- **Green is the default.** Buttons, links, dots, icon chips → `forest-700`.
- **Amber is a spice, max ~1–2 per screen.** Reserved for: the hero primary CTA
  (on dark green), the hero badge/highlight word, the final CTA button, and the
  floating chat button. Do not use amber for section CTAs, taglines, or full cards.
- **No multi-hue gradients on text or numbers.** Stats and headlines are flat
  (`text-forest-300` on dark, `text-forest-950` on light); a single highlighted
  word may be `text-amber-400`.
- Background photos sit at `opacity-15…25` with `[filter:grayscale(0.6)]` under a
  `forest-950/80…95` overlay so type stays legible and the palette stays calm.

## Product photography

Real photos live in `public/photos/<category>/` with descriptive kebab-case names
(`epe-foam-roll.png`, `pp-box-with-partition.png`). Categories reference them in
`src/data/products.ts`:

```ts
image: "/photos/foam/epe-foam-roll.png",  // card + header cover
isPhoto: true,                             // photo, not illustration
gallery: ["/photos/foam/epe-foam-roll.png", ...],  // carousel
```

Rules:
- Photos are **studio shots on white** → always rendered `object-contain` on a
  white surface (cards, galleries, headers, marquee). Never `object-cover`, it
  crops product edges.
- `gallery` entries that don't exist on disk are filtered out at build time in
  `src/app/[locale]/products/[category]/page.tsx`, so listing future filenames is safe.
- The homepage marquee (`marqueePhotos` in `src/app/[locale]/page.tsx`) lists every
  photo with a `key` that maps to `showcase.<key>` in the message files.
- Only use imagery the owners supplied or CC0/CC-BY stock. Never scrape competitor images.

## Component patterns

- **Cards / frames:** `rounded-2xl` (cards) or `rounded-3xl` (large frames),
  `border border-slate-100`, soft shadow (`shadow-sm` → `shadow-xl shadow-forest-900/5`).
- **Sections:** alternate `bg-white` and `bg-forest-50/50` + `thai-weave-light`;
  dark sections use `bg-forest-950` + `thai-weave`.
- **Marquee** (`.animate-marquee` in globals.css): duplicate the item list twice,
  second copy `aria-hidden` with `tabIndex={-1}`; pauses on hover.
- **Showcase3D** (`src/components/Showcase3D.tsx`): CSS-3D scenes (`foam`, `ppboard`,
  `bubble`) shown in category headers; drag to rotate, explode button reveals
  numbered callouts. Labels come from `viewer.<variant>.*` messages.
- **Reveal**: scroll-in wrapper, stagger with `delay={i * 100}`.
- Respect `prefers-reduced-motion` — marquee and float animations are disabled there.

## Content workflow (4 languages)

Every user-facing string lives in `src/messages/{th,en,ja,zh}.json` — add a key to
**all four** files in the same edit. Product copy lives in `src/data/products.ts`
as `Localized` objects (`{ th, en, ja, zh }`).

Company facts (address, phones with contact names, emails, LINE `nu0816861818`) are
in `src/data/company.ts` and flow into the contact page, footer, JSON-LD, and the
AI chat system prompt in `src/app/api/chat/route.ts`.

## Brand assets

- `public/logo.jpg` — full logo artwork (mark + wordmark).
- `public/logo-mark.png` — cropped puzzle mark, used in the navbar/footer next to
  the text wordmark (avoids duplicating the words).
- `src/app/icon.png`, `src/app/apple-icon.png` — favicons; `public/og.png` — social card.
- Next.js/Vercel starter assets have been deleted; `devIndicators: false` hides the dev badge.

## Performance & SEO rules

- **Every page must declare its own canonical.** Next merges `alternates` from
  the layout into children, so a page without its own `alternates` inherits the
  locale home URL and gets dropped from Google's index. Use
  `localeAlternates(locale, path)` from `src/lib/metadata.ts` in every
  `generateMetadata`.
- **Site origin** comes from `company.siteUrl` (env `NEXT_PUBLIC_SITE_URL`, else
  Vercel's production URL). Never hard-code a domain.
- **New photos**: drop the master anywhere under `public/photos/<category>/`,
  then run `npm run optimize:images`. It resizes to 1200px, converts alpha-free
  PNGs to JPEG (update the paths it prints), regenerates `src/data/blur.ts`, and
  backs originals up to gitignored `assets-original/`. Keep files under ~250KB.
- **Client components** that are interactive but not immediately visible
  (chat, 3D viewer, carousel) load through `next/dynamic`; give anything above
  the fold a fixed-height placeholder to avoid layout shift.
- Only one image per page may carry `priority` — it should be the LCP element.
- Meta descriptions stay under ~155 characters.

## Verify before finishing

`npm run build` must pass, then check in the browser preview: homepage, one photo
category (`/th/products/film-tape`), one 3D category (`/th/products/foam`), and
`/th/contact`. Confirm no stray non-brand colours and no cropped product photos.

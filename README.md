# Hera Brunch

Website for **Hera Brunch**, Rabat’s home of breakfast.

**Concept: "Golden Hour".** Scrolling the site is like living one morning at Hera. It opens at dawn and ends in late-morning sun, and every animation follows that idea:

1. **Loader:** a clock runs from 06:00 to 08:00 while a glass of mint tea fills.
2. **Hero:** "Good mornings start here." A latte-art pour plays inside a Moroccan arch while a warm sun rises behind it.
3. **Intro:** the homepage text fills in word by word as you scroll.
4. **Two traditions, one table:** a pinned scene. Moroccan plates slide in from one side and brunch plates from the other, and they meet on one table.
5. **Menu:** filter pills with item counts, a large typographic list, and a dish preview that follows the cursor.
6. **Every morning:** three clips that open up as you scroll: honey over pancakes, fresh orange juice, and tea poured from height.
7. **Marquee:** a looping text band that reacts to scroll speed.
8. **Visit:** live Rabat time, open/closed status, hours, directions and a spinning "Book a table" badge.
9. **Footer:** the sun sets behind a giant wordmark.

The site is in English, French and Arabic (right to left). It switches language automatically from the browser and has a switcher in the header.

## Stack

- [Vite](https://vite.dev) + React
- [GSAP](https://gsap.com) + ScrollTrigger for the scroll scenes
- [Lenis](https://lenis.darkroom.engineering) for smooth scrolling
- Fonts, self-hosted through Fontsource: **Fraunces** (headlines), **Instrument Sans** (text), **Reem Kufi** + **IBM Plex Sans Arabic** (Arabic)

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build in dist/
npm run preview   # serve the production build
```

It deploys to any static host (Vercel, Netlify, Cloudflare Pages). The build command is `npm run build` and the output folder is `dist`.

## Where to edit things

| What | File |
|---|---|
| Hours, address, phone, links, videos | `src/data/site.js` |
| Menu items and prices | `src/data/menu.js` |
| All text, in EN / FR / AR | `src/i18n.jsx` |
| Colours and fonts | top of `src/styles.css` |
| Sections | `src/components/` |

## Before launch

- [ ] Confirm opening hours. The current 08:00–16:00 every day is a placeholder.
- [ ] Add the street address and phone number.
- [ ] Add prices to `src/data/menu.js`. Rows show the price as soon as one is set.
- [ ] Add Glovo or booking links if Hera has them.
- [ ] Replace the text wordmark with the real logo (SVG) in `src/components/Bits.jsx`.
- [ ] Replace the stock clips and illustrated dishes with photos and videos of Hera’s own plates (`site.media` in `src/data/site.js`).
- [ ] Have a native speaker review the French and Arabic text.
- [ ] Keep `CREDITS.md` up to date for any stock photo or video, and use only items whose licence allows commercial use.

## Media

Videos and images live in `public/media/` and are wired up in `site.media` (`src/data/site.js`). Any slot set to `null` falls back to the built-in illustration. Clips play muted, only while on screen, and stay on their poster frame for visitors who prefer reduced motion. Sources and licences are listed in `CREDITS.md`.

To add a clip, export it small: a square or 4:5 crop, no audio, H.264 MP4 at around 720–1080 px.

## Brand

| Role | Colour |
|---|---|
| Terracotta (logo) | `#C06E4D` |
| Cream (background) | `#FEFBE8` |
| Dawn | `#F6D9C4` |
| Honey | `#D9962B` |
| Mint tea | `#3E7A5E` |
| Espresso (text) | `#2B1D14` |

## Accessibility

- Visitors with "reduce motion" switched on get a calm version: no loader, smooth scrolling, pinning or scrubbed scenes.
- The custom cursor and dish preview only appear on devices with a mouse.
- Language and text direction are set on `<html>`, so screen readers and browsers read each language correctly.

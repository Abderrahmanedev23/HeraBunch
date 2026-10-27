# Hera Brunch

Website for **Hera Brunch**, Rabat’s home of breakfast.

**Concept: "Golden Hour".** Scrolling the site is like living one morning at Hera. It opens at dawn and ends in late-morning sun, and every animation follows that idea:

1. **Loader:** a clock runs from 06:00 to 08:00 while a glass of mint tea fills.
2. **Hero:** "Good mornings start here." A latte-art pour plays inside a Moroccan arch while a warm sun rises behind it.
3. **Morning window:** a pinned scene. Wooden shutters open onto Rabat at sunrise (the kasbah wall, Hassan Tower, palms and the sea), light and dust fill the room, then the view flies through the window into the next section.
4. **Intro:** the homepage text fills in word by word as you scroll.
5. **Two traditions, one table:** a pinned scene. Moroccan plates slide in from one side and brunch plates from the other, and they meet on one table.
6. **Tile band:** a strip of zellige stars that slides sideways as you scroll.
7. **Menu:** photo cards framed in Moroccan arches, in a staggered grid. Each arch opens around its photo as it scrolls in, and filtering glides the cards to their new places.
8. **Every morning:** the section rises in as an arch, and three clips open up inside it: honey over pancakes, fresh orange juice, and tea poured from height.
9. **Marquee:** a looping text band that reacts to scroll speed.
10. **Visit:** live Rabat time, open/closed status, hours, directions and a spinning "Book a table" badge.
11. **Footer:** the sun sets behind a giant wordmark.

Throughout the page, a small sun in the corner crosses the sky as you scroll and takes you back to the top when clicked. Section labels draw a short line as they appear.

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
| Menu items, prices and photos | `src/data/menu.js` |
| All text, in EN / FR / AR | `src/i18n.jsx` |
| Colours and fonts | top of `src/styles.css` |
| Sections | `src/components/` |

## Before launch

- [ ] Confirm opening hours. The current 08:00–16:00 every day is a placeholder.
- [ ] Add the street address and phone number.
- [ ] Add prices to `src/data/menu.js`. Rows show the price as soon as one is set.
- [ ] Add Glovo or booking links if Hera has them.
- [ ] Replace the text wordmark with the real logo (SVG) in `src/components/Bits.jsx`.
- [ ] Replace the stand-in stock photos and clips with Hera’s own: menu photos in `src/data/menu.js`, table plates and videos in `site.media` (`src/data/site.js`). The Moroccan dishes currently use look-alike photos.
- [ ] Have a native speaker review the French and Arabic text.
- [ ] Keep `CREDITS.md` up to date for any stock photo or video, and use only items whose licence allows commercial use.

## Media

Videos and images live in `public/media/`. Menu photos are set per item in `src/data/menu.js`; videos and table plates are in `site.media` (`src/data/site.js`). Anything left empty falls back to the built-in illustration. Clips play muted, only while on screen, and stay on their poster frame for visitors who prefer reduced motion. Sources and licences are listed in `CREDITS.md`.

To add a clip, export it small: a square or 4:5 crop, no audio, H.264 MP4 at around 720–1080 px. Menu photos work best as 4:5 portraits around 720×900 px; table plates as squares around 420 px, shot from above.

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

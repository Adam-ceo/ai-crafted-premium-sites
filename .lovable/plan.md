## Cél

A PageSpeed által jelzett render-blocking `index-*.css` (~34 KB) lecsökkentése és az LCP gyorsítása. A bundle nagy részét a `@fontsource` csomagok teljes CSS-ei adják (összes nyelvi subset minden súlyhoz × 3 család = sok száz `@font-face` szabály), nem maga a Tailwind.

## Mit fogunk tenni

### 1. Csak szükséges font subsetek importálása (legnagyobb nyereség, ~20-25 KB CSS megtakarítás)

A `src/main.tsx` jelenleg a teljes `wght.css`-t tölti be (minden nyelvi subset). Lecseréljük csak a `latin` (és opcionálisan `latin-ext`) subsetekre, mivel az oldal angol nyelvű:

```ts
// Helyett: "@fontsource-variable/newsreader/wght.css"
import "@fontsource-variable/newsreader/latin-wght.css";
import "@fontsource-variable/manrope/latin-wght.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-500.css";
import "@fontsource/jetbrains-mono/latin-700.css";
```

A `newsreader-italic`-ot eltávolítjuk, ha sehol nem használunk dőlt szöveget (gyors keresés után döntünk; ha kell, csak `latin-italic` marad).

### 2. Hero font preload

A `index.html` `<head>`-jébe `<link rel="preload" as="font" type="font/woff2" crossorigin>` tagek a hero-ban használt 1-2 font fájlra (Newsreader Variable Latin, Manrope Variable Latin). Ezzel az LCP szöveg azonnal renderelhető a CSS parse után is.

### 3. `font-display: swap` ellenőrzése

A `@fontsource` alapból `swap`-ot használ — megerősítjük, hogy nem írtuk felül `block`-ra az `index.css`-ben.

### 4. CSS bundle splitting marad

A Vite már `cssCodeSplit: true`-val épít, de mivel az összes font import a `main.tsx`-ben van, egy bundle-be kerül. Ez rendben van — a fontos a méret csökkentése.

### 5. Opcionális: `dns-prefetch` → `preconnect` az emailjs-hez csak a Quote oldalon

Az `index.html`-ben minden oldalra elmegy a `dns-prefetch`. Mivel csak a `/quote` használja, ez maradhat (olcsó), de jelezzük: ha még tisztább head kell, áthelyezhető a Quote komponensbe `useEffect`-tel.

## Nem csinálunk

- Nem váltunk Google Fonts CDN-re (lassabb lenne és cookie-mentes preconnect kell hozzá).
- Nem inline-oljuk a critical CSS-t kézzel — a Tailwind purge után a maradék (~10-15 KB Latin-only fontokkal) már elfogadható méretű és cache-elhető.
- Nem nyúlunk a vizuális megjelenéshez.

## Várható eredmény

- `index-*.css` átviteli méret: **~34 KB → ~10-14 KB** (gzipped még kevesebb).
- LCP javulás: ~150-300 ms tipikusan 4G-n.
- A "render-blocking requests" figyelmeztetés vagy eltűnik, vagy a hatása elhanyagolhatóra csökken.

## Érintett fájlok

- `src/main.tsx` — font importok cseréje latin subsetre
- `index.html` — 1-2 font preload tag hozzáadása
- (esetleg) `src/index.css` — `font-display` ellenőrzés

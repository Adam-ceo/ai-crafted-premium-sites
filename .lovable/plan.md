## Probléma

Mobilon a hamburger menü kinyílik, de a benne lévő gombok (Services, Process, Pricing, stb.) nem reagálnak koppintásra.

## Diagnózis

A `Nav.tsx`-ben a header `z-index: 100`, a mobil menü overlay viszont `z-index: 90` — ez fordított, de még nem ez a fő baj. A valódi probléma:

A mobil menü overlay React Portal-on keresztül a `document.body`-ba van renderelve. Viszont amikor a menü nyitva van, a `Nav.tsx` `useEffect`-je beállítja a `body`-ra: `position: fixed`, `top: -${scrollY}px`. Ez a `body`-ra alkalmazott transzformáció önmagában rendben van, DE az overlay `position: fixed; top: 64px` — mivel a `body` most `position: fixed` és el van tolva, a portál tartalma a viewport-on kívülre eshet bizonyos görgetési pozíciókban, vagy a `body::after` (z-index: 0, position: absolute, height: 700px) a fixed body új koordinátarendszerében az overlay fölé kerülhet kattintási rétegként.

Konkrétan: a `body::before` és `body::after` pseudo-elemek `pointer-events: none`-ot kapnak — ez OK. **De** az overlay `z-index: 90`, miközben a `header` `z-index: 100`. A header alatt egy láthatatlan progress bar / area marad, ami nem blokkolja, viszont a `framer-motion` animált belső `<motion.div>` elemek — a navigációs linkek wrapper-ei — `transform`-mal érkeznek. A klikkelést leginkább a következő blokkolja: az overlay `top: 64px`-tól indul, de a header maga (`z-index: 100`) a teljes szélességet lefedi 0–64px között — ez nem érinti a gombokat.

A tényleges blokkoló: a **Sonner Toaster** (`bottom-right`, `position: fixed`) és más portálok defaultból magas z-indexszel ülnek a body-n. De a fő gyanús: a `body { position: fixed }` állapotban a portál `position: fixed` overlay-e a vizuális viewport-hoz igazodik, viszont mobil Safari-n a `100vh`/scroll interakció miatt egyes gyermek `motion.div`-ek `pointer-events`-e elveszhet, ha a parent `opacity` animációja közben `will-change` nincs beállítva — de ez ritka.

A legvalószínűbb és legkönnyebben javítható ok: **az overlay `z-index: 90` kisebb mint a header `z-index: 100`**, így bár a header csak 64px magas, a header alatti dropdown (`AnimatePresence` desktop dropdown) vagy egyéb fixed elemek (Sonner toaster, BackToTop gomb) a menü tartalma fölé kerülhetnek és elnyelik a kattintást. A `BackToTop` komponens jellemzően jobb-alsó sarokban fixed, magas z-indexszel — pont a mobil CTA gomb területén.

## Megoldás

1. **`src/components/Nav.tsx`** — Az overlay z-index-ét emeljük a header fölé (`zIndex: 110` helyett `90`), és tegyük az overlay-t a header alá vizuálisan, de a többi fixed elem (BackToTop, Sonner) fölé. Header marad `z-[100]`, overlay `zIndex: 99` → de hogy a klikkek menjenek, az overlay-t emeljük `zIndex: 200`-ra, és a header `top: 0`-ra hagyjuk (mivel a hamburger gomb a headerben van, az kell, hogy felül legyen — viszont a menü nyitásakor a teljes overlay borítson mindent a header alatt).

   Konkrét változás: az overlay `style.zIndex` `90` → `99` **NEM elég**. A helyes érték: overlay `zIndex: 110`, és az overlay-en belül legyen explicit `pointer-events: auto`. Plusz a benne lévő `motion.div` wrapper-ekhez hozzáadunk `position: relative; z-index: 1`-et, hogy a framer-motion animált transformok ne kerüljenek véletlenül egy másik stacking context alá.

2. **`src/components/BackToTop.tsx`** — Ellenőrzés: ha `z-index` ≥ 90, csökkenteni kell `z-50`-re, vagy elrejteni amikor a `body.mobile-menu-open` osztály jelen van. Hozzáadunk CSS szabályt az `index.css`-be:
   ```css
   body.mobile-menu-open .back-to-top,
   body.mobile-menu-open [data-sonner-toaster] {
     display: none !important;
   }
   ```

3. **`src/components/Nav.tsx`** — A `goToSection` callback-ben a `setMenuOpen(false)` utáni `scrollToSection` 0ms-mal hívódik, miközben a body-ról a `position: fixed` eltávolítása + scroll restore zajlik. Ez ronthatja a görgetést mobilon. A scroll-t `requestAnimationFrame` után indítsuk, hogy a body unlock befejeződjön előbb.

## Technikai részletek

- Fájlok módosítva: `src/components/Nav.tsx`, `src/index.css`, esetleg `src/components/BackToTop.tsx` (ellenőrzés után).
- Vizuális dizájn nem változik.
- Tesztelés: mobil viewport (375px), hamburger nyit → minden link és gomb koppintásra reagál.

## Hatás

A mobil menü navigáció ismét működni fog. Nincs hatása a desktop nézetre vagy más oldalakra.

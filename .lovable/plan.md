## Cél

Egy 10/10-es, "1M$ értékű" weboldal a Luxiflow-nak — **Light Studio / Swiss Editorial** vizuális iránnyal, cinematic interakciókkal, és minden olyan funkcióval, ami egy frissen induló prémium AI-stúdió számára hiteles bizalmat épít, képgaléria nélkül is.

A jelenlegi sötét/arany verziót **teljesen újraépítjük** light alapra. A jó technikai alapok (a11y, SEO meta, EmailJS, route struktúra) megmaradnak, de a teljes vizuális réteg, animációs réteg és a tartalmi szekciók újragondolva.

---

## Vizuális irány — "Swiss Editorial Light"

**Hangulat:** Pentagram × Locomotive × Linear. Magabiztos csend. Sok fehér tér. Tűéles tipográfia. Egyetlen accent szín. Nincs giccs, nincs felesleges dekoráció — minden pixelnek dolga van.

**Paletta:**
- Háttér: `#FAFAF7` (törtfehér, papírszerű)
- Mély szöveg: `#0E0E0E`
- Mid szöveg: `#5A5A55`
- Halvány vonal/border: `#E6E4DD`
- Accent (egyetlen): `#E5572A` (égett narancs — feltűnő, modern, NEM klisé arany; beszédesebb az "olcsó prémium" pozícióhoz mint az arany)
- Sötét inverz szakaszok: `#0E0E0E` háttérrel a "process / case study" szekciókhoz (a hibrid hangulatért, a kontraszt erejéért)

**Tipográfia:**
- Display: **Söhne Breit** alternatíva → **"Fraunces"** (variable serif, expressive, modern luxus érzet) — vagy **"Instrument Serif"** ha könnyebb súlyt szeretnénk
- Body: **"Inter"** (cleaner mint a Manrope, prémium feel)
- Mono: **"JetBrains Mono"** marad, számokra
- Variable font subset, font-display: swap, preload

**Grid:** 12-oszlopos, 1440px max, generózus 32px gutter, sok 80–160px függőleges padding.

---

## Új oldalstruktúra (route-ok)

```
/                       → Home (új, teljes újraépítés)
/work                   → Case study lista (induláskor "concept pieces"-ekkel)
/work/[slug]            → Egyedi case study oldal (long-form, 4-6 induláskor)
/about                  → Founder + filozófia + workflow
/services               → Részletes service oldal (a home-ról kibontva)
/pricing                → Részletes pricing (FAQ, garancia, comparison itt is)
/blog                   → meglévő, új design-ra portolva
/blog/[slug]            → meglévő, új design-ra portolva
/book                   → Cal.com beágyazott discovery call
+ legal oldalak (meglévők, új design)
```

---

## Home oldal szekciói (sorrendben)

1. **Sticky nav** — minimal, baloldal logó, középen 4 link, jobb oldalt élő státusz pötty + "Book a call" CTA. Scroll-progress vékony narancs csík alul.

2. **Hero**
   - Bal: Eyebrow ("Independent AI-native web studio"). Hatalmas serif headline 2 sorban. Egy mondat alcím. Két CTA (primary "Start a project" + secondary "See how we work").
   - Jobb: NEM fake terminál. Helyette egy **élő, scroll-reaktív tipográfia-mockup** ami egy "live brief → website" morphot mutat (3 állapot: kézzel írt brief → wireframe → render).
   - Alul: minimalista logó-strip placeholderrel ("Founders we've shipped for" — első hónapokban "Selected for early-access program"-ra cserélhető).

3. **"The 14-day promise"** — három KPI nagy mono számokkal (14 days · €1,500 · Lighthouse 98+), mindegyik egy soros magyarázattal. Sötét háttéren, full-bleed, scroll-pinnel a számok beszámolnak 0-tól.

4. **Services** — 4 szolgáltatás szerkesztői layoutban (sorszám, név, leírás, ár, timeline, példa-deliverable lista). Hover: kép-preview a háttérben (1 generikus képet használunk szolgáltatásonként).

5. **Process** — interaktív, scroll-pin-elt 4 lépés. Bal oldalon a számláló 01→02→03→04 morphol scroll szerint, jobb oldalon a tartalom váltakozik. GSAP ScrollTrigger.

6. **AI workflow demo** *(ÚJ — ez differenciál)* — egy interaktív panel ami megmutatja hogyan dolgozunk: brief input → AI wireframe → human refinement → ship. 3-4 lépés, mindegyik egy 4-6 másodperces autoplay videó/canvas mockup. Ez teszi hihetővé az "AI workflow" claim-et.

7. **Comparison table** *(ÚJ)* — Luxiflow vs. Freelancer vs. Hagyományos ügynökség vs. Webflow template. 6-8 sor (idő, ár, custom code, ownership, support, performance). Az utolsó oszlop kiemelve.

8. **Quick-quote calculator** *(ÚJ)* — 3 lépéses interaktív kalkulátor:
   - Lépés 1: típus (Marketing site / Landing / Portfolio / E-commerce)
   - Lépés 2: scope (oldalak száma slider, animációk toggle, CMS toggle, i18n toggle)
   - Lépés 3: timeline (standard / rush)
   - Eredmény: ártartomány + becsült timeline + "Send this to my inbox" gomb (EmailJS-en keresztül a fejlesztő-csapatnak menő brief)

9. **Case study showcase** — 3 kiemelt "concept piece" / "early access" projekt nagy, megemelt kártyákban. Hover: kép-zoom + reveal. Klikk → `/work/[slug]`. Mivel még nincs valódi portfólió, ezeket **őszintén "Concept" badge-dzsel jelöljük**, és melléteszünk egy CTA-t: "Be our launch partner — first 3 founders get 20% off". Ez fordítja a hiányt erővé.

10. **Founder szekció** *(ÚJ)* — egy nagy fekete-fehér portré balra (placeholder amíg nincs valódi), jobbra rövid manifesto: "Ki vagyok, miért alapítottam Luxiflow-ot". 1 idézet, aláírás-szerű kézírás SVG-vel. Ez adja az "emberi craft"-ot.

11. **Testimonials / Trust** — induláskor: ha van 1-2 idézet, kiemeljük; ha nincs, helyette "What founders say after their discovery call" — anonim, parafrazált 30 másodperces idézetek a discovery call-okból. Plusz: "As featured in" PR sor (ha még nincs, kihagyjuk).

12. **Pricing** — 3 plan, középen kiemelt. Mindegyik kártya alján: link "Start with this plan" → quick-quote kalkulátor előre kitöltve.

13. **Garancia szekció** *(ÚJ)* — 3 kártya: "14-day delivery or 20% refund" · "Lighthouse 90+ guaranteed" · "30-day post-launch support". Pecsét-szerű körkörös ikonokkal.

14. **FAQ** *(ÚJ)* — 10 valódi kérdés akkordeonban (timing, payment, ownership, revisions, hosting, what-if-late, AI vs. human, comparison, process changes, ki nem nekünk való).

15. **Final CTA** — full-bleed sötét szakasz, hatalmas serif headline, dual CTA ("Send a brief" + "Book 30-min call").

16. **Footer** — kibővítve: navigáció + szolgáltatások + legal + kontakt + social + newsletter signup ("One short email a month — no spam").

---

## Cinematic effektek (minden bevethető)

- **Lenis smooth scroll** — globálisan, erősen finomhangolva
- **GSAP + ScrollTrigger** — pinned process szakasz, scroll-scrubbed számláló animációk, parallax képek, layered fade-stagger
- **React-Three-Fiber** — finom shader gradient noise háttér a hero-ban (off-white papír-textúra mozgásban — szubtilis, nem zavaró). Mobilon kikapcsolva, statikus képpel helyettesítve.
- **Magnetikus CTA gombok** — egér-közelségben enyhén húzódnak, GSAP-pal
- **Cursor spotlight** — sötét szakaszokon halvány narancs glow követi az egeret
- **Page transitions** — Framer Motion AnimatePresence + view transition: route-váltáskor short fade + scale, hero→case study esetén shared layout morph
- **Lottie mikrointerakciók** — send button checkmark, FAQ accordion icon, success state
- **Scroll-driven serif "split text"** — a hero headline karakterenként reveal, GSAP SplitText alternatívával (custom JS, nincs licenc)
- **Image LQIP blur-up** — minden képre
- **Marquee logó-strip** — végtelen scroll, hover-on pause

Mindezek mellett: **`prefers-reduced-motion` teljesen tiszteletben tartva** — minden effekt kikapcsol, statikus fallback.

---

## Új funkciók részletesen

- **Cal.com inline booking** a `/book` oldalon és a Final CTA modal-jában
- **Quick-quote kalkulátor** — előre kitölthető URL paraméterekkel (a pricing kártyákról)
- **Élő case study oldalak** (`/work/[slug]`) — long-form template: hero kép, kihívás, megközelítés, eredmény (metrikák), screenshot galéria, ügyfél-idézet
- **Newsletter signup** EmailJS-szel
- **Sticky "quick brief" floating gomb** mobilon — egy kattintás a contact form-hoz
- **Brief drawer** desktopon — bárhol kattintható "Start a project" gomb egy Vaul/Radix drawer-t nyit a teljes form-mal (oldalbetöltés nélkül)
- **404 oldal újratervezve** ezzel a brand-del

---

## Trust / hihetőség "portfólió nélkül"

Mivel induló brand: őszintén kommunikáljuk az "új studio" pozíciót, és ezt **erősséggé fordítjuk**:
- "Launch partner" program: első 3 ügyfél 20% kedvezmény + extended support
- "Built in public" link a folyamatra (process oldal)
- A Luxiflow saját site-ja mint case study #1 (meta — itt látod amit építünk)
- Concept piece-ek világos "Concept" badge-dzsel — sosem hazudunk valódi ügyfélről
- Founder arccal és névvel — a személy a trust

---

## Technikai részletek

- **Új design system**: `src/components/ui/primitives/` mappában `<Heading variant>`, `<Text variant>`, `<Container>`, `<Section>`, `<Eyebrow>`, `<Number>` primitívek. Minden méret/szín tokenből, sehol inline `style={{}}`.
- **Tokenek**: `src/styles/tokens.css` — színek, spacing, font-size scale, line-height, radius, shadow, motion-easing, z-index. CSS variables + Tailwind config kibővítése.
- **Framer variants**: `src/lib/motion.ts` — newsletter-szerűen `fadeUp`, `staggerParent`, `revealMask`, `magneticHover` újrahasználva.
- **GSAP**: `src/lib/scroll.ts` — Lenis init, ScrollTrigger setup, központi reduce-motion guard.
- **R3F**: `src/components/canvas/PaperShader.tsx` — hero háttér, Suspense + lazy.
- **Képek**: új `src/assets/work/` és `src/assets/founder/` — AI-generált concept screenshotok (mockup) addig, amíg nincs valódi tartalom.
- **Régi komponensek**: `Terminal.tsx`, `Philosophy.tsx`, `Portfolio.tsx`, jelenlegi `Hero.tsx` stb. törölve. `Nav`, `Footer`, `Contact`, `Pricing`, `Process`, `Services`, `WhyUs`, `CtaBanner` mind újraépítve a primitívekkel.
- **Tailwind config**: kibővítve a tokenekkel (a `text-brass`, `bg-luxiblack` tipusú jelenlegi referenciák cserélve).
- **Index.html**: új OG image generálás (statikus PNG `/public/og.jpg`-be), bővített schema.org JSON-LD (Service + FAQPage + Person founder), preload kritikus fontokra, theme-color.
- **Új csomagok**: `gsap` (ingyenes plugin-ok: ScrollTrigger), `lenis`, `@react-three/fiber@^8.18`, `@react-three/drei@^9.122.0`, `three@^0.160`, `lottie-react`, esetleg `@calcom/embed-react`.
- **Performance budget**: Hero LCP < 2.0s, CLS < 0.05, JS first-load < 250KB gzip (R3F lazy-loaded a hero-után).
- **Tesztelés**: viewporton 1920 / 1366 / 768 / 390 mind QA screenshotolva építés után.

---

## Megvalósítási sorrend

```text
1. Tokenek + design system primitívek + Tailwind config + új CSS alap
2. Új Nav + Footer + Layout shell
3. Hero (R3F shader nélkül először, statikus) + responsive
4. Lenis + GSAP integráció + magnetic gombok + cursor spotlight
5. Hero R3F shader réteg (lazy)
6. Services / Process / WhyUs / Pricing szekciók új designban
7. Új szekciók: AI workflow demo, Comparison, Quick-quote kalkulátor
8. Case study lista + 3 concept piece részletes oldal
9. Founder + Testimonials + Garancia + FAQ + Final CTA
10. Brief drawer + Cal.com /book oldal + Newsletter
11. Blog + legal oldalak portolása az új designra
12. SEO: új OG kép, bővített schema, sitemap, robots
13. Mobil + tablet + 1366 + 1920 QA, Lighthouse audit, reduce-motion teszt
```

---

## Amit NEM csinálunk most

- Nem építünk valódi CMS-t (concept piece-ek statikusan fájlban)
- Nem építünk valódi auth-ot / dashboardot
- Nem adunk hozzá több nyelvet (i18n előkészítve, de csak EN aktív)
- Nem teszünk hamis testimonialt vagy hamis logó-falat — őszintén kezeljük a "launch partner" pozíciót

---

## Mit kérek tőled a megvalósítás megkezdése előtt (de nem blokkolja a tervet)

Ezek menet közben pótolhatók — placeholderrel kezdünk, és cserélhetők amint megvannak:
- Founder neve, 1 portré fotó (vagy maradunk minimalista monogram-on)
- Cal.com username (vagy Calendly link), különben "coming soon" placeholder lesz
- Konkrét email-cím megerősítése (`hello@luxiflow.io` marad?)
- Engedélyezed-e a 3 "concept piece"-et őszinte "Concept" badge-dzsel az induláshoz

Ha ezek nincsenek meg, mind működik szépen placeholderrel, és később bárhol cserélhetők.
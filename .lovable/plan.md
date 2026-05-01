# Luxiflow → 10/10 stílus konzisztencia terv

A cél: minden inline `fontFamily`/`fontSize`/`letterSpacing`/`borderRadius`/szín kiváltása **egységes, központosított design tokenekkel**. A vizuális végeredmény változatlan — csak a kód lesz tiszta és egy ponton hangolható.

---

## 1. Bővített CSS token rendszer (`src/index.css`)

A `:root` blokkba új tokenek kerülnek (a meglévők mellé):

```css
/* TYPE SCALE (clamp-alapú reszponzív skála) */
--text-xs:   11px;
--text-sm:   13px;
--text-base: 15px;
--text-md:   17px;
--text-lg:   clamp(18px, 1.6vw, 22px);
--text-xl:   clamp(22px, 2.2vw, 28px);
--text-2xl:  clamp(28px, 3.2vw, 38px);
--text-3xl:  clamp(34px, 4.5vw, 56px);
--text-4xl:  clamp(46px, 5.5vw, 82px);

/* FONT WEIGHTS — szabványosított */
--fw-light:  300;   /* csak Newsreader display */
--fw-regular:400;
--fw-medium: 500;
--fw-semi:   600;
--fw-bold:   700;

/* LETTER SPACING — kanonikus 5 érték */
--ls-tight:   -0.03em;  /* nagy display */
--ls-snug:    -0.02em;  /* H1/H2 */
--ls-normal:   0;       /* body */
--ls-mono-sm:  0.12em;  /* kis monospace */
--ls-mono:     0.16em;  /* eyebrow/label */

/* RADIUS — kanonikus skála */
--r-sm:   6px;
--r-md:   8px;
--r-lg:  12px;
--r-xl:  14px;   /* card default */
--r-2xl: 18px;
--r-full:9999px;

/* FONT FAMILIES — egy helyen */
--ff-serif: 'Newsreader', Georgia, serif;
--ff-sans:  'Manrope', system-ui, -apple-system, sans-serif;
--ff-mono:  'JetBrains Mono', 'Fira Code', monospace;
```

## 2. Tipográfiai utility osztályok bővítése

A meglévő `.display-serif`, `.eyebrow`, `.section-label`, `.body-lg`, `.body-sm` mellé:

```css
/* Display variánsok */
.display-xl  { font: var(--fw-light) var(--text-4xl)/1.05 var(--ff-serif); letter-spacing: var(--ls-tight); }
.display-lg  { font: var(--fw-light) var(--text-3xl)/1.1  var(--ff-serif); letter-spacing: var(--ls-snug); }
.display-md  { font: var(--fw-light) var(--text-2xl)/1.15 var(--ff-serif); letter-spacing: var(--ls-snug); }

/* Body variánsok (újradefiniálva tokenekkel) */
.body-lg     { font-size: var(--text-md); line-height: 1.75; color: var(--mid); }
.body-base   { font-size: var(--text-base); line-height: 1.7; color: var(--mid); }
.body-sm     { font-size: var(--text-sm); line-height: 1.65; color: var(--mid); }

/* Mono címkék — 2 kanonikus változat (meglévő) */
.eyebrow      { /* gold */ }
.section-label{ /* low — mostantól tényleg használva */ }
.label-mono   { font: var(--fw-medium) var(--text-xs) var(--ff-mono); letter-spacing: var(--ls-mono-sm); text-transform: uppercase; }

/* Card */
.card         { background: var(--card-bg); border:1px solid var(--border-c); border-radius: var(--r-xl); }
```

## 3. `tailwind.config.ts` szinkronizálás

- A régi `brass`/`luxiblack`/`warmwhite`/`warmgray` márkaszínek **eltávolítása** (vagy aliasolása az új tokenekre, hogy a Philosophy/Portfolio se törjön)
- `fontFamily.serif/sans/mono` változatlan (jó)
- `letterSpacing` extend frissítése a kanonikus 5 értékre
- `fontSize` extend hozzáadása ami a CSS tokenekre mappel: `xs/sm/base/md/lg/xl/2xl/3xl/4xl`
- `borderRadius` extend frissítése: `sm:6 / DEFAULT:8 / md:8 / lg:12 / xl:14 / 2xl:18`

## 4. Komponens migráció — minden inline stílus → utility/token

**Minden komponensben** (Hero, Nav, Footer, Pricing, Process, Services, WhyUs, Contact, CtaBanner, Testimonials, Quote, Blog, BlogPost, LegalLayout, Logo, Terminal, BackToTop):

- `style={{ fontFamily: "'Manrope', sans-serif" }}` → `className="font-sans"`
- `style={{ fontFamily: "'JetBrains Mono', monospace" }}` → `className="font-mono"`
- `style={{ fontFamily: "'Newsreader', serif" }}` → `className="font-serif"`
- `style={{ fontSize: 14 }}` → `className="text-sm"` (vagy `text-base`/`text-md`/...)
- `style={{ letterSpacing: "0.14em" }}` → kanonikus érték közelebb (`text-mono` osztály)
- `style={{ borderRadius: 14 }}` → `className="rounded-xl"`
- `style={{ color: "var(--text)" }}` marad (token), DE inline hex (`#C9A84C`, `#FFFFFF`, `#A1A1AA`, `#0F0F0F`) → `var(--gold)` / `var(--text)` / `var(--low)` token

**Quote.tsx** (23 inline fontFamily) — komplett átírás, leglátványosabb tisztulás itt.

## 5. Dark theme maradványok javítása

- **`Philosophy.tsx`** — komponens nincs használva, **törlés**
- **`Portfolio.tsx`** — komponens nincs használva, **törlés**
- **`NotFound.tsx`** — `#C9A84C` → `var(--gold)`, `#FFFFFF` → `var(--text)`, `#A1A1AA` → `var(--low)`, `#0F0F0F` → `var(--surface)` + light háttér
- **`Terminal.tsx`** — szándékos sötét terminál look megmarad, de a `#C9A84C` → `var(--gold)` (új arany árnyalat)

## 6. Outlier font-weight-ek normalizálása

- `fontWeight: 450` (3 helyen, Nav.tsx) → `500`
- `fontWeight: 800` (Quote.tsx 435, Process.tsx 132) → `700`

## 7. shadcn HSL ↔ custom hex szinkron

A shadcn `--primary` (43 60% 44%) **megtartva** (shadcn UI komponensek miatt kell), de a komponensek **csak** a custom `var(--gold)` tokent használják → egyetlen kanonikus arany.

---

## Várható eredmény (audit pontszámok)

| Terület | Most | Cél |
|---|---|---|
| Színrendszer | 9 | **10** |
| Színhasználat | 7 | **10** |
| Font családok | 6 | **10** |
| Font weight | 7 | **10** |
| Font size hierarchia | 5 | **10** |
| Letter spacing | 5 | **10** |
| Border radius | 6 | **10** |
| Button rendszer | 10 | 10 |
| Tipográfiai utility | 8 | **10** |
| Tailwind config kihasználtság | 3 | **10** |

---

## Hatókör és kockázat

- **17 komponens fájl** módosul (Hero, Nav, Footer, Services, Pricing, Process, WhyUs, Contact, CtaBanner, Testimonials, Terminal, Logo, BackToTop, Contact, LegalLayout, Cookie, NotFound) + **6 oldal** (Index, Blog, BlogPost, Quote, Cookie/Privacy/Terms via LegalLayout)
- **2 fájl törlése** (Philosophy, Portfolio — dead code)
- **0 vizuális változás** szándékolt — minden migráció pixel-pontos megfeleltetéssel
- **Tesztelés**: minden szakaszt vizuálisan verifikálok screenshot összehasonlítással a refaktor után

## Becsült változtatások

- `index.css`: ~80 új sor (tokenek + utility-k)
- `tailwind.config.ts`: kibővített extend
- ~70 inline `fontFamily` lecserélése
- ~50 inline `fontSize` cseréje
- ~30 inline `borderRadius` cseréje
- ~10 hardkódolt szín tokenizálása

Jóváhagyás után végrehajtom egyben.

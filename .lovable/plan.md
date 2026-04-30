## Cél

A navigációs sávba egy új **„Quote”** link kerüljön a *Pricing* után. Erre kattintva a látogató a `/quote` oldalra jut, ahol:
- ha még nem választott csomagot, az oldalon belüli plan picker-rel kiválaszthat egyet,
- ha már korábban választott (pl. a Pricing kártyák „Get a quote / Start your project” gombjával `/quote/starter`, `/quote/professional`, `/quote/enterprise` útvonalon érkezett), egyből a kiválasztott csomag űrlapját látja.

## Mit változtatok

**`src/components/Nav.tsx`** — egyetlen módosítás a `NAV_LINKS` tömbben:

```ts
const NAV_LINKS = [
  { label: "Services", id: "services" },
  { label: "Process",  id: "process"  },
  { label: "Pricing",  id: "pricing"  },
  { label: "Quote",    to: "/quote"   }, // ← ÚJ
  { label: "Why Us",   id: "why"      },
  { label: "Blog",     to: "/blog"    },
];
```

A komponens már most is külön kezeli a `to`-val rendelkező linkeket (React Router `<Link>`-ként renderelődnek) és a section-scrollos `id`-jú gombokat — sem a desktop, sem a mobil menü logikájához nem kell hozzányúlni.

## Miért működik a Quote oldal plan választása nélkül is

A `src/pages/Quote.tsx` már most is kezeli mindkét esetet (lásd `Quote.tsx:200-205, 219-223`):

- Az `App.tsx` route-jai: `/quote/:plan` és `/quote` egyaránt ide mutatnak.
- Ha nincs `:plan` paraméter, az `initial` érték `"starter"` lesz, így a látogató rögtön egy érvényes csomagon nyit.
- A meglévő **plan picker** (`showPlanPicker` state + `switchPlan`) gombbal a látogató bármikor másik csomagra válthat az oldalon belül.

## Nem kerül módosításra

- Pricing kártyák `Get a quote / Start your project` gombjai (már most is `/quote/{slug}` útvonalra navigálnak).
- App.tsx route definíciói (mindkét útvonal már létezik).
- Quote oldal logikája — már képes a "nincs csomag" esetre.

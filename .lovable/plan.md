## Probléma

A mobil hamburger menü háttere átlátszó — látszódik mögötte az oldal tartalma.

## Diagnózis

A `src/components/Nav.tsx`-ben a mobil overlay háttere:
```ts
background: "color-mix(in srgb, var(--bg) 98.5%, transparent)"
```
Ez 1.5% átlátszóságot enged át, ráadásul a felette lévő `Hero` és más szekciók animált elemei átsejlenek.

## Megoldás

`src/components/Nav.tsx` mobil overlay `style.background` érték:
- Régi: `"color-mix(in srgb, var(--bg) 98.5%, transparent)"`
- Új: `"var(--bg)"` (teljesen opak)

Egy sornyi módosítás. Vizuális dizájn egyébként változatlan.

## Hatás

A menü háttere teljesen átlátszatlan lesz, az alatta lévő tartalom nem zavar.

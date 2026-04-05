# Strat*egica* — Brand Guidelines
**v1.0 — 2025**

---

## Identità del brand

Strategica è una società di consulenza strategica che aiuta PMI e startup a costruire il loro sistema operativo aziendale. Il brand riflette due tensioni coesistenti: la solidità della tradizione e la chiarezza del pensiero moderno.

Ogni elemento visivo — dalla tipografia ai colori alle annotazioni a mano — nasce da questa dualità.

---

## 01. Tipografia

### Font

| Campione | Font | Peso | Uso |
|---|---|---|---|
| Il problema reale | Cormorant Garamond | Light 300 | Titoli, headlines |
| *è più in profondità.* | Cormorant Garamond | Light 300 Italic | Enfasi, `<em>`, citazioni |
| Strategica | Cormorant Garamond | Regular 400 | Logo, sottotitoli |
| APPROCCIO | DM Sans | Regular 400 | Label, UI, nav, tag |
| *Costruiamo sistemi* | Caveat | Regular 400 | Note a mano, attributi, tono informale |

### Scala tipografica

| Elemento | Dimensione | Note |
|---|---|---|
| Hero headline | 44–76px / `clamp` | Cormorant Garamond Light, `letter-spacing: -0.015em` |
| H2 — titoli sezione | 34–52px / `clamp` | Cormorant Garamond Light, `line-height: 1.1` |
| H3 — titoli card | 22px | Cormorant Garamond Regular |
| Body principale | 17–18px | Cormorant Garamond Light, `line-height: 1.7` |
| Body secondario | 15–16px | Cormorant Garamond Light, `line-height: 1.65–1.75` |
| Label / UI | 10–11px | DM Sans Regular, `letter-spacing: 0.12–0.2em`, uppercase |
| Tag | 9px | DM Sans Regular, `letter-spacing: 0.12em`, uppercase |
| Annotazioni | 14–17px | Caveat Regular, spesso ruotato `-1°` / `-2°` |

### Regole tipografiche

- Il corsivo non è decorativo — segna sempre un'enfasi concettuale
- I titoli usano `font-weight: 300` (light), non bold
- La parte `em` del logo è sempre italic + terracotta
- Caveat è riservato a contesti informali: attributi, note, tagline

---

## 02. Palette colori

### Primari

| Swatch | Nome | Hex | Uso |
|---|---|---|---|
| ⬛ | Ink | `#1C1814` | Testo principale, sfondi scuri, bottoni primari |
| 🟫 | Terracotta | `#C4622A` | Accento primario — emphasis, hover, iterazioni attive |
| 🟨 | Warm White | `#F8F5F0` | Sfondo principale — pagina, hero, sezioni chiare |
| 🟧 | Cream | `#F2EDE4` | Sfondo secondario — card hover, sezioni alternate |

### Secondari

| Swatch | Nome | Hex | Uso |
|---|---|---|---|
| 🟡 | Gold | `#A8843A` | Accento caldo — annotazioni gold, elementi decorativi |
| ⬜ | Rule | `#D4C8B4` | Bordi, linee divisorie, numeri in filigrana |
| ⬜ | Rule Light | `#E4DAC8` | Bordi sottili, separatori molto leggeri |
| 🟤 | Ink Soft | `#5A5048` | Testo secondario, label, descrizioni |

### Accenti disruptive

| Swatch | Nome | Hex | Uso |
|---|---|---|---|
| 🟢 | Lime | `#A8E63D` | Sottolineature e cerchi SVG — contrasto pop sulla palette calda |
| 🟠 | Coral | `#FF6B4A` | Sottolineatura alternativa — riservata alla CTA finale |
| 🟡 | Annotation Gold | `#E8C547` | Sottolineatura su sfondi crema |

### Sfondi scuri

| Nome | Hex | Uso |
|---|---|---|
| Dark BG | `#1C1814` | Sezioni dark — problema, perché noi, footer |
| Orange Section | `#C4622A` | Band target — unico uso del terracotta come background |

---

## 03. Sistema ombre

Le ombre usano una tinta calda (non grigia) per restare in armonia con la palette.  
Base cromatica: `rgba(60, 40, 20, x)`

| Variabile | Valore CSS | Uso |
|---|---|---|
| `--shadow-xs` | `0 1px 3px rgba(60,40,20,.07)` | Blockquote, elementi di sfondo |
| `--shadow-sm` | `0 2px 8px rgba(60,40,20,.09), 0 1px 2px rgba(60,40,20,.06)` | Card a riposo, bottoni |
| `--shadow-md` | `0 4px 16px rgba(60,40,20,.11), 0 2px 4px rgba(60,40,20,.07)` | Step grid, nav |
| `--shadow-lg` | `0 8px 32px rgba(60,40,20,.13), 0 2px 8px rgba(60,40,20,.08)` | Quote card hero |
| `--shadow-card-hover` | `0 12px 40px rgba(60,40,20,.15), 0 4px 12px rgba(60,40,20,.09)` | Card al hover |

---

## 04. Bordi e border-radius

| Elemento | Valore | Note |
|---|---|---|
| Bottoni | `border-radius: 6px` | Arrotondamento moderno-raffinato, non pill |
| Card servizi | `border-radius: 4px` | Leggero, quasi flat |
| Quote card | `border-radius: 4px` | — |
| Step grid | `border-radius: 4px` | Sul contenitore, con `overflow: hidden` |
| Tag | `border-radius: 3px` | — |
| Blockquote | `border-radius: 0 4px 4px 0` | Solo lato destro |
| Colore bordi | `#D4C8B4` / `#E4DAC8` | `--rule` oppure `--rule-light` |
| Spessore bordi | `1px` | Mai più spesso, salvo accento terracotta a `3px` |

---

## 05. Spaziatura

Il sistema usa multipli di 8px. Regola generale: le sezioni respirano, i componenti interni sono compatti.

| Elemento | Valore |
|---|---|
| Padding sezione | `80px` top/bottom |
| Padding orizzontale | `64–72px` left/right |
| Gap colonne (2-col layout) | `64px` |
| Gap card grid (3-col) | `16px` |
| Altezza nav | `64px` |
| Padding interno card | `36px` top/bottom, `32px` left/right |
| Padding interno step card | `32px` top/bottom, `24px` left/right |

---

## 06. Annotazioni a mano

Le annotazioni SVG sono l'elemento disruptive del brand. Sottolineature irregolari e cerchi/ovali disegnati a mano appaiono su parole chiave selezionate — **una per sezione** — con un'animazione di disegno progressivo al scroll.

### Tipi

**Sottolineatura** — SVG `<path>` irregolare sotto la parola:
```svg
<path d="M2 9 C18 5, 38 12, 58 8 C78 4, 98 11, 118 7"
      stroke-width="2.5" stroke-linecap="round" fill="none"/>
```

**Cerchio/ovale** — SVG `<ellipse>` ruotata di -1°/-2°:
```svg
<ellipse cx="100" cy="25" rx="96" ry="21"
         stroke-width="2.2" stroke-linecap="round" fill="none"
         transform="rotate(-1 100 25)"/>
```

### Specifiche tecniche

| Parametro | Valore |
|---|---|
| Colore principale | `#A8E63D` (lime) |
| Colore su sfondo crema | `#E8C547` (gold) |
| Colore CTA | `#FF6B4A` (coral) |
| Stroke width sottolineatura | `2.5px` |
| Stroke width cerchio | `2.2px` |
| Animazione | `stroke-dasharray: 500; stroke-dashoffset: 500 → 0` |
| Durata | `0.75s cubic-bezier(0.4, 0, 0.2, 1)` |
| Trigger | `IntersectionObserver` threshold `0.6` + delay `300ms` |
| Intensità | Moderata — una annotazione per sezione, mai sovrapposte |

### Dove vengono usate (v1.0)

| Sezione | Parola/frase | Tipo | Colore |
|---|---|---|---|
| Hero | *profondità* | sottolineatura | lime |
| Problema | *la punta dell'iceberg* | cerchio | lime |
| Approccio | *sistema operativo* | sottolineatura | gold |
| Servizi | *ha più senso per te* | sottolineatura | lime |
| Perché noi | *consulenza etica* | cerchio | lime |
| CTA | *da fuori* | sottolineatura | coral |

---

## 07. Tono e voce

### Principi

| | |
|---|---|
| **Sì** | Diretto, onesto, specifico, leggermente ironico |
| **No** | Gergo da consulente, promesse vaghe, superlativi vuoti |
| **Tono** | Come un collega esperto che parla chiaro — non un venditore |

### Regole editoriali

- **Lunghezza frase** — Breve nel titolo, più ricca nel corpo. Mai più di 3 righe per paragrafo
- **Corsivo** — Usato per l'enfasi concettuale, non decorativa
- **Caveat (scritto a mano)** — Riservato a note, attributi, commenti: è la voce umana e informale del brand
- **Numeri romani (I. II. III.)** — Usati come icone delle card servizi al posto di immagini
- **Em dash ( — )** — Preferito alla virgola per le pause forti nel testo

### Il logo in parole

```
Strat   →  tondo, nero, fermo       (strategia, solidità)
egica   →  corsivo, terracotta      (movimento, creatività)
```

La spezzatura della parola non è un errore tipografico — è il concept del brand.

---

*Strategica — Brand Guidelines v1.0*

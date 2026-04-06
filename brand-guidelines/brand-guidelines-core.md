# Strat*egica* — Brand Guidelines
**v1.1 — 2025**

---

## 01. Tipografia

### Font

| Font | Peso | Uso |
|---|---|---|
| Cormorant Garamond | Light 300 | Titoli, headlines, body principale |
| Cormorant Garamond Italic | Light 300 Italic | Enfasi concettuale, `<em>`, citazioni |
| Cormorant Garamond | Regular 400 | Logo, sottotitoli, titoli card |
| DM Sans | Regular 400 | Label, UI, nav, tag, bottoni |
| Caveat | Regular 400 | Note a mano, attributi, tagline, tono informale |

### Scala tipografica

| Elemento | Dimensione | Note |
|---|---|---|
| Hero headline | `clamp(62px, 7vw, 108px)` | Light 300, `letter-spacing: -0.022em`, `line-height: 0.98` |
| H2 — titoli sezione | `clamp(44px, 5vw, 74px)` | Light 300, `line-height: 1.04`, `letter-spacing: -0.015em` |
| H2 — CTA | `clamp(48px, 5.8vw, 88px)` | Light 300, `line-height: 0.98`, `letter-spacing: -0.022em` |
| H3 — titoli card | 24px | Regular 400 |
| Body principale | 19–20px | Light 300, `line-height: 1.72–1.75` |
| Body sezioni dark | 18px | Light 300, `line-height: 1.8` |
| Body card / secondario | 15–17px | Light 300, `line-height: 1.72–1.78` |
| Target band | `clamp(26px, 3.2vw, 46px)` | Light 300, `line-height: 1.42` |
| Label / UI | 10–11px | DM Sans, `letter-spacing: 0.16–0.22em`, uppercase |
| Tag | 9px | DM Sans, `letter-spacing: 0.12em`, uppercase |
| Annotazioni Caveat | 17–20px | Caveat, spesso ruotato `-1°` / `-2°` |
| Quote card body | 21px | Cormorant Italic 300, `line-height: 1.65` |
| Quote card attr | 17px | Caveat, terracotta |

### Regole

- Il corsivo non è decorativo — segna sempre un'enfasi concettuale
- I titoli usano `font-weight: 300` (light), mai bold
- La parte `egica` del logo è sempre italic + terracotta
- Caveat è riservato a contesti informali: attributi, note, tagline
- DM Sans non appare mai nei titoli o nel corpo del testo

---

## 02. Palette colori

### Primari

| Nome | Hex | Uso |
|---|---|---|
| Ink | `#1C1814` | Testo principale, sfondi dark, bottoni primari |
| Terracotta | `#C4622A` | Accento primario — emphasis, hover, CTA, parti del logo |
| Warm White | `#F8F5F0` | Sfondo principale — pagina, hero, sezioni chiare |
| Cream | `#F2EDE4` | Sfondo secondario — card hover, sezioni alternate |

### Secondari

| Nome | Hex | Uso |
|---|---|---|
| Gold | `#A8843A` | Accento caldo — annotazioni su sfondo crema |
| Rule | `#D4C8B4` | Bordi, linee divisorie, numeri in filigrana |
| Rule Light | `#E4DAC8` | Bordi sottili, separatori leggeri |
| Ink Soft | `#5A5048` | Testo secondario, label, descrizioni |

### Accenti disruptive

| Nome | Hex | Uso |
|---|---|---|
| Lime | `#A8E63D` | Sottolineature e cerchi SVG — uso principale |
| Coral | `#FF6B4A` | Sottolineatura alternativa — riservata alla CTA |
| Annotation Gold | `#E8C547` | Sottolineatura su sfondi crema chiara |

### Sfondi scuri

| Nome | Hex | Uso |
|---|---|---|
| Dark BG | `#1C1814` | Sezioni dark — problema, perché noi, footer |
| Orange Section | `#C4622A` | Band target — unico uso del terracotta come background |

### Regole

- Le ombre usano tinta calda, non grigia: base `rgba(60, 40, 20, x)`
- Il lime non appare mai nel testo — solo nelle annotazioni SVG
- Il terracotta come background è usato una volta sola (band target)
- Su sfondo scuro, il testo corpo usa `rgba(242,237,228,0.65)` — mai bianco puro

---

## 03. Ombre

Le ombre usano sempre base calda `rgba(60,40,20,x)` — mai grigie o fredde. Sistema a 4 livelli:

| Token | Uso |
|---|---|
| `--d1` | Elementi UI leggeri — nav CTA, tag, bottoni ghost |
| `--d2` | Card standard, bottoni primari |
| `--d3` | Card in evidenza, quote card, step-card hover |
| `--d4` | Card on hover con elevazione massima |

---

## 04. Layout e spaziatura

- **Multipli di 8px** — padding, gap, margini
- **Sezioni**: padding verticale `80–104px`
- **Container**: padding orizzontale `80px` desktop, `24px` mobile
- **Border-radius**: `4–6px` — mai pill, mai > 8px su card e bottoni
- **Grid**: layout a 2 colonne per sezioni bicolonna, bento asimmetrico (1.6fr 1fr 1fr) per step

---

## 05. Componenti card

### Step card (bento approach)
- Background: `rgba(255,253,250,0.97)` — quasi bianco su sfondo cream
- Border: `1px solid rgba(196,98,42,0.12)` — terracotta sottile
- Hover: `background: #fff` + 3D perspective tilt (`rotateX(-1.5deg) rotateY(1deg) translateZ(10px)`)
- Accent hover: `::after` barra terracotta bottom, scaleX da 0 a 1

### Service card
- Background: `rgba(255,253,250,0.96)` su sezione warm white
- Border: `1px solid rgba(196,98,42,0.13)`
- Hover: perspective tilt + `--d4` shadow
- Icon: numero romano in Cormorant Italic (I. II. III.) con oval SVG a mano che si disegna allo scroll
- Subtitle: Caveat, terracotta

### Quote card (hero)
- Background: `rgba(248,245,240,0.86)` + `backdrop-filter: blur(20px)`
- Rotazione permanente: `-1.8deg` + parallax 3D al mousemove
- Bordo SVG irregolare (path hand-drawn) sovrapposto
- Filtro `feTurbulence` per spigoli leggermente ruvidi

---

## 06. Annotazioni a mano

Le annotazioni SVG sono l'elemento disruptive del brand. Sottolineature irregolari e cerchi/ovali disegnati a mano appaiono su parole chiave selezionate — **una per sezione** — con un'animazione di disegno progressivo al scroll.

### Tipi

**Sottolineatura** — `<path>` irregolare sotto la parola:
```svg
<path d="M2 9 C18 5, 38 12, 58 8 C78 4, 98 11, 118 7"
      stroke-width="2.5" stroke-linecap="round" fill="none"/>
```

**Cerchio/ovale** — `<ellipse>` ruotata di -1°/-2°:
```svg
<ellipse cx="100" cy="25" rx="96" ry="21"
         stroke-width="2.2" stroke-linecap="round" fill="none"
         transform="rotate(-1 100 25)"/>
```

### Specifiche

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

### Regole

- **Una sola annotazione per sezione** — mai due sulla stessa schermata
- Non si usano mai su testo body, solo su titoli o frasi chiave nei `<h1>` / `<h2>`
- Il cerchio/ovale si usa su frasi brevi (2–4 parole), la sottolineatura su frasi più lunghe
- Le annotazioni non si sovrappongono a elementi interattivi (bottoni, link)
- L'irregolarità è intenzionale — path e ellipse non devono essere geometricamente perfetti

---

## 07. Divisori di sezione — Wavy dividers

Le transizioni tra sezioni usano un divisore SVG a onda irregolare. L'onda non è geometricamente perfetta — le curve Bézier hanno tensioni asimmetriche intenzionali.

### Specifiche

| Parametro | Valore |
|---|---|
| ViewBox height | `44–52px` a seconda della sezion |
| `preserveAspectRatio` | `none` — si allunga a tutta larghezza |
| Fill | Colore della sezione di destinazione |
| Stroke decorativo | `rgba(196,98,42,0.12)` opzionale lungo il crinale |
| Stacking | `margin-bottom: -2px` per eliminare gap tra sezione e divider |

### Transizioni colore

| Da | A | Fill divider |
|---|---|---|
| Warm White | Dark | `#1C1814` |
| Dark | Cream | `#F2EDE4` |
| Cream | Warm White | `#F8F5F0` |
| Warm White | Terracotta | `#C4622A` |
| Terracotta | Dark | `#1C1814` |
| Dark | Warm White | `#F8F5F0` |

### Regole
- Ogni transizione di sfondo tra sezioni usa un wavy divider
- Il divider appartiene alla sezione superiore (background = colore sezione sopra, fill = colore sezione sotto)
- Non si usano due onde identiche consecutive — variare i punti di controllo

---

## 08. Elementi geometrici organici

Il brand usa forme organiche per rompere la rigidità del layout a grid.

### Tipologie

**Oval hand-drawn** — dietro gli icon dei service card:
```svg
<path d="M50 8 C72 6, 90 18, 92 38 C94 58, 76 72, 50 74 C24 76, 6 62, 6 42 C6 22, 26 10, 50 8Z"
  stroke="rgba(196,98,42,0.3)" stroke-width="1.5" stroke-linecap="round" fill="none"/>
```
Animato con `stroke-dashoffset` allo scroll (IntersectionObserver threshold 0.4).

**Spiral / swirl decorativo** — nelle celle decorative del bento:
```svg
<path d="M105 30 C130 28, 148 42, 148 62 C148 82, 130 95, 108 92 C90 90, 78 78, 82 62 ..."
  stroke="rgba(196,98,42,0.18)" stroke-width="2" stroke-linecap="round" fill="none"/>
```

**SVG border irregolare** — sulla quote card hero:
```svg
<path d="M8 4 C80 1, 200 3, 320 2 ... Z"
  stroke="rgba(212,200,180,0.65)" stroke-width="1.5" fill="none"/>
```

**Testo filigrana** — numeri o lettere `feTurbulence`-proof in Cormorant Italic, `color: transparent`, `-webkit-text-stroke: 1px rgba(...)`.

### Regole
- Le forme organiche non devono mai essere perfettamente simmetriche
- Un solo elemento organico prominente per sezione — non sovraffollare
- Il roughen filter (`feTurbulence` + `feDisplacementMap`) si usa solo sulla quote card — non su card ripetute

---

## 09. Tono e voce

### Principi

| | |
|---|---|
| **Sì** | Diretto, onesto, specifico, leggermente ironico |
| **No** | Gergo da consulente, promesse vaghe, superlativi vuoti |
| **Tono** | Come un collega esperto che parla chiaro — non un venditore |

### Regole editoriali

- **Titolo** — breve, massimo una riga. Spesso una tensione o una provocazione
- **Body** — mai più di 3 righe per paragrafo. Frasi brevi alternate a frasi più lunghe
- **Corsivo tipografico** — usato per l'enfasi concettuale, non decorativa. Mai più di una parola o frase per titolo
- **Caveat** — riservato a note, attributi, commenti sottolineati: è la voce umana e informale
- **Em dash ( — )** — preferito alla virgola per le pause forti
- **Numeri romani (I. II. III.)** — usati come elementi visivi al posto di icone o immagini

### Il logo

```
Strat   →  tondo, nero, fermo       (strategia, solidità)
egica   →  corsivo, terracotta      (movimento, creatività)
```

La spezzatura non è un errore tipografico — è il concept del brand: due nature in una parola.

---

*Strategica — Brand Guidelines v1.0*

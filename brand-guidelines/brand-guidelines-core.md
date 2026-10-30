# Strat*egica* — Brand Guidelines
**v2.0 — 2026**

---

## 01. Tipografia

### Font

| Font | Peso | Uso |
|---|---|---|
| Cormorant Garamond | Light 300 | Titoli e frasi grandi, sempre da 26px in su |
| Cormorant Garamond Italic | Light 300 Italic | Enfasi concettuale, `<em>`, citazioni |
| Cormorant Garamond | Regular 400 | Logo |
| DM Sans | Regular 400 | Testo corrente, label, UI, nav, bottoni |
| Caveat | Regular 400 | Note a mano, tono informale, sempre da 20px in su |

### Scala tipografica (token in `global.css`)

| Token | Dimensione | Uso |
|---|---|---|
| `--t-display` | `clamp(44px, min(18vw, 23svh), 240px)` | Hero, CTA finale |
| `--t-h1` | `clamp(44px, 8vw, 128px)` | Titoli di pagina e di capitolo |
| `--t-h2` | `clamp(40px, 5.8vw, 96px)` | Titoli di sezione, frasi manifesto |
| `--t-h3` | `clamp(26px, 2.8vw, 44px)` | Sottotitoli |
| `--t-lead` | `clamp(19px, 1.5vw, 22px)` | Testo introduttivo, DM Sans |
| `--t-body` | 17px | Testo corrente, DM Sans |
| `--t-small` / `--t-meta` | 14px / 13px | UI, folio, didascalie, senza maiuscolo |

### Regole

- Il corsivo non è decorativo: segna sempre un'enfasi concettuale
- I titoli usano `font-weight: 300`, `letter-spacing` negativo, mai bold
- La parte `egica` del logo è sempre italic + terracotta
- DM Sans non appare mai nei titoli
- Niente maiuscoletto spaziato: le label sono in minuscolo a 13px

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
| Dark BG | `#1C1814` | Sezioni dark: hero, problema, perché noi, footer |
| Orange Section | `#C4622A` | Band target — unico uso del terracotta come background |

### Regole

- Le ombre usano tinta calda, non grigia: base `rgba(60, 40, 20, x)`
- Il lime non appare mai nel testo — solo nelle annotazioni SVG
- Il terracotta come background è usato una volta sola (band target)
- Su sfondo scuro, il testo corpo usa `rgba(242,237,228,0.65)` — mai bianco puro

---

## 03. Superfici

Fondi piatti con grana carta impercettibile. Nessuna ombra, nessun gradiente: la profondità viene da contrasto di colore e scala tipografica.

---

## 04. Layout e spaziatura

- **Griglia a 12 colonne**: `--gutter`, `--col-gap`, contenuto massimo 1680px
- **Sezioni**: padding verticale `--sec-y`, `clamp(64px, 8vw, 128px)`
- **Folio**: ogni sezione si apre con hairline e numero progressivo automatico
- **Asimmetria**: si ottiene spostando i blocchi sulle colonne, mai ruotandoli
- **Border-radius**: 4px, mai pill

---

## 05. Tavole e componenti

**Tavola tecnica**: la firma visiva del brand. Figura numerata (Tav. 01, Tav. 02...) con cornice hairline e didascalia sotto. Spiega un concetto, non decora.

**Righe, non card**: servizi, valori, FAQ e articoli sono righe separate da hairline.

**Biglietto**: l'offerta In-formazione, unico oggetto "fisico" del sito.

---

## 06. Annotazioni a mano

Le annotazioni SVG sono l'elemento disruptive del brand. Sottolineature irregolari e cerchi/ovali disegnati a mano appaiono su parole chiave selezionate, **3-4 per pagina al massimo**, con un'animazione di disegno progressivo al scroll.

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

- **Mai due annotazioni sulla stessa schermata**, e non su ogni sezione
- Non si usano mai su testo body, solo su titoli o frasi chiave nei `<h1>` / `<h2>`
- Il cerchio/ovale si usa su frasi brevi (2–4 parole), la sottolineatura su frasi più lunghe
- Le annotazioni non si sovrappongono a elementi interattivi (bottoni, link)
- L'irregolarità è intenzionale — path e ellipse non devono essere geometricamente perfetti

---

## 07. Passaggi tra sezioni

Taglio netto di colore, senza onde né divisori decorativi. Sequenza tipo: Ink → Warm → Ink → Warm → Cream → Warm → Terracotta → Ink.

---

## 08. Elementi organici

La mano resta nelle annotazioni SVG e nelle note in Caveat. Niente filigrane o filtri di disturbo sul testo.

**Illustrazione caos → ordine**: un groviglio di linee sottili che si ordina in un fascio, con una sola linea terracotta. Ogni pagina e articolo ha la sua variante, generata dal proprio nome.

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
- **Trattino lungo ( — ):** da evitare nel copy. Usa punto, virgola o due punti. È un marcatore tipico dei testi generati da LLM (vedi Vademecum Anti-AI-Slop nei template)
- **Numeri romani (I. II. III.)**: usati come elementi visivi al posto di icone o immagini

### Il logo

```
Strat   →  tondo, nero, fermo       (strategia, solidità)
egica   →  corsivo, terracotta      (movimento, creatività)
```

La spezzatura non è un errore tipografico — è il concept del brand: due nature in una parola.

---

*Strategica — Brand Guidelines v2.0*

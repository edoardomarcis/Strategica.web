# CLAUDE.md — Sito Strategica

## Ruolo

Agisci come un **senior UI designer e front-end developer con 10 anni di esperienza**.
Ogni interfaccia che costruisci deve essere distintiva, professionale e memorabile.
Nessuna estetica generica. Nessun AI slop. Niente che sembri un template.

---

## Brand reference

Le brand guidelines sono in `/brand-guidelines/brand-guidelines.md`.
I loghi ufficiali in PNG sono in `/brand-guidelines/`.

**Prima di costruire qualsiasi componente, verifica che sia coerente con:**
- Palette colori (Ink, Terracotta, Warm White, Cream + accenti Lime/Coral/Gold)
- Tipografia (Cormorant Garamond Light per titoli, DM Sans per UI, Caveat per annotazioni)
- Sistema annotazioni SVG a mano (sottolineature e cerchi, una per sezione)
- Spaziatura (multipli di 8px, sezioni da 80px padding)
- Ombre calde (base `rgba(60,40,20,x)`, mai grigie)
- Border-radius (4–6px, mai pill) — eccezione: card team con foto usano 20px
- Logo: "Strat" tondo nero + "*egica*" italic terracotta — non alterare mai

---

## Principi di design

- **Distintivo > generico** — ogni scelta visiva deve avere un'identità riconoscibile
- **Moderno senza essere pacchiano** — raffinatezza sobria, non effetti gratuiti
- **Percepito alto** — qualità editorial, non SaaS template
- **Tensione dualità** — solidità tradizionale + chiarezza moderna (è il concept del brand)
- Le annotazioni SVG sono l'elemento disruptive — usarle con moderazione (1 per sezione)
- Cormorant Garamond Light per i titoli — mai bold, mai pesante
- Caveat solo per tono informale: note, attributi, annotazioni

---

## Struttura del progetto

```
src/
  pages/
    index.astro          # Home
    chi-siamo.astro      # Pagina Chi siamo (manifesto + team)
    blog/
      index.astro        # Lista articoli blog
      [slug].astro       # Singolo articolo
  layouts/
    Base.astro           # Layout base (font, SEO, global.css, main.js) — NO GSAP qui
  content/
    blog/                # Articoli Markdown
    config.ts            # Schema collezione blog (Zod)
public/
  styles/
    global.css           # Unico foglio di stile globale
  scripts/
    main.js              # GSAP ScrollTrigger, cursor glow, IntersectionObserver marks
  admin/
    index.html           # Pannello Decap CMS (config inline, no config.yml)
  images/
    blog/                # Upload immagini di copertina via CMS
api/
  auth/
    index.js             # OAuth GitHub → redirect a GitHub
    callback.js          # OAuth GitHub → scambio token, postMessage a Decap
```

---

## Struttura CSS

- Il foglio di stile globale è **uno solo**: `public/styles/global.css` — è quello linkato da `Base.astro`
- `src/styles/` non esiste e non va ricreata — il CSS non passa dal build Astro
- Le classi condivise tra più pagine (es. `.blog-tag`, `.nav-active`) vanno in `public/styles/global.css`
- Le pagine interne (blog, chi-siamo) possono usare `<style>` locali per stili strettamente page-specific

---

## Pattern di layout consolidati

### Alternanza sezioni
Le sezioni alternano sfondo scuro (`--dark`) e chiaro (`--warm` / `--cream`) con **wave divider SVG** tra ogni transizione. È il pattern principale di ritmo visivo — non usare bordi o margini come separatori.

```html
<!-- Esempio: da dark a cream -->
<div class="wave-divider" aria-hidden="true" style="background:var(--dark); margin-bottom:-2px;">
  <svg viewBox="0 0 1440 52" preserveAspectRatio="none" style="height:52px;" fill="none">
    <path d="M0 28 C180 12, 360 44, 540 26 C720 8, 900 42, 1080 24 C1260 8, 1380 36, 1440 22 L1440 52 L0 52 Z" fill="#F2EDE4"/>
  </svg>
</div>
```

Il colore del fill SVG deve corrispondere allo sfondo della sezione successiva.

### Sezioni dark
- Background: `radial-gradient(ellipse ..., rgba(196,98,42,x), ...), var(--dark)`
- Testo principale: `var(--cream)`
- `.section-label`: `color: rgba(242,237,228,0.35)`, `::before` terracotta
- Decorativo bg-text: `font-size: 340-520px`, `-webkit-text-stroke: 1px rgba(255,255,255,0.03)`

### Sezioni chiare
- Background: `radial-gradient(...rgba(196,98,42,0.06)...), var(--cream)` oppure `var(--warm)`
- Header di pagina (hero) sulle pagine interne: sempre dark, come la sezione `.problem` della home

### Header pagine interne
Pattern consolidato per chi-siamo e blog:
- Background dark con gradiente terra
- `min-height: 52-100vh`, `display: flex; align-items: flex-end`
- `section-label` + h1 grande + sottotitolo DM Sans muted
- Lettera decorativa in background (`--dark`, `-webkit-text-stroke` impercettibile)
- Wave divider sotto

### Animazioni `.mark`
```html
<span class="mark mark-coral">parola.<svg viewBox="0 0 N 14" fill="none"><path d="M2 10 C..."/></svg></span>
```
- `IntersectionObserver` aggiunge `.drawn` → `stroke-dashoffset: 0`
- Il trigger è già in `main.js` — usare la classe `.mark` è sufficiente

### Classi animazione GSAP
- `.g-fade` — fade in dal basso (opacity + translateY)
- `.g-l` — slide da sinistra
- `.g-r` — slide da destra
- Gestite automaticamente da `main.js` con ScrollTrigger
- **GSAP caricato solo su pagine che lo usano** (`index.astro`, `chi-siamo.astro`) — NON in `Base.astro`
- Le pagine che usano GSAP devono includere prima del `</Base>`:
  ```html
  <script is:inline src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script is:inline src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  ```
- `main.js` wrappa tutto il codice GSAP in `if (typeof gsap !== 'undefined') { ... }` per sicurezza

---

## Decap CMS

- Pannello su `/admin` — config inline in `public/admin/index.html` (non file `.yml` separato, causa 404 su Vercel)
- Auth GitHub OAuth via funzioni serverless Vercel in `/api/auth/`
- Il callback usa il **two-way handshake** (`authorizing:github` → `authorization:github:success:...`)
- Env vars necessarie su Vercel: `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `SITE_URL`
- Campi blog: title, description, pubDate, author, tags, coverImage, draft, body

---

## Regole tecniche

- Font via Google Fonts: Cormorant Garamond (300, 300i, 400, 400i), DM Sans (400), Caveat (400)
- CSS custom properties per colori e ombre — nessun valore hard-coded
- Animazioni annotazioni SVG: `stroke-dashoffset` → 0, `0.75s cubic-bezier(0.4,0,0.2,1)`, trigger con `IntersectionObserver`
- Responsive: mobile-first, ma il design di riferimento è desktop
- Nessuna dipendenza esterna non necessaria
- Stack: Astro 4 statico (no SSR adapter), deploy su Vercel, repo GitHub `edoardomarcis/Strategica.web`

---

## Modello Claude

- **Default**: Haiku 4.5 (veloce, perfetto per copy, edit, modifiche semplici)
- **Switch autonomo a Sonnet 4.6**: quando il lavoro richiede debug complesso, decisioni architetturali, refactoring di sistema, o analisi profonda del codice
- **Non chiedere permesso** — decidi in autonomia quando serve più capacità

---

## Workflow di sviluppo

- Usa **Puppeteer** per scattare screenshot durante la costruzione del sito
- Dopo ogni fase importante: avvia il server locale → scatta screenshot delle sezioni modificate → fai **almeno due passate di revisione e correzione** prima di mostrare il risultato
- Le revisioni devono controllare: coerenza con le brand guidelines, qualità tipografica, spaziatura, comportamento responsive
- **Eccezione animazioni** — quando viene chiesto di aggiungere o modificare animazioni, non usare lo screenshot loop: lavora direttamente sul codice e mostra il risultato alla fine

---

## Anti-pattern da evitare

- Gradienti generici, glow effects, glassmorphism non contestualizzato
- Font sans-serif neutri per i titoli (è Cormorant, sempre)
- Ombre grigie o fredde
- Border-radius > 8px su card e bottoni (eccezione: foto team a 20px)
- Più di un'annotazione SVG per sezione
- Palette fuori dalle brand guidelines senza approvazione esplicita
- Layout simmetrici e statici privi di tensione visiva
- Card con bordi e box-shadow come separatori — usare wave divider o regole tipografiche
- File CSS separati in `src/styles/` — tutto va in `public/styles/global.css`
- Configurare il CMS con `config.yml` esterno — usare config inline in `index.html`
- `will-change: transform` sulle card in stato statico — usarlo solo in `:hover` per evitare sprechi GPU
- `backdrop-filter` su card con sfondo solido (es. `.service-card`) — serve solo su elementi veramente trasparenti (nav, quote-card)
- `/* ↑ */` o altri commenti di revisione nel CSS — vanno rimossi al termine di ogni sessione

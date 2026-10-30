# CLAUDE.md — Sito Strategica

## Ruolo

Agisci come un **senior UI designer e front-end developer con 10 anni di esperienza**.
Ogni interfaccia che costruisci deve essere distintiva, professionale e memorabile.
Nessuna estetica generica. Nessun AI slop. Niente che sembri un template.

---

## Brand reference

Le brand guidelines sono in `/brand-guidelines/brand-guidelines-core.md`.
I loghi ufficiali in PNG sono in `/brand-guidelines/`.

**Prima di costruire qualsiasi componente, verifica che sia coerente con:**
- Palette colori (Ink, Terracotta, Warm White, Cream + accenti Lime/Coral/Gold)
- Tipografia (Cormorant Garamond Light da 26px in su, DM Sans per testo e UI, Caveat per note)
- Sistema annotazioni SVG a mano (sottolineature e cerchi, 3-4 per pagina al massimo)
- Griglia a 12 colonne e spaziatura a token (`--gutter`, `--col-gap`, `--sec-y`)
- Ombre calde (base `rgba(60,40,20,x)`, mai grigie)
- Border-radius 4px, mai pill
- Logo: "Strat" tondo nero + "*egica*" italic terracotta — non alterare mai

---

## Principi di design

- **Distintivo > generico** — ogni scelta visiva deve avere un'identità riconoscibile
- **Moderno senza essere pacchiano** — raffinatezza sobria, non effetti gratuiti
- **Percepito alto** — qualità editorial, non SaaS template
- **Tensione dualità** — solidità tradizionale + chiarezza moderna (è il concept del brand)
- Le annotazioni SVG sono l'elemento disruptive — rare: 3-4 per pagina, mai due nella stessa schermata
- Cormorant Garamond Light per i titoli — mai bold, mai sotto i 26px
- **Tavole tecniche numerate** (Tav. 01 iceberg, Tav. 02 cascata): sono la firma visiva, nuove figure seguono lo stesso formato
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
    Base.astro           # Layout base (font, SEO, global.css, main.js, nav, footer)
  content/
    blog/                # Articoli Markdown
    config.ts            # Schema collezione blog (Zod)
public/
  styles/
    global.css           # Unico foglio di stile globale
  scripts/
    main.js              # Hamburger, IntersectionObserver per annotazioni e tavole
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

## Pattern di layout consolidati (v2)

### Sezione tipo
```html
<section class="sec t-ink">
  <div class="section-label"><span style="grid-column: 2 / span 8;">Il vero problema</span></div>
  <div class="grid">...</div>
</section>
```
- **Temi**: `.t-warm`, `.t-cream`, `.t-ink`, `.t-terra` impostano `--bg --fg --fg2 --line --accent`. I componenti leggono solo queste variabili: niente override per sezione scura.
- **Separazione**: taglio netto di colore e hairline. Niente wave divider, card con ombra o gradienti di sfondo: i fondi sono piatti con la grana carta.
- **`.section-label`** è il folio: il numero è un contatore CSS automatico, non va scritto a mano.
- **`.grid`** è la griglia a 12 colonne. Asimmetria spostando i blocchi sulle colonne, mai ruotandoli.
- **Footer** e nav vivono in `Base.astro`: le pagine non li ripetono.

### Header pagine interne
`<section class="page-hero t-ink">` con folio, `h1` e `.page-hero-sub`.

### Immagini
Niente foto stock. `LinePlate.astro` genera dallo `seed` una variante stabile dell'illustrazione caos → ordine (hero, copertine blog); `ServicePlate.astro` e `Venn.astro` sono le figure di servizi e metodo. Foto reali, quando disponibili, vanno in `public/images/`.

### Tipografia
Usare i token `--t-display`, `--t-h1`, `--t-h2`, `--t-h3`, `--t-lead`, `--t-body`, `--t-small`, `--t-meta`. Non aggiungere dimensioni nuove senza motivo.

### Annotazioni `.mark`
Componente `Mark.astro`. `IntersectionObserver` in `main.js` aggiunge `.drawn`.

### Animazioni
- **Niente GSAP né altre librerie**: tutto CSS nativo.
- `.g-fade`: comparsa legata allo scroll (`animation-timeline: view()`); senza supporto del browser il contenuto è già visibile. Non metterla su elementi sticky.
- Transizioni tra pagine con `@view-transition`.
- Ogni animazione rispetta `prefers-reduced-motion`.

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

## Pubblicazione articoli

Le bozze vivono in `drafts/` (markdown, anche senza frontmatter completo). Quando viene chiesto di **pubblicare** un articolo, seguire sempre questo workflow:

1. **Frontmatter completo**: title, description 140–160 caratteri con la query target, pubDate odierna, tags coerenti coi cluster (OKR/Governance, Strategia/Crescita, AI/Innovazione), slug breve con la keyword. Niente coverImage se non fornita: la copertina a linee generata dallo slug è automatica.
2. **Link interni bidirezionali** — è la parte obbligatoria:
   - nel nuovo articolo: 2–4 link contestuali agli articoli esistenti correlati + almeno 1 link alla pagina servizio del cluster (`/servizi#in-formazione`, `#strategy-sprint`, `#edu-coaching`);
   - negli articoli esistenti correlati: aggiungere 1 link contestuale verso il nuovo pezzo (aggiornarli davvero, non solo il nuovo).
   - I link vanno nel flusso del testo su anchor descrittive, mai "clicca qui" né blocchi "articoli correlati" appiccicati in fondo.
3. **Spostare** il file da `drafts/` a `src/content/blog/`, build di verifica, commit e push (deploy e sitemap si aggiornano da soli).
4. Non riscrivere il contenuto dell'autore: solo frontmatter, link e refusi evidenti. Modifiche di sostanza vanno proposte, non applicate.
5. **Post LinkedIn di lancio**: dopo la pubblicazione, preparare la bozza del post usando la skill `linkedin-edoardo` (in `.claude/skills/`, solo locale). Il post non si pubblica da solo: è una bozza da consegnare a Edoardo.

Nota: il repo GitHub è **pubblico** — `drafts/` e la skill LinkedIn sono in `.gitignore` apposta (le bozze non devono essere leggibili prima dell'uscita). Non committarle mai.

## SEO

- La sitemap è generata **automaticamente a ogni build** da `@astrojs/sitemap` (pinned a 3.1.6: le versioni successive richiedono Astro 5) — non va mai scritta o aggiornata a mano; nuove pagine e articoli entrano da soli al deploy
- `/admin` è escluso da sitemap (filter in `astro.config.mjs`) e robots.txt
- `public/robots.txt` punta a `https://www.wearestrategica.com/sitemap-index.xml` — se cambia il dominio, aggiornare `site` in `astro.config.mjs`, `SITE` in `Base.astro`/`jsonld.ts` e robots.txt
- OG image di default: `public/og-default.jpg` (1200×630, generata dall'estetica hero) — referenziata da `Base.astro` per tutte le pagine senza immagine propria

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

- Gradienti di sfondo, glow effects, glassmorphism, lettere in filigrana
- Wave divider, elementi ruotati, tilt 3D, effetti che seguono il cursore
- Font sans-serif neutri per i titoli (è Cormorant, sempre)
- Cormorant sotto i 26px, testo in maiuscoletto spaziato
- Ombre grigie o fredde; ombre come separatori
- Border-radius > 4px
- Blockquote o box con bordo sinistro colorato
- Annotazioni SVG su ogni sezione
- Palette fuori dalle brand guidelines senza approvazione esplicita
- Librerie di animazione: prima CSS nativo
- File CSS separati in `src/styles/` — tutto va in `public/styles/global.css`
- Stili del Markdown nei `<style>` di pagina: Astro non li applica a `<Content />`, vanno in `global.css`
- Configurare il CMS con `config.yml` esterno — usare config inline in `index.html`
- `/* ↑ */` o altri commenti di revisione nel CSS — vanno rimossi al termine di ogni sessione

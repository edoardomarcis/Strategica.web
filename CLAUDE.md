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
- Border-radius (4–6px, mai pill)
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

## Struttura CSS

- Il foglio di stile globale è **uno solo**: `public/styles/global.css` — è quello linkato da `Base.astro`
- `src/styles/` non esiste e non va ricreata — il CSS non passa dal build Astro
- Le classi condivise tra più pagine (es. `.blog-tag`) vanno in `public/styles/global.css`, non nelle `<style>` locali delle pagine

---

## Regole tecniche

- Usa i loghi PNG dalla cartella `/brand-guidelines/` — non ricreare il logo via CSS/SVG
- Font via Google Fonts: Cormorant Garamond (300, 300i, 400, 400i), DM Sans (400), Caveat (400)
- CSS custom properties per colori e ombre — nessun valore hard-coded
- Animazioni annotazioni SVG: `stroke-dashoffset` → 0, `0.75s cubic-bezier(0.4,0,0.2,1)`, trigger con `IntersectionObserver`
- Responsive: mobile-first, ma il design di riferimento è desktop
- Nessuna dipendenza esterna non necessaria

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
- Border-radius > 8px su card e bottoni
- Più di un'annotazione SVG per sezione
- Palette fuori dalle brand guidelines senza approvazione esplicita
- Layout simmetrici e statici privi di tensione visiva

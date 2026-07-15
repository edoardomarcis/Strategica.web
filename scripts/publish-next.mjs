#!/usr/bin/env node
// Pubblica gli articoli del calendario editoriale quando arriva la loro data.
// Idempotente: rieseguirlo senza nulla in scadenza non fa nulla (utile per la routine
// schedulata lun/ven, che potrebbe girare anche nei giorni senza pubblicazioni).
//
// Uso: node scripts/publish-next.mjs
// Exit code 0 sempre; stampa "CHANGED" se ha modificato file, "NOTHING_DUE" altrimenti.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const manifestPath = path.join(root, 'scripts', 'publish-manifest.json');
const blogDir = path.join(root, 'src', 'content', 'blog');

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Confronto per data di calendario (non ora), timezone-safe: YYYY-MM-DD di oggi.
const today = new Date().toISOString().slice(0, 10);

let changed = false;
const publishedNow = [];

for (const entry of manifest.entries) {
  if (entry.published) continue;
  if (entry.date > today) continue; // non ancora in scadenza

  const filePath = path.join(blogDir, `${entry.slug}.md`);
  if (!fs.existsSync(filePath)) {
    console.error(`ATTENZIONE: manca il file per lo slug "${entry.slug}" (${filePath})`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  if (/^draft:\s*true\s*$/m.test(content)) {
    content = content.replace(/^draft:\s*true\s*$/m, 'draft: false');
    fs.writeFileSync(filePath, content);
    changed = true;
    console.log(`Pubblicato: ${entry.slug} (${entry.date})`);
  } else {
    console.log(`${entry.slug} era già draft:false, salto il flip`);
  }

  for (const edit of entry.retro_edits || []) {
    const targetPath = path.join(blogDir, `${edit.file}.md`);
    if (!fs.existsSync(targetPath)) {
      console.error(`ATTENZIONE: retro_edit su file inesistente "${edit.file}"`);
      continue;
    }
    let targetContent = fs.readFileSync(targetPath, 'utf8');
    if (targetContent.includes(edit.insert_text)) {
      continue; // già presente, non duplicare
    }
    if (!targetContent.includes(edit.insert_after)) {
      console.error(`ATTENZIONE: marker "${edit.insert_after}" non trovato in ${edit.file}.md`);
      continue;
    }
    targetContent = targetContent.replace(
      edit.insert_after,
      `${edit.insert_after}\n${edit.insert_text}`
    );
    fs.writeFileSync(targetPath, targetContent);
    changed = true;
    console.log(`  Retro-link aggiunto in ${edit.file}.md -> ${edit.insert_text}`);
  }

  entry.published = true;
  publishedNow.push(entry.slug);
}

if (changed) {
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
}

console.log(changed ? 'CHANGED' : 'NOTHING_DUE');
if (publishedNow.length) {
  console.log('PUBLISHED_SLUGS:' + publishedNow.join(','));
}

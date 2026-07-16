#!/usr/bin/env node
// Checklist SEO pre-pubblicazione (da articoli-strategica/00-master-brief.md),
// come lint automatico invece che a occhio. Niente punteggio stile RankMath:
// solo PASS/WARN/FAIL per voce, con motivazione.
//
// Uso:
//   node scripts/seo-lint.mjs              -> tutti gli articoli (draft compresi)
//   node scripts/seo-lint.mjs <slug>       -> un solo articolo
//
// Exit code: 1 se almeno un articolo ha un FAIL, altrimenti 0 (i WARN non bloccano).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.resolve(__dirname, '..', 'src', 'content', 'blog');

const only = process.argv[2] || null;

function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { fm: {}, body: raw };
  const [, fmBlock, body] = m;
  const fm = {};
  for (const line of fmBlock.split('\n')) {
    const mm = line.match(/^(\w+):\s*(.*)$/);
    if (!mm) continue;
    let [, key, val] = mm;
    val = val.trim().replace(/^"(.*)"$/, '$1');
    fm[key] = val;
  }
  return { fm, body: body.trim() };
}

function stripMd(text) {
  return text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // link -> solo testo
    .replace(/[*_`#]/g, '');
}

function check(id, level, ok, detail) {
  return { id, level, status: ok ? 'PASS' : level, detail };
}

function lintArticle(slug, raw) {
  const { fm, body } = parseFrontmatter(raw);
  const results = [];

  const title = fm.title || '';
  results.push(check(
    'title-length', 'WARN',
    title.length > 0 && title.length <= 60,
    `${title.length} caratteri (target ≤60)`
  ));

  const desc = fm.description || '';
  results.push(check(
    'description-length', 'WARN',
    desc.length >= 140 && desc.length <= 160,
    `${desc.length} caratteri (target 140-160)`
  ));

  const keyword = fm.keyword || '';
  if (!keyword) {
    results.push(check('keyword-in-title', 'WARN', false, 'nessuna keyword in frontmatter, salto i check collegati'));
  } else {
    const kwLower = keyword.toLowerCase();
    // WARN, non FAIL: qui il title è volutamente un hook narrativo (coerente con
    // gli articoli già live), non un title SEO keyword-first. Informativo.
    results.push(check(
      'keyword-in-title', 'WARN',
      title.toLowerCase().includes(kwLower),
      `keyword "${keyword}" ${title.toLowerCase().includes(kwLower) ? 'presente' : 'assente'} nel title (title narrativo per scelta, non bloccante)`
    ));

    const first150 = stripMd(body).slice(0, 150).toLowerCase();
    results.push(check(
      'keyword-early', 'WARN',
      first150.includes(kwLower),
      `keyword nei primi 150 caratteri del testo: ${first150.includes(kwLower) ? 'sì' : 'no'}`
    ));
  }

  const h2count = (body.match(/^##\s+/gm) || []).length;
  results.push(check('h2-count', 'FAIL', h2count >= 2, `${h2count} H2 trovati (minimo 2)`));

  const internalLinks = body.match(/\]\(\/(blog|servizi)[^)]*\)/g) || [];
  results.push(check('internal-links', 'FAIL', internalLinks.length >= 2, `${internalLinks.length} link interni (minimo 2)`));

  const hasServiceLink = body.includes('](/servizi');
  results.push(check('service-link', 'FAIL', hasServiceLink, hasServiceLink ? 'presente' : 'nessun link a /servizi'));

  const tail = body.slice(-600);
  const hasClosingCta = /\*Strategica[\s\S]*\]\(/.test(tail) || /\bmailto:/.test(tail);
  results.push(check('closing-cta', 'WARN', hasClosingCta, hasClosingCta ? 'presente' : 'nessuna CTA riconoscibile nelle ultime righe'));

  return results;
}

const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'));
let hasFail = false;

for (const file of files) {
  const slug = file.replace(/\.md$/, '');
  if (only && slug !== only) continue;

  const raw = fs.readFileSync(path.join(blogDir, file), 'utf8');
  const results = lintArticle(slug, raw);

  const fails = results.filter((r) => r.status === 'FAIL');
  const warns = results.filter((r) => r.status === 'WARN');
  if (fails.length) hasFail = true;

  const badge = fails.length ? 'FAIL' : warns.length ? 'WARN' : 'PASS';
  console.log(`\n${badge}  ${slug}`);
  for (const r of results) {
    if (r.status === 'PASS') continue;
    const icon = r.status === 'FAIL' ? '  ✗' : '  !';
    console.log(`${icon} [${r.id}] ${r.detail}`);
  }
}

console.log('');
process.exit(hasFail ? 1 : 0);

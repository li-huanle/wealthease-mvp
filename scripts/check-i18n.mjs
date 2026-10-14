// Fails the build when translation keys are missing, so a bad messages/*.json
// never reaches production (Vercel keeps serving the previous deployment).
import { readFileSync } from 'node:fs';

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
const locales = { en: JSON.parse(read('messages/en.json')), zh: JSON.parse(read('messages/zh.json')) };

const flatten = (obj, prefix = '') =>
  Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' && !Array.isArray(v) ? flatten(v, `${prefix}${k}.`) : [`${prefix}${k}`]
  );
const has = (msgs, path) => path.split('.').reduce((o, k) => (o && typeof o === 'object' ? o[k] : undefined), msgs) !== undefined;

const errors = [];

// 1. Both locales must define the same keys.
const keys = Object.fromEntries(Object.entries(locales).map(([l, m]) => [l, new Set(flatten(m))]));
for (const [a, b] of [['en', 'zh'], ['zh', 'en']]) {
  for (const k of keys[a]) if (!keys[b].has(k)) errors.push(`${b}.json is missing "${k}" (present in ${a}.json)`);
}

// 2. Keys referenced by calculator listings must exist.
const required = new Set();
const home = read('app/[locale]/page.tsx');
for (const [, key] of home.matchAll(/key: '(\w+)',\s*\n\s*href: `\/\$\{locale\}\/calculators\//g)) {
  required.add(`home.tools.${key}`);
  required.add(`home.tools.${key}Desc`);
}
const index = read('app/[locale]/calculators/page.tsx');
for (const [, key] of index.matchAll(/t\('(tools\.[\w.]+)'\)/g)) required.add(`calculatorsPage.${key}`);
const related = read('components/RelatedCalculators.tsx');
for (const [, key] of related.matchAll(/(?:titleKey|descKey): '([\w.]+)'/g)) required.add(`calculatorsPage.tools.${key}`);

for (const [l, m] of Object.entries(locales)) {
  for (const k of required) if (!has(m, k)) errors.push(`${l}.json is missing "${k}" (used by a calculator listing)`);
}

if (errors.length) {
  console.error(`\n✖ i18n check failed (${errors.length} problem${errors.length > 1 ? 's' : ''}):`);
  for (const e of [...new Set(errors)].slice(0, 50)) console.error(`  - ${e}`);
  console.error('\nRestore the missing keys in messages/en.json and messages/zh.json before deploying.\n');
  process.exit(1);
}
console.log(`✓ i18n check passed (${keys.en.size} keys per locale, ${required.size} listing keys verified)`);

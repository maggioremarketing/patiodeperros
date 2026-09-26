/**
 * Español de Chile, tuteo.
 *
 * El voseo argentino es el error que delata un texto comprado, traducido o
 * escrito por una máquina que promedió el castellano de toda América. Se
 * escribe «eliges», no «elegís».
 *
 * La lista es de formas verbales, no de palabras sueltas: «podés» es voseo,
 * pero «después» no lo es aunque termine parecido.
 */

import { readFileSync } from "node:fs";
import { pantallas, sinComentarios, RAIZ } from "./fuentes.ts";

const VOSEO =
  /\b(?:ten[ée]s|pod[ée]s|quer[ée]s|sab[ée]s|hac[ée]s|ven[ií]s|ten[ée]|dej[áa]s|eleg[ií]s|viv[ií]s|escrib[ií]s|dec[ií]s|sos)\b/i;

const fallos: string[] = [];
let revisados = 0;

for (const f of pantallas()) {
  revisados++;
  sinComentarios(readFileSync(f, "utf8")).split("\n").forEach((linea, i) => {
    const m = linea.match(VOSEO);
    if (m) fallos.push(`  ${f.replace(RAIZ, "src")}:${i + 1}  ${m[0]}  ${linea.trim().slice(0, 60)}`);
  });
}

if (fallos.length) {
  console.error("\n✗ Voseo. Esta marca tutea en chileno.\n");
  for (const f of fallos) console.error(f);
  process.exit(1);
}

console.log(`✓ ${revisados} pantallas en español de Chile, sin voseo`);

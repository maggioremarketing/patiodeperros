/**
 * Ningún precio escrito a mano.
 *
 * En un sitio de plantas un precio viejo es una molestia. Acá es una promesa
 * que alguien te va a cobrar distinto cuando llegue con su perro, y eso no se
 * arregla pidiendo disculpas.
 *
 * Todos los montos salen de `lib/catalogo.ts`, que es el único lugar donde se
 * puede escribir un número de pesos.
 */

import { readFileSync } from "node:fs";
import { pantallas, sinComentarios, RAIZ } from "./fuentes.ts";

const DECLARA = "lib/catalogo.ts";
/** Un monto en pesos: signo, y de cuatro cifras para arriba con o sin puntos. */
const MONTO = /\$\s?\d{1,3}(?:[.,]\d{3})+|\$\s?\d{4,}/;

const fallos: string[] = [];
let revisados = 0;

for (const f of pantallas()) {
  if (f.endsWith(DECLARA)) continue;
  revisados++;
  sinComentarios(readFileSync(f, "utf8")).split("\n").forEach((linea, i) => {
    const m = linea.match(MONTO);
    if (m) fallos.push(`  ${f.replace(RAIZ, "src")}:${i + 1}  ${m[0]}  ${linea.trim().slice(0, 55)}`);
  });
}

if (fallos.length) {
  console.error("\n✗ Precios escritos a mano. Tienen que salir del catálogo.\n");
  for (const f of fallos) console.error(f);
  process.exit(1);
}

console.log(`✓ ${revisados} pantallas sin precios a mano`);

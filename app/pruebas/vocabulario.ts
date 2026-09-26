/**
 * Las palabras que la marca todavía no puede escribir.
 *
 * No es una lista de estilo. Cada palabra nombra algo que no existe, que no se
 * controla o que nadie dice de su propio perro, y la razón vive junto a la
 * palabra en `lib/marca.ts`.
 *
 * La prueba lee esa lista en vez de tener su propia copia, así que agregar una
 * palabra prohibida es agregarla en un solo lugar. Y por eso mismo el archivo
 * que la declara queda fuera de la revisión: es el único lugar donde la
 * palabra tiene permiso de estar escrita.
 */

import { readFileSync } from "node:fs";
import { pantallas, sinComentarios, RAIZ } from "./fuentes.ts";
import { PALABRAS_PROHIBIDAS } from "../src/lib/marca.ts";

const DECLARA = "lib/marca.ts";
const fallos: string[] = [];
let revisados = 0;

for (const f of pantallas()) {
  if (f.endsWith(DECLARA)) continue;
  revisados++;
  const lineas = sinComentarios(readFileSync(f, "utf8")).split("\n");
  for (const { palabra } of PALABRAS_PROHIBIDAS) {
    const re = new RegExp(`\\b${palabra.replace(/\s+/g, "\\s+")}`, "i");
    lineas.forEach((linea, i) => {
      if (re.test(linea)) {
        fallos.push(`  ${f.replace(RAIZ, "src")}:${i + 1}  «${palabra}»  ${linea.trim().slice(0, 55)}`);
      }
    });
  }
}

if (fallos.length) {
  console.error("\n✗ Vocabulario. Estas palabras nombran algo que todavía no existe o que no se controla.\n");
  for (const f of fallos) console.error(f);
  console.error(`\n  La razón de cada una está en ${DECLARA}.\n`);
  process.exit(1);
}

console.log(`✓ ${revisados} pantallas sin las ${PALABRAS_PROHIBIDAS.length} palabras prohibidas`);

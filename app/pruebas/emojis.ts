/**
 * Ningún emoji, en ninguna parte.
 *
 * No es pudor. Un emoji en un mensaje de una guardería empuja el tono hacia lo
 * infantil, y lo que se está pidiendo es que alguien deje a su animal con
 * desconocidos ocho horas. La confianza no se construye con caritas.
 *
 * La regla cubre el código y el contenido, porque el emoji entra casi siempre
 * por una cadena de texto que alguien pegó de un mensaje.
 */

import { readFileSync } from "node:fs";
import { archivos, sinComentarios, RAIZ } from "./fuentes.ts";

const EMOJI =
  /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{1F000}-\u{1F0FF}\u{1F100}-\u{1F1FF}]/u;

const fallos: string[] = [];
let revisados = 0;

for (const f of archivos().filter((f) => /\.(tsx?|css)$/.test(f))) {
  revisados++;
  const fuente = /\.css$/.test(f) ? readFileSync(f, "utf8") : sinComentarios(readFileSync(f, "utf8"));
  fuente.split("\n").forEach((linea, i) => {
    const m = linea.match(EMOJI);
    if (m) fallos.push(`  ${f.replace(RAIZ, "src")}:${i + 1}  ${m[0]}  ${linea.trim().slice(0, 60)}`);
  });
}

if (fallos.length) {
  console.error("\n✗ Emojis.\n");
  for (const f of fallos) console.error(f);
  process.exit(1);
}

console.log(`✓ ${revisados} archivos sin emojis`);

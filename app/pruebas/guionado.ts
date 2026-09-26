/**
 * Los guiones, que acá son dos reglas distintas.
 *
 *  1. La prosa larga no parte palabras al final de la línea.
 *  2. Nunca se escribe un guion largo, en ningún texto que se renderice.
 *
 * La segunda es un criterio de voz y no una preferencia tipográfica: el guion
 * largo aparece casi siempre cuando el texto lo escribió alguien de afuera o
 * una máquina, y es de las cosas que más rápido delatan que el mensaje no lo
 * escribió la marca.
 *
 * Se mide sobre el texto que se renderiza, no sobre los comentarios: un
 * comentario le explica el código a quien lo mantiene y no es material de
 * marca.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { archivos, sinComentarios, RAIZ } from "./fuentes.ts";

const fallos: string[] = [];
const mal = (regla: string, detalle: string) => fallos.push(`  ${regla.padEnd(22)} ${detalle}`);

const css = readFileSync(join(RAIZ, "app", "globals.css"), "utf8");
if (!/\.justificado\{[^}]*hyphens:\s*none/.test(css)) {
  mal("Guionado encendido", ".justificado no declara hyphens:none en globals.css");
}

let revisados = 0;
for (const f of archivos().filter((f) => /\.tsx?$/.test(f))) {
  revisados++;
  sinComentarios(readFileSync(f, "utf8")).split("\n").forEach((linea, i) => {
    if (/[—–]/.test(linea)) mal("Guion largo", `${f.replace(RAIZ, "src")}:${i + 1}  ${linea.trim().slice(0, 70)}`);
  });
}

if (fallos.length) {
  console.error("\n✗ Guiones.\n");
  for (const f of fallos) console.error(f);
  process.exit(1);
}

console.log(`✓ ${revisados} archivos sin guiones largos, y la prosa no parte palabras`);

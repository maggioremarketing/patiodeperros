/**
 * Ninguna pantalla nombra un token primitivo.
 *
 * Un componente que escribe `var(--ladrillo-500)` se ve igual de bien el día
 * que se escribe y se rompe el día que alguien cambia el tema, porque el
 * primitivo no sabe si está sobre papel claro u oscuro. La capa semántica sí.
 *
 * También se prohíbe el hexadecimal suelto, que es la versión rápida del mismo
 * error.
 */

import { readFileSync } from "node:fs";
import { pantallas, sinComentarios, RAIZ } from "./fuentes.ts";
import { colores, esPrimitivo } from "../src/lib/tokens.ts";

process.chdir(new URL("..", import.meta.url).pathname);

const primitivos = colores().filter(esPrimitivo).map((t) => t.nombre);
const fallos: string[] = [];
let revisados = 0;

for (const f of pantallas()) {
  revisados++;
  const lineas = sinComentarios(readFileSync(f, "utf8")).split("\n");
  lineas.forEach((linea, i) => {
    for (const p of primitivos) {
      if (linea.includes(p)) fallos.push(`  ${f.replace(RAIZ, "src")}:${i + 1}  ${p}  primitivo en una pantalla`);
    }
    const hex = linea.match(/#[0-9a-f]{6}\b/i);
    if (hex) fallos.push(`  ${f.replace(RAIZ, "src")}:${i + 1}  ${hex[0]}  hexadecimal suelto`);
  });
}

if (fallos.length) {
  console.error("\n✗ Tokens. Las pantallas hablan la capa semántica, no la paleta base.\n");
  for (const f of fallos) console.error(f);
  process.exit(1);
}

console.log(`✓ ${revisados} pantallas usan solo tokens semánticos (${primitivos.length} primitivos vigilados)`);

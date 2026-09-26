/**
 * Que ninguna comprobación quede fuera de la corrida.
 *
 * Es la prueba que vigila a las pruebas. Sin ella, el descubrimiento por
 * carpeta se puede romper en silencio: alguien renombra un archivo, deja de
 * calzar con el patrón y la comprobación desaparece sin que nadie vea un
 * error. Una suite que encoge sin avisar es peor que no tener suite, porque
 * uno sigue confiando en ella.
 */

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const CARPETA = new URL(".", import.meta.url).pathname;
const ANDAMIOS = ["catalogo.mjs", "verificar.mjs", "accesibilidad.mjs", "avance.ts", "fuentes.ts", "navegador.mjs", "romper.mjs"];

const { comprobaciones } = await import("./catalogo.mjs");
const descubiertas = new Set([...comprobaciones().sistema, ...comprobaciones().pantalla]);

const fallos: string[] = [];

const enCarpeta = readdirSync(CARPETA).filter((n) => /\.(ts|mjs)$/.test(n));
for (const archivo of enCarpeta) {
  if (ANDAMIOS.includes(archivo)) continue;
  if (!descubiertas.has(archivo)) fallos.push(`  ${archivo} está en pruebas/ y no lo corre nadie`);
}

/** Una comprobación que no puede fallar no es una comprobación. */
for (const archivo of descubiertas) {
  const fuente = readFileSync(join(CARPETA, archivo), "utf8");
  if (!/process\.exit\(1\)/.test(fuente)) {
    fallos.push(`  ${archivo} no tiene forma de fallar: no llama a process.exit(1)`);
  }
}

/** El andamio tiene que declarar exactamente lo que existe. */
for (const a of ANDAMIOS) {
  if (!enCarpeta.includes(a)) fallos.push(`  ${a} está declarado como andamio y no existe`);
}

if (fallos.length) {
  console.error("\n✗ Gobernanza de las pruebas.\n");
  for (const f of fallos) console.error(f);
  process.exit(1);
}

console.log(`✓ ${descubiertas.size} comprobaciones descubiertas, todas con forma de fallar`);

/**
 * Descubre las comprobaciones leyendo la carpeta.
 *
 * No son una cadena de `&&` en package.json, que es el lugar exacto donde una
 * comprobación nueva se olvida de agregar. Dejar un archivo acá alcanza para
 * que corra, y `gobernanza.ts` comprueba que ninguno quede fuera.
 */

import { readdirSync } from "node:fs";

const CARPETA = new URL(".", import.meta.url).pathname;

/** Los archivos que son infraestructura y no comprobaciones. */
export const ANDAMIOS = ["catalogo.mjs", "verificar.mjs", "accesibilidad.mjs", "avance.ts", "fuentes.ts", "navegador.mjs", "romper.mjs"];

export function comprobaciones() {
  const todos = readdirSync(CARPETA).filter((n) => !ANDAMIOS.includes(n));
  return {
    sistema: todos.filter((n) => n.endsWith(".ts")).sort(),
    pantalla: todos.filter((n) => n.endsWith(".mjs")).sort(),
  };
}

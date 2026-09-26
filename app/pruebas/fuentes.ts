/**
 * Lo que comparten las comprobaciones que leen el código.
 *
 * Vive acá para que «lo que se renderiza» signifique lo mismo en todas. Si
 * cada prueba tuviera su propio borrador de comentarios, dos pruebas medirían
 * cosas distintas creyendo que miden la misma.
 */

import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

export const RAIZ = new URL("../src", import.meta.url).pathname;

export function archivos(desde: string = RAIZ): string[] {
  return readdirSync(desde).flatMap((n) => {
    const r = join(desde, n);
    return statSync(r).isDirectory() ? archivos(r) : [r];
  });
}

/**
 * Borra los comentarios dejando los saltos de línea en su lugar, para que el
 * número de línea que informa una prueba siga siendo el número de línea real.
 * Una prueba que falla y apunta al lugar equivocado cuesta más de lo que ahorra.
 */
export function sinComentarios(fuente: string): string {
  return fuente
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/^(\s*)\/\/.*$/gm, "$1");
}

/** Las pantallas y los componentes: lo que el visitante llega a ver. */
export const pantallas = () =>
  archivos().filter((f) => /\.tsx$/.test(f));

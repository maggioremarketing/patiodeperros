/**
 * Corre todas las comprobaciones de sistema, descubriéndolas.
 *
 * Leen código y tokens. No levantan un navegador, así que corren en segundos y
 * se pueden dejar en un hook antes del commit sin que nadie las odie.
 */

import { spawnSync } from "node:child_process";
import { comprobaciones } from "./catalogo.mjs";

const RAIZ = new URL("..", import.meta.url).pathname;
let malas = 0;

for (const archivo of comprobaciones().sistema) {
  const r = spawnSync(
    process.execPath,
    ["--experimental-strip-types", "--no-warnings", `pruebas/${archivo}`],
    { cwd: RAIZ, stdio: "inherit" }
  );
  if (r.status !== 0) malas++;
}

console.log(malas ? `\n${malas} comprobación(es) de sistema con problemas.` : "\nSistema en orden.");
process.exit(malas ? 1 : 0);

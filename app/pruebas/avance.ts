/**
 * Qué criterio está escrito y cuál no.
 *
 * Informa, no falla. Un manual incompleto no es un error de código: es el
 * estado real de una marca nueva. Lo que sí sería un error es no saberlo, o
 * peor, que el manual aparente estar terminado y nadie tape el hoyo.
 */

import { CRITERIOS, PARTES, escritos, faltantes, porParte } from "../src/lib/criterios.ts";

console.log(`\nManual: ${escritos().length} de ${CRITERIOS.length} criterios escritos.\n`);

for (const parte of PARTES) {
  const criterios = porParte(parte);
  const hechos = criterios.filter((c) => c.cuerpo?.length).length;
  console.log(`  ${parte}  (${hechos}/${criterios.length})`);
  for (const c of criterios) {
    console.log(`    ${c.cuerpo?.length ? "escrito " : "FALTA   "} ${c.titulo}`);
  }
  console.log("");
}

const pendientes = faltantes();
if (pendientes.length) {
  console.log("Lo que falta, con su razón:\n");
  for (const c of pendientes) console.log(`  ${c.titulo}\n    ${c.falta}\n`);
}

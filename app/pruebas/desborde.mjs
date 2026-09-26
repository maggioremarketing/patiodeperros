/**
 * Que nada se salga de la pantalla angosta.
 *
 * Se mide a 320 px, que es el teléfono más angosto que todavía existe. Un
 * desborde horizontal no se ve en el computador de quien lo programó y se ve
 * siempre en el de quien lo usa.
 */

import { abrir, BASE, RUTAS } from "./navegador.mjs";

const ANCHO = 320;
const navegador = await abrir();
const pagina = await navegador.newPage({ viewport: { width: ANCHO, height: 800 } });
const fallos = [];

for (const ruta of RUTAS) {
  await pagina.goto(BASE + ruta, { waitUntil: "load" });
  const ancho = await pagina.evaluate(() => document.documentElement.scrollWidth);
  if (ancho > ANCHO + 1) {
    /**
     * Un elemento ancho dentro de una envoltura con scroll no desborda la
     * página: por eso se descartan. La primera versión los nombraba igual y
     * mandaba a arreglar una tabla que ya estaba bien, mientras el culpable
     * de verdad seguía suelto.
     */
    const culpables = await pagina.$$eval(
      "*",
      (nodos, limite) =>
        nodos
          .filter((n) => n.getBoundingClientRect().right > limite + 1)
          .filter((n) => {
            for (let p = n.parentElement; p; p = p.parentElement) {
              const o = getComputedStyle(p).overflowX;
              if (o === "auto" || o === "scroll" || o === "hidden") return false;
            }
            return true;
          })
          .slice(0, 6)
          .map((n) => {
            const r = n.getBoundingClientRect();
            const clase = n.className ? "." + String(n.className).split(" ")[0] : "";
            return `${n.tagName.toLowerCase()}${clase} (${Math.round(r.width)} px)`;
          }),
      ANCHO
    );
    fallos.push(`  ${ruta}  mide ${ancho} px en una pantalla de ${ANCHO}  ${culpables.join(", ")}`);
  }
}

await navegador.close();

if (fallos.length) {
  console.error("\n✗ Desborde horizontal.\n");
  for (const f of fallos) console.error(f);
  process.exit(1);
}

console.log(`✓ ${RUTAS.length} rutas sin desborde horizontal a ${ANCHO} px`);

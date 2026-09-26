/**
 * El área de los blancos táctiles, medida en la pantalla real.
 *
 * No es estética. Quien está dejando a su perro tiene una mano ocupada con la
 * correa y la otra con el teléfono, y un botón chico se falla y se vuelve a
 * intentar. El mínimo vive en `spacing.css` y se lee de ahí.
 */

import { readFileSync } from "node:fs";
import { abrir, BASE, RUTAS } from "./navegador.mjs";

const css = readFileSync(new URL("../src/estilos/tokens/spacing.css", import.meta.url), "utf8");
const MINIMO = Number(css.match(/--toque-minimo:\s*(\d+)px/)?.[1] ?? 44);

const navegador = await abrir();
const pagina = await navegador.newPage({ viewport: { width: 390, height: 844 } });
const fallos = [];
let medidos = 0;

for (const ruta of RUTAS) {
  await pagina.goto(BASE + ruta, { waitUntil: "load" });
  const chicos = await pagina.$$eval(
    "a, button",
    (nodos, minimo) =>
      nodos
        .filter((n) => n.offsetParent !== null)
        .map((n) => {
          const r = n.getBoundingClientRect();
          return { texto: (n.textContent || "").trim().slice(0, 30), ancho: Math.round(r.width), alto: Math.round(r.height) };
        })
        .filter((b) => b.alto > 0 && b.alto < minimo),
    MINIMO
  );
  const total = await pagina.$$eval("a, button", (n) => n.length);
  medidos += total;
  for (const b of chicos) fallos.push(`  ${ruta}  ${b.ancho}x${b.alto}  «${b.texto}»`);
}

await navegador.close();

if (fallos.length) {
  console.error(`\n✗ Blancos táctiles bajo ${MINIMO} px de alto.\n`);
  for (const f of fallos) console.error(f);
  process.exit(1);
}

console.log(`✓ ${medidos} blancos táctiles llegan a ${MINIMO} px en pantalla de teléfono`);

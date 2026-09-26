/**
 * Que el menú del manual lleve a alguna parte.
 *
 * Un índice con un enlace muerto es peor que no tener índice: la persona cree
 * que el criterio no existe. Se comprueba que cada ancla del menú tenga su
 * sección en la página, y que cada página tenga un solo h1.
 */

import { abrir, BASE, RUTAS } from "./navegador.mjs";

const navegador = await abrir();
const pagina = await navegador.newPage({ viewport: { width: 1280, height: 900 } });
const fallos = [];
let anclas = 0;

await pagina.goto(BASE + "/marca/", { waitUntil: "load" });
const enlaces = await pagina.$$eval("nav a[href^='#']", (n) => n.map((a) => a.getAttribute("href").slice(1)));
anclas = enlaces.length;

/**
 * La búsqueda se hace dentro de la página y no con un selector armado acá:
 * un id se escapa distinto en un selector CSS que en `getElementById`, y la
 * primera versión de esto se caía sola antes de comprobar nada.
 */
const huerfanas = await pagina.evaluate(
  (ids) => ids.filter((id) => !document.getElementById(id)),
  enlaces
);
for (const id of huerfanas) fallos.push(`  el menú apunta a #${id} y esa sección no existe`);

for (const ruta of RUTAS) {
  await pagina.goto(BASE + ruta, { waitUntil: "load" });
  const h1 = await pagina.$$eval("h1", (n) => n.length);
  if (h1 !== 1) fallos.push(`  ${ruta} tiene ${h1} elementos h1 y tiene que tener exactamente uno`);
}

await navegador.close();

if (fallos.length) {
  console.error("\n✗ Navegación.\n");
  for (const f of fallos) console.error(f);
  process.exit(1);
}

console.log(`✓ ${anclas} anclas del menú llegan a su criterio, y cada ruta tiene un h1`);

/**
 * El contraste de cada par declarado, en los dos temas.
 *
 * Corre la misma función que usa la página del manual, así que no hay forma de
 * que el manual muestre un número y la prueba compruebe otro. Es la diferencia
 * entre un manual que describe el sistema y uno que lo lee.
 */

process.chdir(new URL("..", import.meta.url).pathname);

const { medir } = await import("../src/lib/contraste.ts");

const fallos: string[] = [];
const mediciones = medir();

for (const m of mediciones) {
  for (const tema of ["claro", "oscuro"] as const) {
    const lado = m[tema];
    if (!lado.pasa) {
      fallos.push(
        `  ${m.uso}\n    ${m.tinta} sobre ${m.papel} en tema ${tema}: ${lado.razon} y el mínimo es ${m.minimo}  (${lado.hex[0]} / ${lado.hex[1]})`
      );
    }
  }
}

if (fallos.length) {
  console.error("\n✗ Contraste.\n");
  for (const f of fallos) console.error(f);
  process.exit(1);
}

console.log(`✓ ${mediciones.length} pares de tinta sobre papel cumplen la WCAG AA en los dos temas`);

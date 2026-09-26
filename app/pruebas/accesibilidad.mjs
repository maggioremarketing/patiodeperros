/**
 * Las comprobaciones de pantalla: construye, sirve y mide.
 *
 * Están separadas de `verificar` porque son lentas y porque miden otra cosa.
 * `verificar` lee el código y contesta si el sistema está bien escrito. Esto
 * abre el sitio en un navegador y contesta si se puede usar, que no es lo
 * mismo y no se deduce de lo primero.
 */

import { spawn, spawnSync } from "node:child_process";
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { comprobaciones } from "./catalogo.mjs";

const RAIZ = new URL("..", import.meta.url).pathname;
const SALIDA = join(RAIZ, "out");
const PUERTO = 4311;
const BASE = `http://127.0.0.1:${PUERTO}`;

const TIPOS = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".png": "image/png", ".txt": "text/plain; charset=utf-8", ".json": "application/json" };

console.log("Construyendo el sitio.");
const build = spawnSync("npm", ["run", "build"], { cwd: RAIZ, stdio: "pipe", encoding: "utf8" });
if (build.status !== 0) {
  console.error("\n✗ La construcción falló, así que no hay nada que medir.\n");
  console.error(build.stdout?.slice(-2000) ?? "");
  console.error(build.stderr?.slice(-2000) ?? "");
  process.exit(1);
}

const servidor = createServer((peticion, respuesta) => {
  const ruta = decodeURIComponent((peticion.url ?? "/").split("?")[0]);
  const candidatos = [join(SALIDA, normalize(ruta)), join(SALIDA, normalize(ruta), "index.html"), join(SALIDA, normalize(ruta) + ".html")];
  const archivo = candidatos.find((c) => existsSync(c) && statSync(c).isFile());
  if (!archivo) {
    respuesta.writeHead(404);
    respuesta.end("no está");
    return;
  }
  respuesta.writeHead(200, { "content-type": TIPOS[extname(archivo)] ?? "application/octet-stream", connection: "close" });
  createReadStream(archivo).pipe(respuesta);
});

await new Promise((listo) => servidor.listen(PUERTO, "127.0.0.1", listo));
console.log(`Sirviendo out/ en ${BASE}\n`);

/**
 * Las comprobaciones se lanzan sin bloquear, y esa es la parte que importa.
 *
 * La primera versión usaba `spawnSync` y ninguna prueba cargaba la página:
 * el servidor vive en este mismo proceso, y `spawnSync` congela el bucle de
 * eventos mientras el hijo corre, así que el navegador pedía el sitio y del
 * otro lado no había nadie escuchando. Se veía como un problema del sitio y
 * era del andamio.
 */
function correr(archivo) {
  return new Promise((listo) => {
    const hijo = spawn(process.execPath, [`pruebas/${archivo}`], { cwd: RAIZ, stdio: "inherit", env: { ...process.env, BASE } });
    hijo.on("close", (codigo) => listo(codigo ?? 1));
  });
}

let malas = 0;
for (const archivo of comprobaciones().pantalla) {
  if ((await correr(archivo)) !== 0) malas++;
}

servidor.close();
console.log(malas ? `\n${malas} comprobación(es) de pantalla con problemas.` : "\nPantallas en orden.");
process.exit(malas ? 1 : 0);

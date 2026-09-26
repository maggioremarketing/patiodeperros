/**
 * Abre el navegador con el que se miden las pantallas.
 *
 * El ejecutable se busca en el disco en vez de confiar en el que Playwright
 * espera por número de versión: la imagen donde esto corre trae uno y la
 * librería pide otro, y una prueba que no corre por eso es una prueba que
 * alguien va a borrar en vez de arreglar.
 */

import { readdirSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";

const CARPETA = process.env.PLAYWRIGHT_BROWSERS_PATH || "/opt/pw-browsers";

function ejecutable() {
  try {
    const dir = readdirSync(CARPETA).find((n) => /^chromium-\d+$/.test(n));
    return dir ? join(CARPETA, dir, "chrome-linux", "chrome") : undefined;
  } catch {
    return undefined;
  }
}

export const BASE = process.env.BASE ?? "http://127.0.0.1:4311";

/**
 * `--no-proxy-server` no es opcional acá. El entorno tiene un proxy de salida
 * configurado por variable de ambiente y el navegador lo respeta, así que sin
 * esto intenta pedirle 127.0.0.1 al proxy y se queda esperando hasta que la
 * prueba se cae por tiempo. Costó una tarde descubrirlo, por eso queda escrito.
 */
export async function abrir() {
  return chromium.launch({
    executablePath: ejecutable(),
    args: ["--no-sandbox", "--no-proxy-server", "--disable-dev-shm-usage"],
  });
}

/** Las dos rutas del sitio. Una prueba que solo mira la portada no mide nada. */
export const RUTAS = ["/", "/marca/"];

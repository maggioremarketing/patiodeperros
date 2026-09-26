/**
 * Verifica las pruebas rompiendo el código a propósito.
 *
 * Es el cuarto paso del método y el único que distingue una suite que mide de
 * una que tranquiliza. Una prueba que nunca vio fallar es una hipótesis: uno
 * cree que mide algo, y lo único comprobado es que no se queja.
 *
 * Cada entrada de abajo introduce el error exacto que su prueba dice cazar,
 * corre esa prueba sola y exige que falle. Después deja el archivo como
 * estaba, pase lo que pase.
 */

import { spawn } from "node:child_process";
import { createReadStream, existsSync, readFileSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const RAIZ = new URL("..", import.meta.url).pathname;
const PUERTO = 4312;
const BASE = `http://127.0.0.1:${PUERTO}`;

const PAGINA = "src/app/page.tsx";
const GLOBALS = "src/app/globals.css";
const COLORES = "src/estilos/tokens/colors.css";

/**
 * `donde` es el texto que se busca y `rota` lo que lo reemplaza. Si el texto
 * buscado no aparece, el sabotaje no ocurrió y eso también es un fallo: quiere
 * decir que este archivo quedó viejo respecto del código.
 */
const SABOTAJES = [
  { prueba: "guionado.ts", archivo: PAGINA, donde: "Lo que cuesta", rota: "Lo que cuesta — mira", que: "un guion largo en un titular" },
  { prueba: "emojis.ts", archivo: PAGINA, donde: "Pedir un cupo", rota: "Pedir un cupo \u{1F436}", que: "un emoji en un botón" },
  { prueba: "voz.ts", archivo: PAGINA, donde: "Dos palabras, las dos literales", rota: "Si querés, son dos palabras", que: "voseo argentino" },
  { prueba: "vocabulario.ts", archivo: PAGINA, donde: "Antes del primer día", rota: "Antes del primer día en el hotel", que: "una palabra prohibida" },
  { prueba: "precios.ts", archivo: PAGINA, donde: "Lo que cuesta", rota: "Desde $20.000 al día", que: "un precio escrito a mano" },
  { prueba: "tokens.ts", archivo: PAGINA, donde: 'background: "var(--bg-sunken)", padding: "var(--sp-20) 0"', rota: 'background: "var(--arena-200)", padding: "var(--sp-20) 0"', que: "un token primitivo en una pantalla" },
  { prueba: "contraste.ts", archivo: COLORES, donde: "--corteza-500:#5C4835", rota: "--corteza-500:#C9C2B6", que: "una tinta sin contraste suficiente" },
  { prueba: "gobernanza.ts", archivo: "pruebas/suelta.ts", crear: "console.log('no compruebo nada');\n", que: "una comprobación que no puede fallar" },
  { prueba: "desborde.mjs", pantalla: true, archivo: GLOBALS, donde: ".envoltura{max-width:var(--ancho-contenido)", rota: ".envoltura{min-width:900px;max-width:var(--ancho-contenido)", que: "un ancho fijo que no cabe en el teléfono" },
  { prueba: "toque.mjs", pantalla: true, archivo: GLOBALS, donde: ".enlace-toque{display:inline-flex;align-items:center;min-height:var(--toque-minimo)}", rota: ".enlace-toque{display:inline-flex;align-items:center;min-height:12px}", que: "un blanco táctil por debajo del mínimo" },
  { prueba: "navegacion.mjs", pantalla: true, archivo: PAGINA, donde: "<Tagline como=\"h1\" />", rota: "<><Tagline como=\"h1\" /><h1>Otro encabezado</h1></>", que: "un segundo h1 en la misma página" },
];

const correr = (comando, args, extra = {}) =>
  new Promise((listo) => {
    const hijo = spawn(comando, args, { cwd: RAIZ, stdio: "pipe", env: { ...process.env, ...extra } });
    let salida = "";
    hijo.stdout.on("data", (d) => (salida += d));
    hijo.stderr.on("data", (d) => (salida += d));
    hijo.on("close", (codigo) => listo({ codigo: codigo ?? 1, salida }));
  });

const construir = () => correr("npm", ["run", "build"]);

const TIPOS = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".woff2": "font/woff2" };

function servidor() {
  const salida = join(RAIZ, "out");
  return createServer((peticion, respuesta) => {
    const ruta = decodeURIComponent((peticion.url ?? "/").split("?")[0]);
    const candidatos = [join(salida, normalize(ruta)), join(salida, normalize(ruta), "index.html"), join(salida, normalize(ruta) + ".html")];
    const archivo = candidatos.find((c) => existsSync(c) && statSync(c).isFile());
    if (!archivo) {
      respuesta.writeHead(404);
      respuesta.end("no está");
      return;
    }
    respuesta.writeHead(200, { "content-type": TIPOS[extname(archivo)] ?? "application/octet-stream", connection: "close" });
    createReadStream(archivo).pipe(respuesta);
  });
}

const resultados = [];

for (const s of SABOTAJES) {
  const ruta = join(RAIZ, s.archivo);
  const original = s.crear ? null : readFileSync(ruta, "utf8");
  let servidorVivo = null;

  try {
    if (s.crear) {
      writeFileSync(ruta, s.crear);
    } else {
      if (!original.includes(s.donde)) {
        resultados.push({ prueba: s.prueba, que: s.que, estado: "SABOTAJE VIEJO", nota: `no se encontró «${s.donde.slice(0, 40)}» en ${s.archivo}` });
        continue;
      }
      writeFileSync(ruta, original.replace(s.donde, s.rota));
    }

    let r;
    if (s.pantalla) {
      const build = await construir();
      if (build.codigo !== 0) {
        resultados.push({ prueba: s.prueba, que: s.que, estado: "NO SE PUDO", nota: "la construcción falló con el sabotaje puesto" });
        continue;
      }
      servidorVivo = servidor();
      await new Promise((listo) => servidorVivo.listen(PUERTO, "127.0.0.1", listo));
      r = await correr(process.execPath, [`pruebas/${s.prueba}`], { BASE });
    } else {
      r = await correr(process.execPath, ["--experimental-strip-types", "--no-warnings", `pruebas/${s.prueba}`]);
    }

    resultados.push({
      prueba: s.prueba,
      que: s.que,
      estado: r.codigo !== 0 ? "la cazó" : "NO LA VIO",
      nota: r.codigo !== 0 ? "" : "la prueba pasó con el código roto",
    });
  } finally {
    if (servidorVivo) servidorVivo.close();
    if (s.crear) {
      if (existsSync(ruta)) unlinkSync(ruta);
    } else {
      writeFileSync(ruta, original);
    }
  }
}

console.log("\nVerificación de las pruebas: se rompe el código a propósito y se exige que cada una lo note.\n");
let malas = 0;
for (const r of resultados) {
  const bien = r.estado === "la cazó";
  if (!bien) malas++;
  console.log(`  ${bien ? "✓" : "✗"} ${r.prueba.padEnd(18)} ${r.que.padEnd(48)} ${r.estado}${r.nota ? "  " + r.nota : ""}`);
}


console.log(
  malas
    ? `\n${malas} prueba(s) no se enteraron del error que dicen cazar.\n`
    : `\n${resultados.length} pruebas verificadas: todas fallan cuando tienen que fallar.\n`
);
process.exit(malas ? 1 : 0);

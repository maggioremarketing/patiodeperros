/**
 * Lee los tokens desde el CSS, en tiempo de construcción.
 *
 * Es la tesis del proyecto y vale la pena decirla acá: el manual no describe
 * el sistema, lo lee. Si alguien cambia un hexadecimal en `colors.css`, la
 * página de la paleta cambia sola. Un manual que transcribe valores a mano se
 * desincroniza del producto en la primera semana, y entonces deja de ser la
 * fuente de verdad para pasar a ser un documento viejo que nadie abre.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";

const CARPETA = join(process.cwd(), "src", "estilos", "tokens");

export type Token = { nombre: string; valor: string; comentario?: string };

/** Lee un archivo de tokens y devuelve sus declaraciones en orden. */
export function leer(archivo: string): Token[] {
  const fuente = readFileSync(join(CARPETA, `${archivo}.css`), "utf8");
  const tokens: Token[] = [];
  const re = /--([a-z0-9-]+)\s*:\s*([^;]+);(?:\s*\/\*\s*@kind\s+(\w+)\s*\*\/)?/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(fuente))) {
    tokens.push({ nombre: `--${m[1]}`, valor: m[2].trim(), comentario: m[3] });
  }
  return tokens;
}

/** Todos los tokens de color, primitivos y semánticos juntos. */
export function colores(): Token[] {
  return leer("colors");
}

/** Los primitivos son los que tienen un valor literal y no una referencia. */
export const esPrimitivo = (t: Token) => /^#|^rgba?\(/.test(t.valor);

/** Los semánticos son los que apuntan a otro token. */
export const esSemantico = (t: Token) => !esPrimitivo(t);

/** Agrupa los primitivos por su familia, que es el prefijo antes del número. */
export function familias(): Record<string, Token[]> {
  const grupos: Record<string, Token[]> = {};
  for (const t of colores().filter(esPrimitivo)) {
    const familia = t.nombre.replace(/^--/, "").replace(/-\d+$/, "");
    (grupos[familia] ??= []).push(t);
  }
  return grupos;
}

export const tipografia = () => leer("typography");
export const espaciado = () => leer("spacing");

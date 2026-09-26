/**
 * El contraste, medido y no declarado.
 *
 * Un manual puede decir que su paleta es accesible. Este la mide: resuelve
 * cada par de tinta sobre papel hasta el hexadecimal, en los dos temas, y
 * calcula la razón de contraste de la WCAG. La misma función corre en la
 * página y en la prueba, así que no hay forma de que el manual muestre un
 * número y la prueba compruebe otro.
 */

import { colores } from "./tokens.ts";

const AA_TEXTO = 4.5;
const AA_GRANDE = 3;

function canal(v: number): number {
  const c = v / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/** La luminancia relativa de un hexadecimal, según la WCAG. */
export function luminancia(hex: string): number {
  const h = hex.replace("#", "");
  const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b);
}

/** La razón de contraste entre dos hexadecimales. Va de 1 a 21. */
export function razon(a: string, b: string): number {
  const la = luminancia(a);
  const lb = luminancia(b);
  const [alto, bajo] = la > lb ? [la, lb] : [lb, la];
  return (alto + 0.05) / (bajo + 0.05);
}

type Tema = "claro" | "oscuro";

/**
 * Resuelve un token hasta su hexadecimal, siguiendo las referencias y eligiendo
 * la rama que corresponde del `light-dark()`.
 */
export function resolver(nombre: string, tema: Tema, vistos = new Set<string>()): string | null {
  if (vistos.has(nombre)) return null;
  vistos.add(nombre);

  const token = colores().find((t) => t.nombre === nombre);
  if (!token) return null;

  const valor = token.valor;
  if (/^#/.test(valor)) return valor;

  const ld = valor.match(/^light-dark\(\s*(.+?)\s*,\s*(.+?)\s*\)$/);
  if (ld) {
    const rama = tema === "claro" ? ld[1] : ld[2];
    const ref = rama.match(/var\(\s*(--[a-z0-9-]+)\s*\)/i);
    return ref ? resolver(ref[1], tema, vistos) : /^#/.test(rama) ? rama : null;
  }

  const ref = valor.match(/var\(\s*(--[a-z0-9-]+)\s*\)/i);
  return ref ? resolver(ref[1], tema, vistos) : null;
}

/**
 * Los pares que tienen que cumplir, y el mínimo de cada uno.
 *
 * La lista es explícita a propósito. Medir todas las combinaciones posibles
 * daría un informe largo lleno de pares que nadie va a usar nunca, y un
 * informe que nadie lee es lo mismo que no medir.
 */
export const PARES: { tinta: string; papel: string; minimo: number; uso: string }[] = [
  { tinta: "--fg-1", papel: "--bg-page", minimo: AA_TEXTO, uso: "Texto principal sobre la página" },
  { tinta: "--fg-1", papel: "--bg-raised", minimo: AA_TEXTO, uso: "Texto principal sobre una superficie levantada" },
  { tinta: "--fg-1", papel: "--surface-card", minimo: AA_TEXTO, uso: "Texto principal dentro de una tarjeta" },
  { tinta: "--fg-2", papel: "--bg-page", minimo: AA_TEXTO, uso: "Texto secundario sobre la página" },
  { tinta: "--fg-2", papel: "--surface-card", minimo: AA_TEXTO, uso: "Texto secundario dentro de una tarjeta" },
  { tinta: "--fg-3", papel: "--bg-page", minimo: AA_GRANDE, uso: "Texto de apoyo, solo en tamaño grande" },
  { tinta: "--fg-inverse", papel: "--bg-inverse", minimo: AA_TEXTO, uso: "Texto sobre el papel invertido" },
  { tinta: "--accent", papel: "--bg-page", minimo: AA_TEXTO, uso: "Enlaces y acentos sobre la página" },
  { tinta: "--accent", papel: "--surface-card", minimo: AA_TEXTO, uso: "Enlaces dentro de una tarjeta" },
  { tinta: "--fg-on-accent", papel: "--accent", minimo: AA_TEXTO, uso: "Texto dentro del botón principal" },
  { tinta: "--danger", papel: "--bg-page", minimo: AA_TEXTO, uso: "Mensajes de error" },
  { tinta: "--success", papel: "--bg-page", minimo: AA_TEXTO, uso: "Mensajes de confirmación" },
];

export type Medicion = {
  uso: string;
  tinta: string;
  papel: string;
  minimo: number;
  claro: { hex: [string, string]; razon: number; pasa: boolean };
  oscuro: { hex: [string, string]; razon: number; pasa: boolean };
};

/** Mide todos los pares declarados, en los dos temas. */
export function medir(): Medicion[] {
  return PARES.map((p) => {
    const lado = (tema: Tema) => {
      const a = resolver(p.tinta, tema);
      const b = resolver(p.papel, tema);
      if (!a || !b) throw new Error(`No se pudo resolver ${p.tinta} sobre ${p.papel} en tema ${tema}`);
      const r = razon(a, b);
      return { hex: [a, b] as [string, string], razon: Math.round(r * 100) / 100, pasa: r >= p.minimo };
    };
    return { uso: p.uso, tinta: p.tinta, papel: p.papel, minimo: p.minimo, claro: lado("claro"), oscuro: lado("oscuro") };
  });
}

/**
 * El catálogo. Es la única fuente de precios y de cupos del sitio.
 *
 * Ninguna pantalla escribe un número de pesos a mano: `pruebas/precios.ts`
 * falla si encuentra uno. La razón es la de siempre, y acá pesa más que en un
 * sitio de plantas: un precio viejo en una pantalla es una promesa que alguien
 * te va a cobrar.
 */

/**
 * El número de WhatsApp, en formato internacional sin signos.
 *
 * PENDIENTE: es un número de ejemplo. Alimenta todos los enlaces del sitio, y
 * `pruebas/pendientes.ts` deja constancia de que sigue sin reemplazar en vez
 * de dejar que se publique en silencio.
 */
export const WHATSAPP = "56900000000";

/** El texto con el que llega una conversación nueva. */
export const SALUDO = "Hola, quiero preguntar por un cupo para mi perro.";

export function enlaceWhatsapp(mensaje: string = SALUDO): string {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
}

/**
 * El cupo es el producto.
 *
 * Un patio tiene un tope físico y decirlo no es escasez de vendedor: es la
 * diferencia entre este servicio y uno que mete treinta perros en un galpón.
 * El número sale de acá y se publica.
 *
 * PENDIENTE: está calculado sobre 585 m² de terreno menos lo construido y la
 * piscina. Falta medirlo en el patio real.
 */
export const CUPOS = { porDia: 12, porGrupo: 6 } as const;

export type Plan = {
  id: string;
  nombre: string;
  dias: number;
  precio: number;
  detalle: string;
};

/**
 * Los planes, ordenados por compromiso.
 *
 * PENDIENTE: los precios están por confirmar contra el costo real de
 * operación. El orden de magnitud sí está decidido y no se mueve: esto no
 * compite por precio.
 */
export const PLANES: Plan[] = [
  {
    id: "dia",
    nombre: "Día suelto",
    dias: 1,
    precio: 20000,
    detalle: "Para probar, o para el día que no había con quién dejarlo.",
  },
  {
    id: "ocho",
    nombre: "Ocho días",
    dias: 8,
    precio: 150000,
    detalle: "Dos días por semana. Es el plan con el que parte casi todo el mundo.",
  },
  {
    id: "doce",
    nombre: "Doce días",
    dias: 12,
    precio: 210000,
    detalle: "Tres días por semana, que es donde el perro deja de ser visita.",
  },
  {
    id: "veinte",
    nombre: "Mes completo",
    dias: 20,
    precio: 320000,
    detalle: "Todos los días hábiles. El perro tiene su grupo y su rutina.",
  },
];

/**
 * El día de evaluación, que es gratis y es obligatorio.
 *
 * No es una promoción. Es el filtro: un perro que no funciona en grupo pone en
 * riesgo a los otros, y eso no se descubre el primer día que lo dejan ocho
 * horas. Cobrarlo lo convertiría en una venta y la gente lo saltaría.
 */
export const EVALUACION = {
  nombre: "Día de evaluación",
  precio: 0,
  detalle:
    "Media mañana, con nosotros mirando. Sirve para ver cómo se lleva con el grupo, y para que nos digas que no si el lugar no te convence.",
} as const;

/** Lo que el perro tiene que traer al día. No es letra chica. */
export const REQUISITOS = [
  "Vacunas al día, incluida la de tos de las perreras.",
  "Desparasitación interna y externa vigente.",
  "Más de cuatro meses y con el esquema de vacunas terminado.",
  "Hembras en celo no entran al grupo. Se avisa y se reagenda el día.",
] as const;

/** Formatea un precio en pesos chilenos, en el formato que se lee en Chile. */
export function pesos(valor: number): string {
  return `$${valor.toLocaleString("es-CL")}`;
}

/** El precio por día de un plan, para poder compararlos sin calculadora. */
export function porDia(plan: Plan): number {
  return Math.round(plan.precio / plan.dias);
}

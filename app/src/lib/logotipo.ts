/**
 * Las reglas del logotipo que no puede hacer cumplir un componente.
 *
 * `Logotipo` fija la palabra, la familia, el peso, el tracking y el color, así
 * que la mayoría de los usos incorrectos no se pueden ni intentar. Lo que
 * queda vive acá: los números medidos y la lista de lo que hace falta que
 * alguien no haga. Cada prohibición dice si es imposible o si depende de una
 * persona, porque una lista que no distingue las dos cosas se lee como ruido.
 */

/**
 * El tamaño mínimo del logotipo, en píxeles. Bajo 16 px el «de» se pega a las
 * dos palabras largas y el nombre se lee como una sola.
 */
export const MINIMO_LOGOTIPO = 16;

/** Los tamaños que el logotipo admite, y no uno más. */
export const TAMANOS = [
  "--fs-h4",
  "--fs-h3",
  "--fs-h2",
  "--fs-h1",
  "--fs-display-m",
  "--fs-display-l",
] as const;

export type TamanoLogotipo = (typeof TAMANOS)[number];

/**
 * El tamaño bajo el cual el logotipo se reemplaza por el portón. A 22 px el
 * nombre entero pasa los 180 px de ancho y no cabe en una barra.
 */
export const CORTE_ISOTIPO = 22;

/**
 * La zona libre alrededor del logotipo, en múltiplos del tamaño de la letra.
 * Es la altura de la «P», para que la regla se verifique en el arte mismo en
 * vez de tener que recordar un número.
 */
export const ZONA_LOGOTIPO = 0.7;

export const PROHIBIDO: { que: string; porque: string; imposible: boolean }[] = [
  {
    que: "No se escribe en caja alta ni todo en minúsculas.",
    porque: "Son dos palabras con mayúscula y el «de» en minúscula. Es un nombre, no un rótulo.",
    imposible: true,
  },
  {
    que: "No se le cambia la tipografía.",
    porque: "Es la familia única del sistema. Cambiarla acá rompe lo único que une el cartel con la pantalla.",
    imposible: true,
  },
  {
    que: "No se le cambia el color.",
    porque: "Tinta sobre papel, tinta inversa sobre papel dado vuelta. El ladrillo es del acento, no del nombre.",
    imposible: true,
  },
  {
    que: "No baja del mínimo.",
    porque: "Bajo el mínimo va el portón, que para eso existe.",
    imposible: true,
  },
  {
    que: "No se dibuja a mano.",
    porque:
      "Escribir el nombre en un titular no es el logotipo: es una palabra que se le parece y que no se va a enterar del próximo cambio.",
    imposible: true,
  },
  {
    que: "No se parte en dos líneas.",
    porque: "«Patio de / Perros» deja el «de» colgando y rompe el par.",
    imposible: false,
  },
  {
    que: "No se estira ni se condensa.",
    porque: "Cambiar la proporción cambia el peso aparente, y el peso es lo que hace que el nombre se reconozca de lejos.",
    imposible: false,
  },
  {
    que: "No va sobre una foto sin una superficie detrás.",
    porque: "Sobre una imagen el contraste no se puede medir: cambia con cada píxel.",
    imposible: false,
  },
  {
    que: "No se le agrega una huella, un hueso ni una silueta de perro.",
    porque:
      "El nombre ya dice las dos cosas. Un dibujo al lado las dice por segunda vez y convierte la marca en la de un local de mascotas.",
    imposible: false,
  },
];

/**
 * Las palabras fijas de la marca.
 *
 * Mismo criterio que en Plantas con Palabra: el nombre, el tagline y la
 * promesa no son texto de pantalla sino decisiones, y viven acá una sola vez.
 * Si se pueden desincronizar, se desincronizan.
 */

/** El nombre, tal como se escribe en una frase. */
export const NOMBRE = "Patio de Perros";

/** De dónde es la marca. Va bajo el logotipo, en caja alta. */
export const ORIGEN = "Las Condes, Santiago";

/**
 * El tagline. Es la promesa entera en seis palabras y está escrito para la
 * ciudad donde se vende: Las Condes es una comuna de departamentos, y el
 * perro de un departamento no tiene patio.
 *
 * No dice que cuidamos perros. Dice qué le falta al perro de quien lee.
 *
 * Lleva punto final. Es una afirmación, no un rótulo.
 */
export const TAGLINE = "El patio que tu perro no tiene.";

/**
 * Las dos mitades del nombre, para la sección que lo desarma. El plural de
 * «Perros» no es casual y por eso tiene su propia entrada.
 */
export const MITADES = [
  {
    palabra: "Patio",
    significa:
      "El lugar, y la diferencia entera. Tierra, sombra y espacio en una casa de barrio, no un galpón con jaulas en un sector industrial. El perro pasa el día afuera porque hay un afuera.",
  },
  {
    palabra: "Perros",
    significa:
      "En plural, y eso es el servicio. Un perro solo en un patio sigue siendo un perro solo. Lo que se vende es que esté con otros perros, en grupos chicos y armados a mano.",
  },
] as const;

/** La descripción corta, para metadatos y para el pie de marca. */
export const DESCRIPCION =
  "Guardería de día para perros en una casa con patio, en Las Condes. Grupos chicos, juego con otros perros y la misma gente todos los días.";

/**
 * Lo que la marca todavía no puede decir, dicho acá para que ninguna pantalla
 * lo diga por descuido.
 *
 * «Hotel» describe un servicio nocturno que hoy no existe y que depende de una
 * autorización que no está resuelta. Prometerlo antes de tenerlo es la clase
 * de promesa que después hay que retirar, y una marca nueva no tiene crédito
 * para eso. `pruebas/vocabulario.ts` falla si la palabra aparece.
 */
export const PALABRAS_PROHIBIDAS = [
  { palabra: "hotel", porque: "No existe el servicio nocturno ni su autorización. Se usa cuando exista." },
  { palabra: "adiestramiento", porque: "Esto es cuidado, no entrenamiento. Prometer conducta es prometer un resultado que no se controla." },
  { palabra: "adiestrar", porque: "Misma razón que adiestramiento." },
  { palabra: "guardería canina", porque: "Nadie dice «canino» de su propio perro. Es la palabra del veterinario, no la del dueño." },
] as const;

/** Dónde vive la marca. */
export const CONTACTO = {
  instagram: "@patiodeperros",
  instagramUrl: "https://www.instagram.com/patiodeperros/",
  dominio: "patiodeperros.cl",
  comuna: "Las Condes, Santiago",
} as const;

/**
 * La razón social, que no es la marca.
 *
 * Va en la boleta, en la patente y en el aviso de privacidad. No va en la
 * fachada ni en el sitio: quien deja a su perro no compra una sociedad.
 */
export const RAZON_SOCIAL = "Plantas y Perros";

/** La marca hermana, con la que comparte casa, método y razón social. */
export const HERMANA = {
  nombre: "Plantas con Palabra",
  dominio: "plantasconpalabra.cl",
  url: "https://plantasconpalabra.cl",
} as const;

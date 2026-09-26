/**
 * Los 26 criterios del manual, en tres partes.
 *
 * La estructura es la de apetitoff.com/marca y la misma que usa Plantas con
 * Palabra, y eso es deliberado: las dos marcas comparten método aunque no
 * compartan identidad.
 *
 * Un criterio sin escribir no se esconde. Declara qué le falta y por qué, y
 * `npm run avance` los cuenta. Un manual que aparenta estar completo es peor
 * que uno que dice dónde está el hoyo, porque el primero hace que nadie lo
 * tape.
 */

export type Parte = "Estrategia" | "Identidad visual" | "Voz";

export type Criterio = {
  id: string;
  parte: Parte;
  titulo: string;
  /** La pregunta que este criterio tiene que dejar contestada. */
  pregunta: string;
  /** El texto del criterio. Vacío significa que falta, y entonces `falta` manda. */
  cuerpo?: string[];
  /** Qué le falta, dicho con todas sus letras. */
  falta?: string;
  /** El nombre de la pieza que este criterio muestra, si muestra una. */
  pieza?: string;
};

export const CRITERIOS: Criterio[] = [
  // ── Estrategia ────────────────────────────────────────────────────────────
  {
    id: "que-vende",
    parte: "Estrategia",
    titulo: "Qué vende",
    pregunta: "Si alguien pregunta qué es esto, ¿cuál es la respuesta de una frase?",
    cuerpo: [
      "Días de perro en una casa con patio. El perro llega en la mañana, pasa el día afuera con otros perros y lo retiran en la tarde.",
      "No se vende tranquilidad genérica ni cariño, que es lo que promete todo el rubro y por eso no significa nada. Se vende un lugar concreto con un tope de cupos, y la diferencia se puede ver parado en la puerta.",
    ],
  },
  {
    id: "a-quien",
    parte: "Estrategia",
    titulo: "A quién le vende",
    pregunta: "¿Quién paga, y qué problema tiene el jueves a las ocho de la mañana?",
    cuerpo: [
      "Gente que vive en departamento en el sector oriente de Santiago, trabaja fuera de la casa y tiene un perro que pasa nueve horas solo.",
      "El problema no es que el perro esté aburrido. Es la culpa de quien cierra la puerta en la mañana. Toda la comunicación le habla a esa culpa sin nombrarla, porque nombrarla es acusarlo.",
    ],
  },
  {
    id: "competencia",
    parte: "Estrategia",
    titulo: "Contra quién compite",
    pregunta: "¿Con qué se compara quien está decidiendo?",
    cuerpo: [
      "Con dejarlo solo, que es gratis y es lo que hace hoy. Con la persona que lo saca a pasear una hora. Y con las guarderías grandes, que operan en galpones y cobran parecido.",
      "Contra el galpón la ventaja es física y no hay que argumentarla: es un patio de barrio. Contra dejarlo solo la ventaja es el perro que llega cansado en la tarde, y eso se nota el primer día.",
    ],
  },
  {
    id: "promesa",
    parte: "Estrategia",
    titulo: "La promesa",
    pregunta: "¿Qué dice la marca cuando solo puede decir una cosa?",
    cuerpo: [
      "El tagline es la promesa entera y está escrito para esta ciudad: en una comuna de departamentos, el perro de quien lee no tiene patio.",
      "No dice qué hacemos. Dice qué le falta al perro de quien está leyendo, y deja que la conclusión la saque quien lee.",
    ],
    pieza: "tagline",
  },
  {
    id: "nombre",
    parte: "Estrategia",
    titulo: "El nombre",
    pregunta: "¿Qué dice el nombre, parte por parte?",
    cuerpo: [
      "Dos palabras, las dos literales, ninguna inventada. Se escribe bien al oírlo una vez, que es la prueba que ningún nombre ingenioso pasa.",
      "El plural de la segunda palabra es la mitad del servicio y por eso tiene su propia entrada abajo.",
    ],
    pieza: "mitades",
  },
  {
    id: "no-hace",
    parte: "Estrategia",
    titulo: "Lo que la marca no hace",
    pregunta: "¿Qué se niega a hacer, aunque venda menos?",
    cuerpo: [
      "Las decisiones cerradas están abajo, con su razón al lado. Son lo que hace que esto sea una marca y no una oferta.",
      "Dos de ellas cuestan ventas hoy: no nombrar un servicio que todavía no existe, y no publicar la dirección hasta que el permiso esté resuelto. Se sostienen igual, porque una promesa que hay que retirar cuesta más que la venta que trae.",
    ],
    pieza: "decisiones",
  },
  {
    id: "objetivos",
    parte: "Estrategia",
    titulo: "Los objetivos",
    pregunta: "¿Cuántos perros al día, para cuándo, y cuánto tiene que entrar?",
    falta:
      "Falta la cifra. Hay un número de trabajo, que es la ocupación con la que la casa se paga sola, pero no está confirmado contra el costo real de operación ni tiene fecha. Sin cifra y sin fecha no es un objetivo: es una intención, y el manual no guarda intenciones.",
  },
  {
    id: "arquitectura",
    parte: "Estrategia",
    titulo: "La razón social y las dos marcas",
    pregunta: "¿Qué ve el cliente y qué ve el Servicio de Impuestos Internos?",
    cuerpo: [
      "Una sola estructura legal sostiene dos marcas que operan en la misma casa, con la misma gente. La razón social va en la boleta, en la patente y en el aviso de privacidad. En la fachada, en el sitio y en las redes solo va la marca.",
      "No es un tecnicismo contable. Las dos marcas le hablan a públicos que no se eligen entre sí, y mezclarlas en el nombre le pone a cada una un filtro que la otra no necesita.",
    ],
    pieza: "arquitectura",
  },
  {
    id: "lugar",
    parte: "Estrategia",
    titulo: "El lugar",
    pregunta: "¿Por qué esta casa y no otra?",
    cuerpo: [
      "Es una casa de esquina con dos frentes y dos entradas. Los perros entran por una calle y la vivienda queda por la otra, así que el flujo de clientes no cruza la casa de quien vive ahí.",
      "Eso no es solo comodidad: es el argumento concreto cuando alguien del barrio pregunte, y es lo que permite que la marca hermana tenga su propia puerta sin que las dos operaciones se pisen.",
    ],
  },

  // ── Identidad visual ──────────────────────────────────────────────────────
  {
    id: "logotipo",
    parte: "Identidad visual",
    titulo: "El logotipo",
    pregunta: "¿Cómo se escribe el nombre, y qué no se le hace?",
    cuerpo: [
      "El nombre en la familia única del sistema, en peso semibold, con el tracking de display. No hay un archivo de logo que alguien pueda estirar: el componente fija la palabra, la familia, el peso y el color, así que los usos incorrectos clásicos no se pueden ni intentar.",
      "Lo que queda en manos de una persona está listado abajo, y cada prohibición dice si es imposible o si depende de que alguien no lo haga.",
    ],
    pieza: "logotipo",
  },
  {
    id: "isotipo",
    parte: "Identidad visual",
    titulo: "El portón",
    pregunta: "¿Qué se usa cuando el nombre no cabe?",
    cuerpo: [
      "Un cuadrado de esquinas redondeadas con un corte en un lado. Es el patio visto desde arriba, con la entrada abierta.",
      "No es un perro dibujado, y eso es la decisión. Una silueta de perro convierte cualquier marca en la de un local de mascotas y la vuelve indistinguible de las otras cuarenta del rubro. Además envejece: el perro dibujado nunca se parece al perro de quien mira.",
      "Se usa bajo el corte de tamaño del logotipo, donde el nombre completo ya no se lee.",
    ],
    pieza: "isotipo",
  },
  {
    id: "tipografia",
    parte: "Identidad visual",
    titulo: "La tipografía",
    pregunta: "¿Cuántas familias, y por qué esa cantidad?",
    cuerpo: [
      "Una sola familia, en cuatro pesos. La marca hermana usa dos porque su logotipo tiene que leerse como la tarjeta impresa que vende. Acá no hay tarjeta: hay un portón, un patio y un cartel.",
      "Un lugar se señaliza, y la señalética no cambia de familia entre el cartel de la reja y el mensaje de WhatsApp. Una familia es la decisión, no una economía.",
    ],
    pieza: "tipografia",
  },
  {
    id: "paleta",
    parte: "Identidad visual",
    titulo: "La paleta",
    pregunta: "¿De dónde salen los colores?",
    cuerpo: [
      "Del patio a media tarde: tierra pisada, sombra y ladrillo. No hay verde saturado, porque el pasto de un patio con doce perros no es verde de catálogo y la marca no va a mentir sobre eso en el color si no lo hace en el texto.",
      "El acento es el ladrillo. El verde existe solo como estado de sistema, nunca como color de marca, justamente para que nadie lo confunda con una promesa de jardín.",
    ],
    pieza: "paleta",
  },
  {
    id: "papeles",
    parte: "Identidad visual",
    titulo: "Los papeles y las tintas",
    pregunta: "¿Qué color puede ir sobre qué otro?",
    cuerpo: [
      "Ninguna pantalla nombra un color de la paleta base. Todo pasa por la capa semántica: un papel, una tinta, un acento. Así el tema oscuro no es una segunda hoja de estilos sino el mismo sistema leído al revés.",
      "Cada par de tinta sobre papel está medido, y la medición está abajo. Una prueba la vuelve a hacer en cada commit.",
    ],
    pieza: "contraste",
  },
  {
    id: "escala",
    parte: "Identidad visual",
    titulo: "La escala",
    pregunta: "¿De dónde sale cada medida?",
    cuerpo: [
      "Todo nace de cuatro píxeles. Un margen de trece es siempre un error de alguien apurado, nunca una decisión.",
      "El área mínima de un blanco táctil no es estética: bajo ese tamaño la gente falla el toque y vuelve a intentar, y quien está dejando a su perro tiene una mano ocupada con la correa.",
    ],
    pieza: "escala",
  },
  {
    id: "motivo",
    parte: "Identidad visual",
    titulo: "El motivo",
    pregunta: "¿Qué se repite en todas las piezas?",
    cuerpo: [
      "El corte del portón. La misma muesca que abre el isotipo aparece en el borde de las tarjetas de plan y en el filete que separa secciones.",
      "Es lo que hace que dos piezas que no comparten texto se reconozcan como de la misma marca.",
    ],
  },
  {
    id: "fotografia",
    parte: "Identidad visual",
    titulo: "La fotografía",
    pregunta: "¿Qué se fotografía y qué no?",
    falta:
      "Faltan las fotos y falta el patio terminado que habría que fotografiar. Lo que sí está decidido es que no se usan fotos de banco: mientras no haya una foto real, el sitio muestra un marco vacío que dice que falta, en vez de disimularlo con un perro de archivo que no vive acá. La regla completa se escribe cuando exista la primera sesión.",
  },
  {
    id: "senaletica",
    parte: "Identidad visual",
    titulo: "La señalética del portón",
    pregunta: "¿Qué dice la reja desde la vereda?",
    falta:
      "Falta, y depende de algo que no es de diseño: hasta que el permiso municipal no esté resuelto no hay cartel que poner, porque un cartel es exactamente lo que convierte una casa en un local a los ojos de quien fiscaliza. El criterio se escribe cuando haya permiso.",
  },

  // ── Voz ───────────────────────────────────────────────────────────────────
  {
    id: "como-habla",
    parte: "Voz",
    titulo: "Cómo habla",
    pregunta: "¿Quién está hablando cuando habla la marca?",
    cuerpo: [
      "Una familia que cuida perros en su casa, no una empresa de servicios. Habla en primera persona del plural y dice lo que hace y lo que no.",
      "El tono es el de alguien que te está mostrando su patio: directo, sin entusiasmo de folleto, dispuesto a decirte que tu perro no calza en el grupo.",
    ],
  },
  {
    id: "tuteo",
    parte: "Voz",
    titulo: "Español de Chile, tuteo",
    pregunta: "¿Cómo se le habla a quien lee?",
    cuerpo: [
      "De tú, en chileno. Nunca voseo: se escribe «eliges», no «elegís».",
      "Es el error que delata al texto comprado o traducido, y hay una prueba que lo mide en cada commit.",
    ],
  },
  {
    id: "no-escribe",
    parte: "Voz",
    titulo: "Lo que nunca escribe",
    pregunta: "¿Qué palabras y qué signos están fuera?",
    cuerpo: [
      "Sin guiones largos y sin emojis, en ningún texto. Las dos cosas tienen prueba que falla.",
      "Y hay palabras que no se escriben todavía, no por estilo sino porque nombran cosas que no existen o que no se controlan. Cada una está abajo con su razón, y la prueba las busca en todas las pantallas.",
    ],
    pieza: "vocabulario",
  },
  {
    id: "tipo-oracion",
    parte: "Voz",
    titulo: "Tipo oración",
    pregunta: "¿Dónde van las mayúsculas?",
    cuerpo: [
      "Tipo oración en todas partes: títulos, botones, etiquetas. Caja alta solo en los sobretítulos, que para eso tienen su propio tracking.",
      "Un botón que grita se lee como publicidad, y esto se vende en voz baja.",
    ],
  },
  {
    id: "precios",
    parte: "Voz",
    titulo: "Cómo se nombran los precios",
    pregunta: "¿Se muestran, y con cuánto detalle?",
    cuerpo: [
      "Se muestran todos, con el precio por día al lado para que se puedan comparar sin calculadora. Un rubro donde hay que escribir para saber cuánto cuesta es un rubro donde el precio da vergüenza.",
      "Ningún número de pesos se escribe a mano en una pantalla. Salen del catálogo, y una prueba falla si encuentra uno suelto.",
    ],
    pieza: "planes",
  },
  {
    id: "decir-que-no",
    parte: "Voz",
    titulo: "Cómo se dice que no",
    pregunta: "¿Cómo se rechaza a un perro sin ofender a su dueño?",
    cuerpo: [
      "Se dice del grupo, nunca del perro. «No encontramos un grupo donde encaje» en vez de «es agresivo». Lo segundo es un diagnóstico que no nos corresponde y que la persona va a repetir en la próxima guardería.",
      "El día de evaluación existe para que ese no ocurra antes de que alguien pague.",
    ],
  },
  {
    id: "primer-mensaje",
    parte: "Voz",
    titulo: "El primer mensaje",
    pregunta: "¿Con qué llega una conversación nueva?",
    cuerpo: [
      "Todos los botones del sitio abren WhatsApp con el mismo texto escrito de antemano, en primera persona de quien escribe. Nadie tiene que redactar el primer mensaje, que es donde la mitad de la gente abandona.",
      "El texto vive en el catálogo, junto al número. Cambiarlo en un lugar lo cambia en los enlaces de todo el sitio.",
    ],
  },
  {
    id: "consentimiento",
    parte: "Voz",
    titulo: "Cómo se pide el consentimiento",
    pregunta: "¿Qué se le dice a alguien cuando se le piden sus datos?",
    cuerpo: [
      "Dos casillas separadas y ninguna marcada de antemano: una para lo de acá, otra para la marca hermana. Cada una dice qué va a llegar, no solo quién lo manda.",
      "La ley de datos personales que entra en vigencia exige consentimiento específico por finalidad, y una casilla que dice «acepto recibir comunicaciones» no cubre mandar otra cosa. Nacer cumpliendo cuesta cinco minutos de redacción; arreglarlo después cuesta la base de contactos.",
    ],
  },
];

export const PARTES: Parte[] = ["Estrategia", "Identidad visual", "Voz"];

export const porParte = (parte: Parte) => CRITERIOS.filter((c) => c.parte === parte);
export const escritos = () => CRITERIOS.filter((c) => c.cuerpo?.length);
export const faltantes = () => CRITERIOS.filter((c) => !c.cuerpo?.length);

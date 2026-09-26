/**
 * El registro de decisiones.
 *
 * Una decisión sin su razón se reabre en la primera reunión donde alguien
 * tenga una idea. Con su razón escrita, reabrirla obliga a discutir la razón,
 * que es lo que uno quiere que pase.
 *
 * `cuesta` dice qué se pierde por sostenerla. Una decisión que no cuesta nada
 * no es una decisión: es una preferencia.
 */

export type Decision = {
  n: number;
  que: string;
  porque: string;
  cuesta?: string;
};

export const DECISIONES: Decision[] = [
  {
    n: 1,
    que: "No hay jaulas, y por lo tanto no hay fotos de jaulas.",
    porque:
      "El servicio es un patio. Un perro en un kennel de dos metros es exactamente lo que el cliente está tratando de evitar cuando busca una alternativa a dejarlo solo.",
  },
  {
    n: 2,
    que: "No se usan fotos de banco.",
    porque:
      "Una foto de archivo de un golden retriever en un pasto perfecto es la foto que usan las cuarenta guarderías del rubro. Mientras no haya foto real, el sitio muestra que falta.",
    cuesta: "El sitio se ve incompleto hasta la primera sesión de fotos.",
  },
  {
    n: 3,
    que: "No se promete conducta ni resultados de entrenamiento.",
    porque:
      "Esto es cuidado, no una escuela. Prometer que el perro va a volver obediente es prometer algo que depende de la casa donde vive el resto del tiempo.",
    cuesta: "Se pierde a quien busca resolver un problema de conducta pagando una guardería.",
  },
  {
    n: 4,
    que: "No se nombra el servicio nocturno hasta que exista y esté autorizado.",
    porque:
      "Depende de un permiso que no está resuelto. Una promesa que después hay que retirar cuesta más que la venta que trae, y una marca nueva no tiene crédito para eso.",
    cuesta: "Se deja fuera la demanda de vacaciones, que es la más rentable del rubro.",
  },
  {
    n: 5,
    que: "No se publica la dirección exacta mientras el permiso no esté resuelto.",
    porque:
      "Una dirección publicada es lo que convierte una casa en un local a los ojos de quien fiscaliza. Se coordina por WhatsApp, que además filtra curiosos.",
    cuesta: "No hay ficha de Google con mapa, que es de donde llega buena parte del tráfico local.",
  },
  {
    n: 6,
    que: "Sin carrito. La reserva es por WhatsApp y el pago por transferencia.",
    porque:
      "Nadie compra un cupo de guardería sin hablar antes, porque antes hay un día de evaluación. Un carrito agregaría un paso que igual termina en una conversación.",
  },
  {
    n: 7,
    que: "La marca no dibuja un perro.",
    porque:
      "Una silueta de perro vuelve la marca indistinguible de las otras del rubro, y además nunca se parece al perro de quien mira. El isotipo es el patio, no el animal.",
  },
  {
    n: 8,
    que: "El cupo se publica y es un tope, no un argumento de venta.",
    porque:
      "Un patio tiene un límite físico. Decirlo es la diferencia entre esto y un galpón con treinta perros, y es verificable parado en la puerta.",
    cuesta: "Pone un techo explícito a la facturación.",
  },
  {
    n: 9,
    que: "La razón social no aparece en la comunicación.",
    porque:
      "Quien deja a su perro no compra una sociedad. Y las dos marcas de la casa le hablan a públicos que no se eligen entre sí.",
  },
  {
    n: 10,
    que: "El día de evaluación es gratis y es obligatorio.",
    porque:
      "Es el filtro de seguridad del grupo entero. Cobrarlo lo convertiría en una venta, y la gente trataría de saltárselo.",
    cuesta: "Media mañana de trabajo por cada cliente que después puede no quedarse.",
  },
];

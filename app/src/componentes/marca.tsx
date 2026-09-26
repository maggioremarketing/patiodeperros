/**
 * Las piezas de marca.
 *
 * El logotipo, el portón y el tagline son decisiones, no componentes de
 * presentación. Por eso no reciben un color ni una familia: quien los usa no
 * puede escribirlos en otro peso ni pintarlos de otro color, porque esos
 * valores no se pasan por propiedad. Es la única forma de que una regla de
 * manual no dependa de que alguien la recuerde.
 */

import { CORTE_ISOTIPO, type TamanoLogotipo } from "@/lib/logotipo.ts";
import { NOMBRE, ORIGEN, TAGLINE } from "@/lib/marca.ts";

/**
 * El nombre, escrito como corresponde. El tamaño no es libre: es uno de los
 * escalones del sistema, así que bajar del mínimo no es algo que alguien tenga
 * que recordar no hacer, es algo que no se puede.
 */
export function Logotipo({
  tamano = "--fs-h3",
  origen = false,
  inversa = false,
}: {
  tamano?: TamanoLogotipo;
  origen?: boolean;
  inversa?: boolean;
}) {
  return (
    <span data-logotipo="" style={{ display: "inline-flex", flexDirection: "column", gap: "var(--sp-1)" }}>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: `var(${tamano})`,
          fontWeight: "var(--fw-semibold)",
          letterSpacing: "var(--ls-display)",
          lineHeight: "var(--lh-tight)",
          color: inversa ? "var(--fg-inverse)" : "var(--fg-1)",
          whiteSpace: "nowrap",
        }}
      >
        {NOMBRE}
      </span>
      {origen ? (
        <span className="sobretitulo" style={{ color: inversa ? "var(--fg-inverse)" : "var(--fg-3)" }}>
          {ORIGEN}
        </span>
      ) : null}
    </span>
  );
}

/**
 * El portón: el patio visto desde arriba, con la entrada abierta.
 *
 * Se dibuja en SVG y no con un carácter tipográfico, porque un carácter
 * depende de que la familia esté cargada y acá tiene que verse siempre. No es
 * un perro, y eso es la decisión 7.
 */
export function Porton({ tamano = 36, titulo }: { tamano?: number; titulo?: string }) {
  const borde = Math.max(2, tamano * 0.1);
  const radio = tamano * 0.24;
  const hueco = tamano * 0.3;
  const m = borde / 2;
  const lado = tamano - borde;

  // El trazo se dibuja a mano para poder dejarle la muesca del portón en el
  // lado derecho. Un rect con borde no puede tener un corte.
  const d = [
    `M ${m + radio} ${m}`,
    `H ${m + lado - radio}`,
    `A ${radio} ${radio} 0 0 1 ${m + lado} ${m + radio}`,
    `V ${m + lado / 2 - hueco / 2}`,
    `M ${m + lado} ${m + lado / 2 + hueco / 2}`,
    `V ${m + lado - radio}`,
    `A ${radio} ${radio} 0 0 1 ${m + lado - radio} ${m + lado}`,
    `H ${m + radio}`,
    `A ${radio} ${radio} 0 0 1 ${m} ${m + lado - radio}`,
    `V ${m + radio}`,
    `A ${radio} ${radio} 0 0 1 ${m + radio} ${m}`,
  ].join(" ");

  return (
    <svg
      data-logotipo=""
      width={tamano}
      height={tamano}
      viewBox={`0 0 ${tamano} ${tamano}`}
      role={titulo ? "img" : "presentation"}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
    >
      <path d={d} fill="none" stroke="var(--porton-tinta)" strokeWidth={borde} strokeLinecap="round" />
    </svg>
  );
}

/** La marca en una barra: el logotipo, o el portón si no hay espacio. */
export function Marca({ alto = 28, origen = false }: { alto?: number; origen?: boolean }) {
  return alto < CORTE_ISOTIPO ? <Porton tamano={alto} titulo={NOMBRE} /> : <Logotipo origen={origen} />;
}

/**
 * El tagline, que es la promesa y por eso no se edita en la pantalla.
 *
 * `como` existe por una razón de estructura y no de estilo: en la portada el
 * tagline es el encabezado de la página y tiene que ser un h1, porque quien
 * navega con lector de pantalla llega por los encabezados. En el manual es
 * una muestra y ahí es un párrafo.
 */
export function Tagline({ tamano = "--fs-display-m", como = "p" }: { tamano?: string; como?: "p" | "h1" }) {
  const Etiqueta = como;
  return (
    <Etiqueta
      className="justificado"
      style={{
        fontFamily: "var(--font-display)",
        fontSize: `var(${tamano})`,
        fontWeight: "var(--fw-semibold)",
        letterSpacing: "var(--ls-display)",
        lineHeight: "var(--lh-snug)",
        color: "var(--fg-1)",
      }}
    >
      {TAGLINE}
    </Etiqueta>
  );
}

/**
 * El marco vacío que dice que falta la foto.
 *
 * Es la decisión 2 hecha componente. Mientras no haya foto real del patio, el
 * sitio muestra esto y no una imagen de banco. Se ve incompleto porque está
 * incompleto, y eso es preferible a que se vea terminado y sea falso.
 */
export function FaltaFoto({ que, alto = 220 }: { que: string; alto?: number }) {
  return (
    <figure
      style={{
        margin: 0,
        height: alto,
        display: "grid",
        placeItems: "center",
        gap: "var(--sp-2)",
        background: "var(--bg-sunken)",
        border: `var(--borde-1) dashed var(--border-2)`,
        borderRadius: "var(--radio-l)",
        color: "var(--fg-3)",
        textAlign: "center",
        padding: "var(--sp-6)",
      }}
    >
      <Porton tamano={28} />
      <figcaption style={{ fontSize: "var(--fs-body-s)" }}>
        Falta la foto: {que}
      </figcaption>
    </figure>
  );
}

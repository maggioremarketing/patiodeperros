/**
 * Las piezas que el manual muestra.
 *
 * Ninguna dibuja de nuevo lo que ya existe: la paleta se lee de `colors.css`,
 * el contraste lo calcula la misma función que corre en la prueba, y los
 * precios salen del catálogo. Esa es la tesis entera del proyecto. Un manual
 * que transcribe valores a mano se desincroniza del producto en la primera
 * semana y se convierte en un documento viejo que nadie abre.
 */

import { Logotipo, Porton, Tagline } from "@/componentes/marca.tsx";
import { medir } from "@/lib/contraste.ts";
import { CORTE_ISOTIPO, MINIMO_LOGOTIPO, PROHIBIDO, TAMANOS, ZONA_LOGOTIPO } from "@/lib/logotipo.ts";
import { MITADES, PALABRAS_PROHIBIDAS, RAZON_SOCIAL, HERMANA, NOMBRE } from "@/lib/marca.ts";
import { DECISIONES } from "@/lib/decisiones.ts";
import { PLANES, pesos, porDia } from "@/lib/catalogo.ts";
import { colores, esPrimitivo, esSemantico, espaciado, familias, tipografia } from "@/lib/tokens.ts";

const mono = { fontFamily: "var(--font-mono)", fontSize: "var(--fs-body-s)" } as const;
const celda = { padding: "var(--sp-2) var(--sp-3)", borderBottom: "var(--borde-1) solid var(--filete)", textAlign: "left" as const, verticalAlign: "top" as const };

function Tabla({ cabeceras, filas }: { cabeceras: string[]; filas: React.ReactNode[][] }) {
  return (
    <div className="tabla-envoltura">
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "var(--fs-body-s)" }}>
        <thead>
          <tr>{cabeceras.map((c) => <th key={c} style={{ ...celda, color: "var(--fg-3)", fontWeight: "var(--fw-semibold)" }}>{c}</th>)}</tr>
        </thead>
        <tbody>
          {filas.map((f, i) => <tr key={i}>{f.map((c, j) => <td key={j} style={celda}>{c}</td>)}</tr>)}
        </tbody>
      </table>
    </div>
  );
}

function PiezaTagline() {
  return <div className="muestra"><Tagline tamano="--fs-h1" /></div>;
}

function PiezaMitades() {
  return (
    <Tabla
      cabeceras={["Palabra", "Qué significa"]}
      filas={MITADES.map((m) => [<strong key="p">{m.palabra}</strong>, m.significa])}
    />
  );
}

function PiezaDecisiones() {
  return (
    <Tabla
      cabeceras={["", "La decisión", "Por qué", "Qué cuesta"]}
      filas={DECISIONES.map((d) => [
        <span key="n" style={mono}>{d.n}</span>,
        <strong key="q">{d.que}</strong>,
        d.porque,
        d.cuesta ?? <span style={{ color: "var(--fg-3)" }}>Nada medible</span>,
      ])}
    />
  );
}

function PiezaArquitectura() {
  return (
    <Tabla
      cabeceras={["Capa", "Nombre", "Quién lo ve"]}
      filas={[
        ["Razón social", <strong key="a">{RAZON_SOCIAL}</strong>, "Servicio de Impuestos Internos, municipalidad, aviso de privacidad"],
        ["Marca", <strong key="b">{NOMBRE}</strong>, "Quien deja a su perro"],
        ["Marca hermana", <strong key="c">{HERMANA.nombre}</strong>, "Quien compra una planta"],
      ]}
    />
  );
}

function PiezaLogotipo() {
  return (
    <div style={{ display: "grid", gap: "var(--sp-6)" }}>
      <div className="muestra" style={{ display: "grid", gap: "var(--sp-6)", justifyItems: "start" }}>
        <Logotipo tamano="--fs-display-m" origen />
        <Logotipo tamano="--fs-h3" />
      </div>
      <Tabla
        cabeceras={["Regla", "Valor"]}
        filas={[
          ["Tamaños admitidos", <span key="t" style={mono}>{TAMANOS.join("  ")}</span>],
          ["Mínimo del logotipo", <span key="m" style={mono}>{MINIMO_LOGOTIPO} px</span>],
          ["Bajo este tamaño va el portón", <span key="c" style={mono}>{CORTE_ISOTIPO} px</span>],
          ["Zona libre alrededor", <span key="z" style={mono}>{ZONA_LOGOTIPO} del cuerpo</span>],
        ]}
      />
      <Tabla
        cabeceras={["Lo que no se hace", "Por qué", "Estado"]}
        filas={PROHIBIDO.map((p) => [
          p.que,
          p.porque,
          p.imposible
            ? <span key="i" style={{ color: "var(--success)" }}>No se puede</span>
            : <span key="d" style={{ color: "var(--fg-3)" }}>Depende de una persona</span>,
        ])}
      />
    </div>
  );
}

function PiezaIsotipo() {
  return (
    <div className="muestra" style={{ display: "flex", gap: "var(--sp-8)", alignItems: "flex-end", flexWrap: "wrap" }}>
      {[64, 40, 28, 16].map((t) => (
        <div key={t} style={{ display: "grid", gap: "var(--sp-2)", justifyItems: "center" }}>
          <Porton tamano={t} />
          <span style={{ ...mono, color: "var(--fg-3)" }}>{t} px</span>
        </div>
      ))}
    </div>
  );
}

function PiezaTipografia() {
  const escala = tipografia().filter((t) => t.nombre.startsWith("--fs-"));
  return (
    <div style={{ display: "grid", gap: "var(--sp-6)" }}>
      <div style={{ display: "grid", gap: "var(--sp-4)" }}>
        {escala.map((t) => (
          <div key={t.nombre} style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "var(--sp-2) var(--sp-4)", borderBottom: "var(--borde-1) solid var(--filete)", paddingBottom: "var(--sp-3)", minWidth: 0 }}>
            <span style={{ ...mono, color: "var(--fg-3)", minWidth: "11ch" }}>{t.nombre.replace("--fs-", "")}</span>
            <span style={{ ...mono, color: "var(--fg-3)", minWidth: "6ch" }}>{t.valor}</span>
            <span style={{ fontSize: `var(${t.nombre})`, lineHeight: "var(--lh-tight)", letterSpacing: "var(--ls-heading)", minWidth: 0, overflowWrap: "anywhere" }}>Perros en el patio</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PiezaPaleta() {
  const grupos = familias();
  return (
    <div style={{ display: "grid", gap: "var(--sp-6)" }}>
      {Object.entries(grupos).map(([familia, tokens]) => (
        <div key={familia} style={{ display: "grid", gap: "var(--sp-2)" }}>
          <p className="sobretitulo">{familia}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--sp-2)" }}>
            {tokens.map((t) => (
              <div key={t.nombre} style={{ display: "grid", gap: "var(--sp-1)", minWidth: 96 }}>
                <div style={{ height: 52, borderRadius: "var(--radio-s)", background: t.valor, border: "var(--borde-1) solid var(--border-1)" }} />
                <span style={{ ...mono, color: "var(--fg-3)" }}>{t.nombre.replace("--", "")}</span>
                <span style={{ ...mono, color: "var(--fg-3)" }}>{t.valor}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <p style={{ color: "var(--fg-3)", fontSize: "var(--fs-body-s)" }}>
        {colores().filter(esPrimitivo).length} primitivos y {colores().filter(esSemantico).length} semánticos, leídos de colors.css en la construcción.
      </p>
    </div>
  );
}

function PiezaContraste() {
  const mediciones = medir();
  return (
    <Tabla
      cabeceras={["Uso", "Tinta sobre papel", "Mínimo", "Claro", "Oscuro"]}
      filas={mediciones.map((m) => [
        m.uso,
        <span key="t" style={mono}>{m.tinta.replace("--", "")} / {m.papel.replace("--", "")}</span>,
        <span key="m" style={mono}>{m.minimo}</span>,
        <span key="c" style={{ ...mono, color: m.claro.pasa ? "var(--success)" : "var(--danger)" }}>{m.claro.razon}</span>,
        <span key="o" style={{ ...mono, color: m.oscuro.pasa ? "var(--success)" : "var(--danger)" }}>{m.oscuro.razon}</span>,
      ])}
    />
  );
}

function PiezaEscala() {
  return (
    <Tabla
      cabeceras={["Token", "Valor"]}
      filas={espaciado().map((t) => [<span key="n" style={mono}>{t.nombre.replace("--", "")}</span>, <span key="v" style={mono}>{t.valor}</span>])}
    />
  );
}

function PiezaVocabulario() {
  return (
    <Tabla
      cabeceras={["No se escribe", "Por qué"]}
      filas={PALABRAS_PROHIBIDAS.map((p) => [<strong key="p">{p.palabra}</strong>, p.porque])}
    />
  );
}

function PiezaPlanes() {
  return (
    <Tabla
      cabeceras={["Plan", "Días", "Precio", "Por día"]}
      filas={PLANES.map((p) => [p.nombre, <span key="d" style={mono}>{p.dias}</span>, <span key="p" style={mono}>{pesos(p.precio)}</span>, <span key="x" style={mono}>{pesos(porDia(p))}</span>])}
    />
  );
}

/** El índice de piezas. Un criterio nombra una y el armazón la busca acá. */
export const PIEZAS: Record<string, () => React.ReactNode> = {
  tagline: PiezaTagline,
  mitades: PiezaMitades,
  decisiones: PiezaDecisiones,
  arquitectura: PiezaArquitectura,
  logotipo: PiezaLogotipo,
  isotipo: PiezaIsotipo,
  tipografia: PiezaTipografia,
  paleta: PiezaPaleta,
  contraste: PiezaContraste,
  escala: PiezaEscala,
  vocabulario: PiezaVocabulario,
  planes: PiezaPlanes,
};

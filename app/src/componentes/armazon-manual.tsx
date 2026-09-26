/**
 * El armazón del manual: menú lateral fijo y una columna de lectura.
 *
 * El menú es fijo porque un manual se consulta, no se lee de corrido. Quien lo
 * abre viene a buscar una cosa y tiene que poder llegar sin volver arriba.
 */

import Link from "next/link";
import { CRITERIOS, PARTES, escritos, faltantes, porParte, type Criterio } from "@/lib/criterios.ts";
import { PIEZAS } from "@/componentes/manual/piezas.tsx";
import { Marca } from "@/componentes/marca.tsx";
import { BotonTema } from "@/componentes/tema.tsx";

function Bloque({ criterio }: { criterio: Criterio }) {
  const Pieza = criterio.pieza ? PIEZAS[criterio.pieza] : undefined;

  return (
    <section id={criterio.id} style={{ display: "grid", gap: "var(--sp-4)", scrollMarginTop: "var(--sp-6)" }}>
      <div style={{ display: "grid", gap: "var(--sp-2)" }}>
        <h3 style={{ fontSize: "var(--fs-h2)" }}>{criterio.titulo}</h3>
        <p className="justificado" style={{ color: "var(--fg-3)", fontStyle: "italic" }}>{criterio.pregunta}</p>
      </div>

      {criterio.cuerpo?.map((p, i) => (
        <p key={i} className="justificado" style={{ color: "var(--fg-2)" }}>{p}</p>
      ))}

      {criterio.falta ? (
        <div style={{ borderLeft: "var(--borde-2) solid var(--danger)", paddingLeft: "var(--sp-5)", display: "grid", gap: "var(--sp-2)" }}>
          <p className="sobretitulo" style={{ color: "var(--danger)" }}>Sin escribir</p>
          <p className="justificado" style={{ color: "var(--fg-2)" }}>{criterio.falta}</p>
        </div>
      ) : null}

      {Pieza ? <div style={{ marginTop: "var(--sp-2)" }}><Pieza /></div> : null}
    </section>
  );
}

export function ArmazonManual() {
  const total = CRITERIOS.length;
  const hechos = escritos().length;
  const pendientes = faltantes().length;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr)", gap: 0 }}>
      <header style={{ borderBottom: "var(--borde-1) solid var(--filete)", position: "sticky", top: 0, background: "var(--bg-page)", zIndex: 2 }}>
        <div className="envoltura barra">
          <Link href="/" className="enlace-toque" style={{ textDecoration: "none" }}><Marca /></Link>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-3)" }}>
            <span style={{ color: "var(--fg-3)", fontSize: "var(--fs-body-s)" }}>{hechos} de {total} escritos</span>
            <BotonTema />
          </div>
        </div>
      </header>

      <div className="envoltura manual">
        <nav aria-label="Criterios del manual" className="manual-indice">
          {PARTES.map((parte) => (
            <div key={parte} style={{ display: "grid", gap: "var(--sp-2)" }}>
              <p className="sobretitulo">{parte}</p>
              <ul>
                {porParte(parte).map((c) => (
                  <li key={c.id}>
                    <a href={`#${c.id}`} data-falta={c.cuerpo?.length ? "no" : "si"}>
                      {c.titulo}{c.cuerpo?.length ? "" : " ·"}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <main className="manual-cuerpo">
          <div style={{ display: "grid", gap: "var(--sp-4)" }}>
            <p className="sobretitulo">Manual de marca</p>
            <h1 style={{ fontSize: "var(--fs-display-m)", letterSpacing: "var(--ls-display)" }}>Cómo se ve, cómo habla y qué se niega a hacer</h1>
            <p className="justificado" style={{ color: "var(--fg-2)", fontSize: "var(--fs-body-l)" }}>
              {total} criterios en tres partes. {hechos} están escritos y {pendientes} declaran qué les falta, porque un manual que aparenta estar completo hace que nadie tape el hoyo.
            </p>
            <p className="justificado" style={{ color: "var(--fg-3)", fontSize: "var(--fs-body-s)" }}>
              Todo lo que se muestra acá sale del mismo sistema que construye el sitio. La paleta se lee de los tokens, el contraste lo calcula la misma función que corre en las pruebas y los precios salen del catálogo. No se puede desincronizar del producto.
            </p>
          </div>

          {PARTES.map((parte) => (
            <div key={parte} style={{ display: "grid", gap: "var(--sp-12)" }}>
              <div>
                <hr className="filete" style={{ margin: "0 0 var(--sp-6)" }} />
                <h2 style={{ fontSize: "var(--fs-h1)" }}>{parte}</h2>
              </div>
              {porParte(parte).map((c) => <Bloque key={c.id} criterio={c} />)}
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}

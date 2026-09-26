import Link from "next/link";
import { FaltaFoto, Logotipo, Marca, Porton, Tagline } from "@/componentes/marca.tsx";
import { BotonTema } from "@/componentes/tema.tsx";
import { CUPOS, EVALUACION, PLANES, REQUISITOS, enlaceWhatsapp, pesos, porDia } from "@/lib/catalogo.ts";
import { CONTACTO, DESCRIPCION, HERMANA, MITADES, NOMBRE } from "@/lib/marca.ts";
import { DECISIONES } from "@/lib/decisiones.ts";

/**
 * La portada.
 *
 * El orden no es casual: primero qué le falta al perro de quien lee, después
 * qué es esto, después cómo se entra, y el precio antes del pie. Un sitio de
 * servicio que esconde el precio obliga a escribir para saber cuánto cuesta, y
 * la mitad de la gente no escribe.
 */
export default function Portada() {
  const visibles = DECISIONES.filter((d) => [1, 3, 8, 10].includes(d.n));

  return (
    <>
      <header style={{ borderBottom: "var(--borde-1) solid var(--filete)" }}>
        <div className="envoltura barra">
          <Marca origen />
          <nav style={{ display: "flex", alignItems: "center", gap: "var(--sp-3)" }}>
            <BotonTema />
            <a className="boton" href={enlaceWhatsapp()}>Pedir un cupo</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="envoltura" style={{ padding: "var(--sp-20) var(--sp-6) var(--sp-16)", display: "grid", gap: "var(--sp-6)" }}>
          <p className="sobretitulo">Guardería de día · {CONTACTO.comuna}</p>
          <Tagline como="h1" />
          <p className="justificado" style={{ fontSize: "var(--fs-body-l)", color: "var(--fg-2)" }}>{DESCRIPCION}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--sp-3)", marginTop: "var(--sp-2)" }}>
            <a className="boton" href={enlaceWhatsapp()}>Pedir un cupo</a>
            <a className="boton boton--calado" href={enlaceWhatsapp("Hola, quiero agendar el día de evaluación.")}>Agendar la evaluación</a>
          </div>
          <p style={{ color: "var(--fg-3)", fontSize: "var(--fs-body-s)" }}>
            {CUPOS.porDia} cupos por día, en grupos de hasta {CUPOS.porGrupo}. Cuando están tomados, están tomados.
          </p>
        </section>

        <section className="envoltura" style={{ paddingBottom: "var(--sp-16)" }}>
          <FaltaFoto que="el patio, con perros de verdad y en un día cualquiera" alto={280} />
        </section>

        <section className="envoltura" style={{ paddingBottom: "var(--sp-20)", display: "grid", gap: "var(--sp-8)" }}>
          <h2 style={{ fontSize: "var(--fs-h1)" }}>Dos palabras, las dos literales</h2>
          <div style={{ display: "grid", gap: "var(--sp-6)", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" }}>
            {MITADES.map((m) => (
              <article key={m.palabra} className="porton-corte" style={{ padding: "var(--sp-8)" }}>
                <h3 style={{ fontSize: "var(--fs-h2)", marginBottom: "var(--sp-3)" }}>{m.palabra}</h3>
                <p className="justificado" style={{ color: "var(--fg-2)" }}>{m.significa}</p>
              </article>
            ))}
          </div>
        </section>

        <section style={{ background: "var(--bg-sunken)", padding: "var(--sp-20) 0" }}>
          <div className="envoltura" style={{ display: "grid", gap: "var(--sp-6)" }}>
            <p className="sobretitulo">Antes del primer día</p>
            <h2 style={{ fontSize: "var(--fs-h1)" }}>{EVALUACION.nombre}, gratis y obligatorio</h2>
            <p className="justificado" style={{ color: "var(--fg-2)", fontSize: "var(--fs-body-l)" }}>{EVALUACION.detalle}</p>
            <ul className="justificado" style={{ color: "var(--fg-2)", paddingLeft: "var(--sp-5)", display: "grid", gap: "var(--sp-2)" }}>
              {REQUISITOS.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </div>
        </section>

        <section className="envoltura" style={{ padding: "var(--sp-20) var(--sp-6)", display: "grid", gap: "var(--sp-8)" }}>
          <div style={{ display: "grid", gap: "var(--sp-3)" }}>
            <h2 style={{ fontSize: "var(--fs-h1)" }}>Lo que cuesta</h2>
            <p className="justificado" style={{ color: "var(--fg-2)" }}>
              Con el precio por día al lado, para que puedas comparar sin sacar la calculadora.
            </p>
          </div>
          <div style={{ display: "grid", gap: "var(--sp-4)", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))" }}>
            {PLANES.map((p) => (
              <article key={p.id} className="porton-corte" style={{ padding: "var(--sp-6)", display: "grid", gap: "var(--sp-2)", alignContent: "start" }}>
                <h3 style={{ fontSize: "var(--fs-h4)" }}>{p.nombre}</h3>
                <p style={{ fontSize: "var(--fs-h2)", fontWeight: "var(--fw-bold)", letterSpacing: "var(--ls-heading)" }}>{pesos(p.precio)}</p>
                <p style={{ color: "var(--fg-3)", fontSize: "var(--fs-body-s)" }}>{pesos(porDia(p))} por día</p>
                <p className="justificado" style={{ color: "var(--fg-2)", fontSize: "var(--fs-body-s)" }}>{p.detalle}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="envoltura" style={{ paddingBottom: "var(--sp-20)", display: "grid", gap: "var(--sp-6)" }}>
          <h2 style={{ fontSize: "var(--fs-h1)" }}>Lo que no hacemos</h2>
          <div style={{ display: "grid", gap: "var(--sp-5)" }}>
            {visibles.map((d) => (
              <div key={d.n} style={{ display: "grid", gap: "var(--sp-1)", borderLeft: "var(--borde-2) solid var(--accent)", paddingLeft: "var(--sp-5)" }}>
                <p style={{ fontWeight: "var(--fw-semibold)" }}>{d.que}</p>
                <p className="justificado" style={{ color: "var(--fg-2)" }}>{d.porque}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer style={{ background: "var(--bg-inverse)", padding: "var(--sp-16) 0" }}>
        <div className="envoltura" style={{ display: "grid", gap: "var(--sp-6)" }}>
          <Logotipo tamano="--fs-h2" origen inversa />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--sp-6)", color: "var(--fg-inverse)", fontSize: "var(--fs-body-s)" }}>
            <a className="enlace-toque" href={enlaceWhatsapp()} style={{ color: "var(--fg-inverse)" }}>WhatsApp</a>
            <a className="enlace-toque" href={CONTACTO.instagramUrl} style={{ color: "var(--fg-inverse)" }}>{CONTACTO.instagram}</a>
            <Link className="enlace-toque" href="/marca" style={{ color: "var(--fg-inverse)" }}>Manual de marca</Link>
            <a className="enlace-toque" href={HERMANA.url} style={{ color: "var(--fg-inverse)" }}>{HERMANA.nombre}</a>
          </div>
          <p style={{ color: "var(--fg-inverse)", opacity: .75, fontSize: "var(--fs-caption)", display: "flex", alignItems: "center", gap: "var(--sp-2)" }}>
            <Porton tamano={16} /> {NOMBRE} · {CONTACTO.dominio}
          </p>
        </div>
      </footer>
    </>
  );
}

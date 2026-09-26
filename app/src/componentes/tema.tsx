"use client";

import { useEffect, useState } from "react";

/**
 * El tema se aplica antes del primer pintado. Sin esto, entrar con el tema
 * oscuro elegido muestra un destello de papel claro, que es el tipo de detalle
 * que hace que un sitio se sienta barato sin que nadie sepa decir por qué.
 */
export const GUION_TEMA = `(function(){try{var t=localStorage.getItem("tema");if(t)document.documentElement.dataset.tema=t}catch(e){}})()`;

export function BotonTema() {
  const [tema, setTema] = useState<string | null>(null);

  useEffect(() => {
    setTema(document.documentElement.dataset.tema ?? null);
  }, []);

  function alternar() {
    const actual = document.documentElement.dataset.tema;
    const oscuroPorSistema = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const siguiente = actual ? (actual === "claro" ? "oscuro" : "claro") : oscuroPorSistema ? "claro" : "oscuro";
    document.documentElement.dataset.tema = siguiente;
    try {
      localStorage.setItem("tema", siguiente);
    } catch {}
    setTema(siguiente);
  }

  return (
    <button className="toque" onClick={alternar} aria-label="Cambiar entre tema claro y oscuro"
      style={{ background: "transparent", border: "var(--borde-1) solid var(--border-1)", borderRadius: "var(--radio-m)", color: "var(--fg-2)", cursor: "pointer", font: "inherit", fontSize: "var(--fs-body-s)", padding: "0 var(--sp-3)" }}>
      {tema === "oscuro" ? "Claro" : "Oscuro"}
    </button>
  );
}

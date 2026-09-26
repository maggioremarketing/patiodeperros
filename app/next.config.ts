import type { NextConfig } from "next";

/**
 * El sitio se exporta como archivos planos. No hay servidor que mantener, no
 * hay base de datos que respaldar y el hosting es intercambiable. Es la misma
 * decision que en Plantas con Palabra y por la misma razon: un negocio chico
 * no puede permitirse una pieza de infraestructura que solo una persona sabe
 * levantar.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;

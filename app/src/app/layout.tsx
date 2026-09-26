import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { DESCRIPCION, NOMBRE, TAGLINE } from "@/lib/marca.ts";
import { GUION_TEMA } from "@/componentes/tema.tsx";
import "./globals.css";

/**
 * La familia única del sistema. Llega con next/font para que el navegador no
 * tenga que pedirle nada a un tercero y la tipografía no parpadee.
 */
const unica = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--fuente-unica",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://patiodeperros.cl"),
  title: { default: `${NOMBRE} · ${TAGLINE.toLowerCase()}`, template: `%s · ${NOMBRE}` },
  description: DESCRIPCION,
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: NOMBRE,
    title: `${NOMBRE} · ${TAGLINE.toLowerCase()}`,
    description: DESCRIPCION,
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={unica.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: GUION_TEMA }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

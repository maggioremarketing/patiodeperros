import type { Metadata } from "next";
import { ArmazonManual } from "@/componentes/armazon-manual.tsx";

export const metadata: Metadata = {
  title: "Manual de marca",
  description: "Cómo se ve, cómo habla y qué se niega a hacer. Generado desde los mismos tokens que construyen el sitio.",
};

export default function Manual() {
  return <ArmazonManual />;
}

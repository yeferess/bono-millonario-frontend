import { notFound } from "next/navigation";
import { ApiError, obtenerResultado } from "@/lib/api";
import { ResultadoDetalle } from "@/components/ResultadoDetalle";
import { Encabezado } from "@/components/Encabezado";
import { LogoHero } from "@/components/LogoHero";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const revalidate = 60;

export default async function ResultadoDetallePage({
  params,
}: {
  params: { id: string };
}) {
  let sorteo;
  try {
    sorteo = await obtenerResultado(params.id);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      notFound();
    }
    throw err;
  }

  return (
    <>
      <Navbar />
      <main className="contenedor-pagina">
        <LogoHero />
        <Encabezado titulo={sorteo.nombre_juego} volverA="/historial" />
        <ResultadoDetalle sorteo={sorteo} />
      </main>
      <Footer />
    </>
  );
}

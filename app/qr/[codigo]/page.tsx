import { notFound } from "next/navigation";
import { ApiError, resolverCodigoQR } from "@/lib/api";
import { ResultadoDetalle } from "@/components/ResultadoDetalle";
import { Encabezado } from "@/components/Encabezado";
import { BotonEnlace } from "@/components/Boton";
import { LogoHero } from "@/components/LogoHero";
import { IntroSplash } from "@/components/IntroSplash";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Ruta a la que apunta el QR impreso en el cartón físico.
// IMPORTANTE: el código identifica un SORTEO específico (no "el último
// resultado"), por eso cada sorteo tiene su propio QR generado al crearlo.
export const revalidate = 30;

export default async function ResultadoPorQRPage({
  params,
}: {
  params: { codigo: string };
}) {
  let sorteo;
  try {
    sorteo = await resolverCodigoQR(params.codigo);
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
        <IntroSplash />
        <LogoHero />
        <Encabezado titulo="Resultado del sorteo" />
        <ResultadoDetalle sorteo={sorteo} />
        <div className="mt-6">
          <BotonEnlace href="/historial" variante="secundario">
            Ver historial sorteos
          </BotonEnlace>
        </div>
      </main>
      <Footer />
    </>
  );
}

import Link from "next/link";
import { obtenerHistorial } from "@/lib/api";
import { Encabezado } from "@/components/Encabezado";
import { FiltroFecha } from "@/components/FiltroFecha";
import { TarjetaHistorialItem } from "@/components/TarjetaHistorialItem";
import { LogoHero } from "@/components/LogoHero";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const revalidate = 60;

export default async function HistorialPage({
  searchParams,
}: {
  searchParams: { fecha?: string; page?: string };
}) {
  const pagina = Number(searchParams.page ?? "1") || 1;
  const historial = await obtenerHistorial({
    fecha: searchParams.fecha,
    page: pagina,
  });

  return (
    <>
      <Navbar />
      <main className="contenedor-pagina">
        <LogoHero />
        <Encabezado titulo="Historial de sorteos" volverA="/" />
        <FiltroFecha />

        {historial.results.length === 0 ? (
          <p className="tarjeta text-center text-lg text-neutral-600">
            Aún no tenemos los sorteos de esta fecha.
          </p>
        ) : (
          <div className="space-y-3">
            {historial.results.map((item) => (
              <TarjetaHistorialItem key={item.id} item={item} />
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-between">
          {historial.previous ? (
            <Link
              href={`/historial?${new URLSearchParams({
                ...(searchParams.fecha ? { fecha: searchParams.fecha } : {}),
                page: String(pagina - 1),
              })}`}
              className="min-h-touch rounded-lg bg-neutral-100 px-4 py-2 font-semibold"
            >
              ← Anteriores
            </Link>
          ) : (
            <span />
          )}
          {historial.next && (
            <Link
              href={`/historial?${new URLSearchParams({
                ...(searchParams.fecha ? { fecha: searchParams.fecha } : {}),
                page: String(pagina + 1),
              })}`}
              className="min-h-touch rounded-lg bg-neutral-100 px-4 py-2 font-semibold"
            >
              Siguientes →
            </Link>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

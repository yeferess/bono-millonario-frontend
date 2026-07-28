import { listarSorteosAdmin } from "@/lib/admin-data";
import { LogoHero } from "@/components/LogoHero";
import { NavAdmin } from "@/components/NavAdmin";
import { FilaSorteoAdmin } from "@/components/FilaSorteoAdmin";
import { FiltrosSorteosAdmin } from "@/components/FiltrosSorteosAdmin";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: { page?: string; fecha?: string; estado?: string };
}) {
  const pagina = Number(searchParams.page ?? "1") || 1;
  const datos = await listarSorteosAdmin({
    page: pagina,
    fecha: searchParams.fecha,
    estado: searchParams.estado,
  });

  return (
    <main className="contenedor-pagina">
      <LogoHero />
      <NavAdmin />
      <h1 className="titulo-seccion mb-4">Sorteos ({datos.count})</h1>

      <FiltrosSorteosAdmin />

      {datos.results.length === 0 ? (
        <p className="tarjeta text-center text-lg text-neutral-600">
          Aún no hay sorteos creados.
        </p>
      ) : (
        <div className="space-y-3">
          {datos.results.map((sorteo) => (
            <FilaSorteoAdmin key={sorteo.id} sorteo={sorteo} />
          ))}
        </div>
      )}
    </main>
  );
}

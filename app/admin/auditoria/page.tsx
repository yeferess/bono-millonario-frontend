import { listarAuditoria } from "@/lib/admin-data";
import { NavAdmin } from "@/components/NavAdmin";

export const dynamic = "force-dynamic";

function formatearFechaHora(iso: string) {
  return new Date(iso).toLocaleString("es", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export default async function AuditoriaPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const pagina = Number(searchParams.page ?? "1") || 1;
  const datos = await listarAuditoria({ page: pagina });

  return (
    <main className="contenedor-pagina">
      <NavAdmin />
      <h1 className="titulo-seccion mb-4">Registro de auditoría</h1>

      {datos.results.length === 0 ? (
        <p className="tarjeta text-center text-lg text-neutral-600">
          Sin actividad registrada.
        </p>
      ) : (
        <div className="space-y-2">
          {datos.results.map((log) => (
            <div key={log.id} className="tarjeta">
              <p className="text-base font-semibold text-neutral-900">
                {log.accion} · {log.entidad_afectada}
                {log.entidad_id ? ` #${log.entidad_id}` : ""}
              </p>
              <p className="etiqueta">
                {log.administrador ?? "Sistema"} ·{" "}
                {formatearFechaHora(log.creado_en)}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

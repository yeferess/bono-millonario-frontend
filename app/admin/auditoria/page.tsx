import { listarAuditoria } from "@/lib/admin-data";
import { NavAdmin } from "@/components/NavAdmin";
// Nota importante: este cambio silencia cualquier error de esa llamada (no solo el 404 actual), con el Try
// catch quitamos cualquier error de respuesta mientras no se construya la vista


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

  let datos: Awaited<ReturnType<typeof listarAuditoria>> | null = null;
  try {
    datos = await listarAuditoria({ page: pagina });
  } catch {
    datos = null;
  }

  return (
    <main className="contenedor-pagina">
      <NavAdmin />
      <h1 className="titulo-seccion mb-4">Registro de auditoría</h1>

      {datos === null ? (
        <div className="tarjeta text-center">
          <p className="text-lg font-semibold text-neutral-700">
            Auditoría en construcción
          </p>
          <p className="text-sm text-neutral-500">
            Esta sección estará disponible próximamente.
          </p>
        </div>
      ) : datos.results.length === 0 ? (
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
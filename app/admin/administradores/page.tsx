import { listarAdministradores, obtenerAdministradorActual } from "@/lib/admin-data";
import { NavAdmin } from "@/components/NavAdmin";
import { Encabezado } from "@/components/Encabezado";
import { BotonEnlace } from "@/components/Boton";
import { FilaAdministrador } from "@/components/FilaAdministrador";

export const dynamic = "force-dynamic";

export default async function AdministradoresPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const pagina = Number(searchParams.page ?? "1") || 1;
  const [datos, actual] = await Promise.all([
    listarAdministradores(pagina),
    obtenerAdministradorActual(),
  ]);

  return (
    <main className="contenedor-pagina">
      <NavAdmin />
      <Encabezado titulo={`Administradores (${datos.count})`} volverA="/admin/dashboard" />

      <div className="mb-4">
        <BotonEnlace href="/admin/administradores/nuevo">
          Nuevo administrador
        </BotonEnlace>
      </div>

      {datos.results.length === 0 ? (
        <p className="tarjeta text-center text-lg text-neutral-600">
          Aún no hay administradores registrados.
        </p>
      ) : (
        <div className="space-y-3">
          {datos.results.map((administrador) => (
            <FilaAdministrador
              key={administrador.id}
              administrador={administrador}
              esUsuarioActual={administrador.id === actual.id}
            />
          ))}
        </div>
      )}
    </main>
  );
}

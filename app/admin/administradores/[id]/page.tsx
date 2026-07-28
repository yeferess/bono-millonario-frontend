import { notFound } from "next/navigation";
import { obtenerAdministradorAdmin } from "@/lib/admin-data";
import { NavAdmin } from "@/components/NavAdmin";
import { Encabezado } from "@/components/Encabezado";
import { FormularioAdministrador } from "@/components/FormularioAdministrador";

export const dynamic = "force-dynamic";

export default async function EditarAdministradorPage({
  params,
}: {
  params: { id: string };
}) {
  let administrador;
  try {
    administrador = await obtenerAdministradorAdmin(params.id);
  } catch {
    notFound();
  }

  return (
    <main className="contenedor-pagina">
      <NavAdmin />
      <Encabezado titulo={administrador.usuario} volverA="/admin/administradores" />
      <FormularioAdministrador administrador={administrador} />
    </main>
  );
}

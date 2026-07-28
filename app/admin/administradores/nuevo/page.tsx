import { NavAdmin } from "@/components/NavAdmin";
import { Encabezado } from "@/components/Encabezado";
import { FormularioAdministrador } from "@/components/FormularioAdministrador";

export default function NuevoAdministradorPage() {
  return (
    <main className="contenedor-pagina">
      <NavAdmin />
      <Encabezado titulo="Nuevo administrador" volverA="/admin/administradores" />
      <FormularioAdministrador />
    </main>
  );
}

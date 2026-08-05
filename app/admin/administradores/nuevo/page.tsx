import { EncabezadoAdmin } from "@/components/EncabezadoAdmin";
import { Encabezado } from "@/components/Encabezado";
import { FormularioAdministrador } from "@/components/FormularioAdministrador";

export default function NuevoAdministradorPage() {
  return (
    <main className="contenedor-pagina">
      <EncabezadoAdmin />
      <Encabezado titulo="Nuevo administrador" volverA="/admin/administradores" />
      <FormularioAdministrador />
    </main>
  );
}

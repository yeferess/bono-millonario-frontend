import { NavAdmin } from "@/components/NavAdmin";
import { Encabezado } from "@/components/Encabezado";
import { FormularioSorteo } from "@/components/FormularioSorteo";

export default function NuevoSorteoPage() {
  return (
    <main className="contenedor-pagina">
      <NavAdmin />
      <Encabezado titulo="Nuevo sorteo" volverA="/admin/dashboard" />
      <FormularioSorteo />
    </main>
  );
}

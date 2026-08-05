import { EncabezadoAdmin } from "@/components/EncabezadoAdmin";
import { Encabezado } from "@/components/Encabezado";
import { FormularioSorteo } from "@/components/FormularioSorteo";

export default function NuevoSorteoPage() {
  return (
    <main className="contenedor-pagina">
      <EncabezadoAdmin />
      <Encabezado titulo="Nuevo sorteo" volverA="/admin/dashboard" />
      <FormularioSorteo />
    </main>
  );
}

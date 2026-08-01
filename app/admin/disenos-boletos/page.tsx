import { listarDisenosBoletoAdmin } from "@/lib/admin-data";
import { NavAdmin } from "@/components/NavAdmin";
import { Encabezado } from "@/components/Encabezado";
import { GaleriaDisenosBoleto } from "@/components/GaleriaDisenosBoleto";

export const dynamic = "force-dynamic";

export default async function DisenosBoletoPage() {
  const disenos = await listarDisenosBoletoAdmin();
  const disenosDelante = disenos.filter((d) => d.tipo === "delante");
  const disenosAtras = disenos.filter((d) => d.tipo === "atras");

  return (
    <main className="contenedor-pagina">
      <NavAdmin />
      <Encabezado titulo="Diseños de boletos" volverA="/admin/dashboard" />

      <div className="space-y-4">
        <GaleriaDisenosBoleto titulo="Delante" tipo="delante" disenos={disenosDelante} />
        <GaleriaDisenosBoleto titulo="Atras" tipo="atras" disenos={disenosAtras} />
      </div>
    </main>
  );
}

import { notFound } from "next/navigation";
import { obtenerSorteoAdmin } from "@/lib/admin-data";
import { NavAdmin } from "@/components/NavAdmin";
import { Encabezado } from "@/components/Encabezado";
import { FormularioSorteo } from "@/components/FormularioSorteo";
import { TarjetaQR } from "@/components/TarjetaQR";
import { BotonesHojaImpresion } from "@/components/BotonesHojaImpresion";
import { SubirImagen } from "@/components/SubirImagen";
import { GaleriaImagenes } from "@/components/GaleriaImagenes";

export const dynamic = "force-dynamic";

export default async function EditarSorteoPage({
  params,
}: {
  params: { id: string };
}) {
  let sorteo;
  try {
    sorteo = await obtenerSorteoAdmin(params.id);
  } catch {
    notFound();
  }

  return (
    <main className="contenedor-pagina">
      <NavAdmin />
      <Encabezado titulo={sorteo.nombre_juego} volverA="/admin/dashboard" />

      <div className="space-y-4">
        <FormularioSorteo sorteo={sorteo} />
        <TarjetaQR sorteoId={sorteo.id} codigoQR={sorteo.codigo_qr} />
        <BotonesHojaImpresion
          sorteoId={sorteo.id}
          tieneCodigoQR={Boolean(sorteo.codigo_qr)}
        />
        <SubirImagen
          sorteoId={sorteo.id}
          tipo="resultado"
          etiqueta="Imagen oficial del resultado"
        />
        <SubirImagen
          sorteoId={sorteo.id}
          tipo="ganador"
          etiqueta="Foto del ganador"
        />

        <GaleriaImagenes
          titulo="Imágenes del resultado"
          imagenes={sorteo.imagenes?.filter((img) => img.tipo === "resultado")}
        />
        <GaleriaImagenes
          titulo="Fotos del ganador"
          imagenes={sorteo.imagenes?.filter((img) => img.tipo === "ganador")}
        />
      </div>
    </main>
  );
}

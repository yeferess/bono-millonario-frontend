import { notFound } from "next/navigation";
import { obtenerSorteoAdmin } from "@/lib/admin-data";
import { EncabezadoAdmin } from "@/components/EncabezadoAdmin";
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
      <EncabezadoAdmin />
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
          tipo="sorteo"
          etiqueta="Imagen del sorteo"
        />
        <SubirImagen
          sorteoId={sorteo.id}
          tipo="numero_ganador"
          etiqueta="Imagen del número ganador"
        />
        <SubirImagen
          sorteoId={sorteo.id}
          tipo="ganador"
          etiqueta="Foto del ganador"
        />
        <SubirImagen
          sorteoId={sorteo.id}
          tipo="vendedor"
          etiqueta="Foto del vendedor"
        />

        <GaleriaImagenes
          titulo="Imágenes del sorteo"
          imagenes={sorteo.imagenes?.filter((img) => img.tipo === "sorteo")}
        />
        <GaleriaImagenes
          titulo="Imagen del número ganador"
          imagenes={sorteo.imagenes?.filter((img) => img.tipo === "numero_ganador")}
        />
        <GaleriaImagenes
          titulo="Fotos del ganador"
          imagenes={sorteo.imagenes?.filter((img) => img.tipo === "ganador")}
        />
        <GaleriaImagenes
          titulo="Fotos del vendedor"
          imagenes={sorteo.imagenes?.filter((img) => img.tipo === "vendedor")}
        />
      </div>
    </main>
  );
}

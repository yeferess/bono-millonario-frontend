import type { ImagenResultado } from "@/lib/types";

// Grilla de miniaturas para un solo tipo de imagen (resultado o ganador) en
// el panel admin. Se usa dos veces en la página de edición del sorteo, una
// por tipo, para que quede claro cuál imagen es cuál.
export function GaleriaImagenes({
  titulo,
  imagenes,
}: {
  titulo: string;
  imagenes?: ImagenResultado[];
}) {
  if (!imagenes || imagenes.length === 0) return null;

  return (
    <div className="tarjeta">
      <p className="etiqueta mb-2">{titulo}</p>
      <div className="grid grid-cols-3 gap-2">
        {imagenes.map((img) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={img.id}
            src={img.url_optimizada || img.url_original}
            alt={titulo}
            className="aspect-square w-full rounded-lg object-cover"
          />
        ))}
      </div>
    </div>
  );
}

import type { DisenoBoleto, TipoDisenoBoleto } from "@/lib/types";
import { SubirDisenoBoleto } from "./SubirDisenoBoleto";
import { TarjetaDisenoBoleto } from "./TarjetaDisenoBoleto";

// Galería de diseños de un solo tipo (delante o atrás) para el panel admin:
// subida propia + miniaturas con acciones (usar/eliminar/descargar).
export function GaleriaDisenosBoleto({
  titulo,
  tipo,
  disenos,
}: {
  titulo: string;
  tipo: TipoDisenoBoleto;
  disenos: DisenoBoleto[];
}) {
  return (
    <section className="tarjeta space-y-3">
      <p className="etiqueta">{titulo}</p>
      <SubirDisenoBoleto tipo={tipo} etiqueta={`Subir diseño ${titulo.toLowerCase()}`} />

      {disenos.length === 0 ? (
        <p className="text-base text-neutral-500">
          Aún no hay diseños en esta galería.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {disenos.map((diseno) => (
            <TarjetaDisenoBoleto key={diseno.id} diseno={diseno} />
          ))}
        </div>
      )}
    </section>
  );
}

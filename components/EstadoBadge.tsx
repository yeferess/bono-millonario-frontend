import type { EstadoSorteo } from "@/lib/types";

const estilos: Record<EstadoSorteo, string> = {
  publicado: "bg-green-100 text-green-800",
  borrador: "bg-yellow-100 text-yellow-800",
  oculto: "bg-neutral-200 text-neutral-600",
};

const etiquetas: Record<EstadoSorteo, string> = {
  publicado: "Publicado",
  borrador: "Pendiente",
  oculto: "Oculto",
};

export function EstadoBadge({ estado }: { estado: EstadoSorteo }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${estilos[estado]}`}
    >
      {etiquetas[estado]}
    </span>
  );
}

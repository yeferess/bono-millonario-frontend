import Link from "next/link";
import type { ResultadoHistorialItem } from "@/lib/types";
import { fraunces } from "@/lib/fonts";
import { EstadoBadge } from "./EstadoBadge";

function formatearFechaCorta(fecha: string) {
  const d = new Date(`${fecha}T00:00:00`);
  return d.toLocaleDateString("es", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function TarjetaHistorialItem({
  item,
}: {
  item: ResultadoHistorialItem;
}) {
  return (
    <Link
      href={`/resultados/${item.id}`}
      className="tarjeta flex items-center justify-between gap-3 active:bg-neutral-50"
    >
      <div className="min-w-0">
        <p className="truncate text-lg font-semibold text-neutral-900">
          {item.nombre_juego}
        </p>
        <p className="etiqueta">{formatearFechaCorta(item.fecha_sorteo)}</p>
        <div className="mt-1">
          <EstadoBadge estado={item.estado} />
        </div>
      </div>
      <div className="shrink-0 text-right">
        <p className={`${fraunces.className} text-2xl font-black italic text-fuego-600`}>
          {item.estado === "publicado" ? item.numero_ganador : "—"}
        </p>
      </div>
    </Link>
  );
}

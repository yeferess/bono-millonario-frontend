"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Sorteo } from "@/lib/types";
import { adminApi } from "@/lib/admin-api";
import { fraunces } from "@/lib/fonts";
import { EstadoBadge } from "./EstadoBadge";
import { BotonChip, BotonChipEnlace } from "./BotonChip";
import { MensajeError } from "./MensajeError";

export function FilaSorteoAdmin({ sorteo }: { sorteo: Sorteo }) {
  const router = useRouter();
  const [cargando, setCargando] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function ejecutar(accion: string, fn: () => Promise<unknown>) {
    setError(null);
    setCargando(accion);
    try {
      await fn();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error.");
    } finally {
      setCargando(null);
    }
  }

  const generarQR = () =>
    ejecutar("qr", () => adminApi.post(`/sorteos/${sorteo.id}/generar-qr`));
  const publicar = () =>
    ejecutar("publicar", () => adminApi.patch(`/sorteos/${sorteo.id}/publicar`));
  const ocultar = () =>
    ejecutar("ocultar", () => adminApi.patch(`/sorteos/${sorteo.id}/ocultar`));
  const eliminar = () => {
    if (!confirm(`¿Eliminar el sorteo "${sorteo.nombre_juego}"?`)) return;
    ejecutar("eliminar", () => adminApi.delete(`/sorteos/${sorteo.id}`));
  };

  return (
    <div className="tarjeta relative space-y-3">
      <span className="absolute -left-2 -top-2 rounded-full bg-neutral-800 px-2 py-0.5 text-xs font-bold text-white shadow-sm">
        #{sorteo.id}
      </span>

      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-lg font-semibold">
            {sorteo.nombre_juego}
          </p>
          <p className="etiqueta">
            {sorteo.fecha_sorteo} · {sorteo.hora_sorteo}
          </p>
          <div className="mt-1">
            <EstadoBadge estado={sorteo.estado} />
            {!sorteo.codigo_qr && (
              <span className="ml-2 inline-block rounded-full bg-neutral-100 px-3 py-1 text-sm font-semibold text-neutral-600">
                Sin QR
              </span>
            )}
          </div>
        </div>
        <p className={`${fraunces.className} shrink-0 text-xl font-black italic text-fuego-600`}>
          {sorteo.numero_ganador || "—"}
        </p>
      </div>

      <MensajeError mensaje={error} />

      <div className="flex flex-wrap gap-2">
        <BotonChipEnlace href={`/admin/sorteos/${sorteo.id}`} color="neutral">
          Editar
        </BotonChipEnlace>

        {!sorteo.codigo_qr && (
          <BotonChip onClick={generarQR} disabled={cargando !== null} color="dorado">
            {cargando === "qr" ? "Generando..." : "Generar QR"}
          </BotonChip>
        )}

        {sorteo.estado !== "publicado" ? (
          <BotonChip onClick={publicar} disabled={cargando !== null} color="exito">
            {cargando === "publicar" ? "Publicando..." : "Publicar"}
          </BotonChip>
        ) : (
          <BotonChip onClick={ocultar} disabled={cargando !== null} color="advertencia">
            {cargando === "ocultar" ? "Ocultando..." : "Ocultar"}
          </BotonChip>
        )}

        <BotonChip onClick={eliminar} disabled={cargando !== null} color="peligro">
          {cargando === "eliminar" ? "Eliminando..." : "Eliminar"}
        </BotonChip>
      </div>
    </div>
  );
}

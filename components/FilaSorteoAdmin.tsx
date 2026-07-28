"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Sorteo } from "@/lib/types";
import { adminApi } from "@/lib/admin-api";
import { EstadoBadge } from "./EstadoBadge";

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
        <p className="shrink-0 text-xl font-extrabold text-marca-700">
          {sorteo.numero_ganador || "—"}
        </p>
      </div>

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      <div className="flex flex-wrap gap-2">
        <Link
          href={`/admin/sorteos/${sorteo.id}`}
          className="min-h-touch rounded-lg bg-neutral-100 px-3 text-sm font-semibold leading-[2.75rem]"
        >
          Editar
        </Link>

        {!sorteo.codigo_qr && (
          <button
            onClick={generarQR}
            disabled={cargando !== null}
            className="min-h-touch rounded-lg bg-marca-100 px-3 text-sm font-semibold text-marca-700"
          >
            {cargando === "qr" ? "Generando..." : "Generar QR"}
          </button>
        )}

        {sorteo.estado !== "publicado" ? (
          <button
            onClick={publicar}
            disabled={cargando !== null}
            className="min-h-touch rounded-lg bg-green-100 px-3 text-sm font-semibold text-green-700"
          >
            {cargando === "publicar" ? "Publicando..." : "Publicar"}
          </button>
        ) : (
          <button
            onClick={ocultar}
            disabled={cargando !== null}
            className="min-h-touch rounded-lg bg-yellow-100 px-3 text-sm font-semibold text-yellow-700"
          >
            {cargando === "ocultar" ? "Ocultando..." : "Ocultar"}
          </button>
        )}

        <button
          onClick={eliminar}
          disabled={cargando !== null}
          className="min-h-touch rounded-lg bg-red-50 px-3 text-sm font-semibold text-red-600"
        >
          {cargando === "eliminar" ? "Eliminando..." : "Eliminar"}
        </button>
      </div>
    </div>
  );
}

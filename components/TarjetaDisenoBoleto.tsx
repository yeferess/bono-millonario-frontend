"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminApi } from "@/lib/admin-api";
import type { DisenoBoleto } from "@/lib/types";

export function TarjetaDisenoBoleto({ diseno }: { diseno: DisenoBoleto }) {
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

  const activar = () =>
    ejecutar("activar", () => adminApi.patch(`/disenos-boletos/${diseno.id}/activar`));
  const eliminar = () => {
    if (!confirm("¿Eliminar este diseño de boleto?")) return;
    ejecutar("eliminar", () => adminApi.delete(`/disenos-boletos/${diseno.id}`));
  };

  return (
    <div
      className={`tarjeta space-y-2 ${diseno.activo ? "ring-2 ring-marca-600" : ""}`}
    >
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={diseno.imagen_url}
          alt={diseno.nombre || `Diseño ${diseno.id}`}
          className="aspect-video w-full rounded-lg object-cover"
        />
        {diseno.activo && (
          <span className="absolute left-1 top-1 rounded-full bg-marca-600 px-2 py-0.5 text-xs font-bold text-white shadow-sm">
            Activo
          </span>
        )}
      </div>

      {diseno.nombre && <p className="truncate text-sm font-semibold">{diseno.nombre}</p>}

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      <div className="flex flex-wrap gap-2">
        {!diseno.activo && (
          <button
            onClick={activar}
            disabled={cargando !== null}
            className="min-h-touch rounded-lg bg-marca-100 px-3 text-sm font-semibold text-marca-700"
          >
            {cargando === "activar" ? "Activando..." : "Usar este diseño"}
          </button>
        )}
        <a
          href={diseno.imagen_url}
          download={`diseno-${diseno.tipo}-${diseno.id}.png`}
          className="min-h-touch flex items-center rounded-lg bg-neutral-100 px-3 text-sm font-semibold text-neutral-700"
        >
          Descargar
        </a>
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

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { EstadoSorteo } from "@/lib/types";

// Filtros por fecha y estado para la lista de sorteos del panel admin.
// Mismo patrón que components/FiltroFecha.tsx (historial público): Client
// Component que lee/escribe la URL con el router.
export function FiltrosSorteosAdmin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [fecha, setFecha] = useState(searchParams.get("fecha") ?? "");
  const [estado, setEstado] = useState(searchParams.get("estado") ?? "");

  function filtrar(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (fecha) params.set("fecha", fecha);
    if (estado) params.set("estado", estado);
    router.push(`/admin/dashboard${params.toString() ? `?${params}` : ""}`);
  }

  function limpiar() {
    setFecha("");
    setEstado("");
    router.push("/admin/dashboard");
  }

  return (
    <form onSubmit={filtrar} className="tarjeta mb-4 flex flex-wrap items-end gap-2">
      <div className="flex-1">
        <label htmlFor="fecha" className="etiqueta mb-1 px-3 block">
          Busca por Fecha
        </label>
        <input
          id="fecha"
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="min-h-touch w-full rounded-lg border border-neutral-300 px-3 text-sm"
        />
      </div>

      <div className="flex-1">
        <label htmlFor="estado" className="etiqueta mb-1 px-3 block">
          Estado
        </label>
        <select
          id="estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value as EstadoSorteo | "")}
          className="min-h-touch w-full rounded-lg border border-neutral-300 px-3 text-sm"
        >
          <option value="">Todos</option>
          <option value="borrador">Pendiente</option>
          <option value="publicado">Publicado</option>
          <option value="oculto">Oculto</option>
        </select>
      </div>

      <button
        type="submit"
        className="min-h-touch rounded-lg bg-dorado-500 px-4 font-semibold text-neutral-900"
      >
        Filtrar
      </button>
      {(fecha || estado) && (
        <button
          type="button"
          onClick={limpiar}
          className="min-h-touch rounded-lg bg-neutral-100 px-3 font-semibold text-neutral-700"
        >
          Limpiar
        </button>
      )}
    </form>
  );
}

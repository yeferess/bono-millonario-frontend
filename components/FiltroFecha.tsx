"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

// Formulario simple para buscar sorteos por fecha específica.
// Client Component porque necesita leer/escribir la URL con el router.
export function FiltroFecha() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [fecha, setFecha] = useState(searchParams.get("fecha") ?? "");

  function buscar(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (fecha) params.set("fecha", fecha);
    router.push(`/historial${params.toString() ? `?${params}` : ""}`);
  }

  function limpiar() {
    setFecha("");
    router.push("/historial");
  }

  return (
    <form onSubmit={buscar} className="tarjeta mb-4 flex items-end gap-2">
      <div className="flex-1">
        <label htmlFor="fecha" className="etiqueta mb-1 block px-2">
          Buscar por fecha
        </label>
        <input
          id="fecha"
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="min-h-touch w-full rounded-lg border border-neutral-300 px-3 text-lg"
        />
      </div>
      <button
        type="submit"
        className="min-h-touch rounded-lg bg-marca-600 px-4 font-semibold text-white"
      >
        Buscar
      </button>
      {fecha && (
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

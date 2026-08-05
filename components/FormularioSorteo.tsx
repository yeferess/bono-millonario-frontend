"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Sorteo, SorteoFormValues } from "@/lib/types";
import { adminApi } from "@/lib/admin-api";
import { Boton } from "./Boton";
import { MensajeError } from "./MensajeError";

const valoresVacios: SorteoFormValues = {
  fecha_sorteo: "",
  hora_sorteo: "",
  numero_ganador: "",
  premio_principal: "",
  video_url: "",
  video_entrega_premio: "",
  fuente: "manual",
};

export function FormularioSorteo({ sorteo }: { sorteo?: Sorteo }) {
  const router = useRouter();
  const [valores, setValores] = useState<SorteoFormValues>(
    sorteo
      ? {
        fecha_sorteo: sorteo.fecha_sorteo,
        hora_sorteo: sorteo.hora_sorteo,
        numero_ganador: sorteo.numero_ganador,
        premio_principal: sorteo.premio_principal,
        video_url: sorteo.video_url ?? "",
        video_entrega_premio: sorteo.video_entrega_premio ?? "",
        fuente: sorteo.fuente,
      }
      : valoresVacios,
  );
  const [error, setError] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);

  function actualizar<K extends keyof SorteoFormValues>(
    campo: K,
    valor: SorteoFormValues[K],
  ) {
    setValores((v) => ({ ...v, [campo]: valor }));
  }

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setGuardando(true);
    try {
      if (sorteo) {
        await adminApi.put<Sorteo>(`/sorteos/${sorteo.id}`, valores);
        router.refresh();
      } else {
        const creado = await adminApi.post<Sorteo>("/sorteos", valores);
        router.push(`/admin/sorteos/${creado.id}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar.");
    } finally {
      setGuardando(false);
    }
  }

  return (
    <form onSubmit={guardar} className="tarjeta space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Campo
          label="Fecha del sorteo"
          type="date"
          value={valores.fecha_sorteo}
          onChange={(v) => actualizar("fecha_sorteo", v)}
          required
        />
        <Campo
          label="Hora del sorteo"
          type="time"
          value={valores.hora_sorteo}
          onChange={(v) => actualizar("hora_sorteo", v)}
          required
        />
      </div>

      <Campo
        label="Número ganador"
        value={valores.numero_ganador}
        onChange={(v) => actualizar("numero_ganador", v)}
      />

      <Campo
        label="Premio"
        value={valores.premio_principal}
        onChange={(v) => actualizar("premio_principal", v)}
      />

      <Campo
        label="Link del video del sorteo (YouTube, opcional)"
        value={valores.video_url}
        onChange={(v) => actualizar("video_url", v)}
      />

      <Campo
        label="Link del video de entrega del premio (YouTube, opcional)"
        value={valores.video_entrega_premio}
        onChange={(v) => actualizar("video_entrega_premio", v)}
      />

      <div>
        <label className="etiqueta mb-1 block">Fuente del dato</label>
        <select
          value={valores.fuente}
          onChange={(e) =>
            actualizar("fuente", e.target.value as SorteoFormValues["fuente"])
          }
          className="min-h-touch w-full rounded-lg border border-neutral-300 px-3 text-lg"
        >
          <option value="manual">Manual</option>
          <option value="ocr_ia">OCR / IA</option>
        </select>
      </div>

      <MensajeError mensaje={error} />

      <Boton type="submit" disabled={guardando}>
        {guardando ? "Guardando..." : sorteo ? "Guardar cambios" : "Crear sorteo"}
      </Boton>
    </form>
  );
}

function Campo({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="etiqueta mb-1 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="min-h-touch w-full rounded-lg border border-neutral-300 px-3 text-lg"
      />
    </div>
  );
}

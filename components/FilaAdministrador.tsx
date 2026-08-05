"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Administrador } from "@/lib/types";
import { adminApi } from "@/lib/admin-api";
import { BotonChip, BotonChipEnlace } from "./BotonChip";
import { MensajeError } from "./MensajeError";

function formatearFechaHora(iso: string | null) {
  if (!iso) return "Nunca";
  return new Date(iso).toLocaleString("es", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export function FilaAdministrador({
  administrador,
  esUsuarioActual,
}: {
  administrador: Administrador;
  esUsuarioActual: boolean;
}) {
  const router = useRouter();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function alternarActivo() {
    setError(null);
    setCargando(true);
    const accion = administrador.activo ? "desactivar" : "activar";
    try {
      await adminApi.patch(`/administradores/${administrador.id}/${accion}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="tarjeta space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-lg font-semibold">{administrador.usuario}</p>
          <p className="etiqueta truncate">{administrador.email}</p>
          <p className="etiqueta">
            Último acceso: {formatearFechaHora(administrador.ultimo_login)}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span className="rounded-full bg-dorado-100 px-3 py-1 text-sm font-semibold text-dorado-800">
            {administrador.rol === "superadmin" ? "Superadmin" : "Editor"}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              administrador.activo
                ? "bg-green-100 text-green-700"
                : "bg-neutral-100 text-neutral-600"
            }`}
          >
            {administrador.activo ? "Activo" : "Inactivo"}
          </span>
        </div>
      </div>

      <MensajeError mensaje={error} />

      <div className="flex flex-wrap gap-2">
        <BotonChipEnlace href={`/admin/administradores/${administrador.id}`} color="neutral">
          Editar
        </BotonChipEnlace>

        <BotonChip
          onClick={alternarActivo}
          disabled={cargando || (esUsuarioActual && administrador.activo)}
          title={
            esUsuarioActual && administrador.activo
              ? "No puedes desactivar tu propia cuenta"
              : undefined
          }
          color={administrador.activo ? "advertencia" : "exito"}
        >
          {cargando
            ? "Guardando..."
            : administrador.activo
              ? "Desactivar"
              : "Activar"}
        </BotonChip>
      </div>
    </div>
  );
}

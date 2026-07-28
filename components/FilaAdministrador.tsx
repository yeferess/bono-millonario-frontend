"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Administrador } from "@/lib/types";
import { adminApi } from "@/lib/admin-api";

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
          <span className="rounded-full bg-marca-100 px-3 py-1 text-sm font-semibold text-marca-700">
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

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      <div className="flex flex-wrap gap-2">
        <Link
          href={`/admin/administradores/${administrador.id}`}
          className="min-h-touch rounded-lg bg-neutral-100 px-3 text-sm font-semibold leading-[2.75rem]"
        >
          Editar
        </Link>

        <button
          onClick={alternarActivo}
          disabled={cargando || (esUsuarioActual && administrador.activo)}
          title={
            esUsuarioActual && administrador.activo
              ? "No puedes desactivar tu propia cuenta"
              : undefined
          }
          className={`min-h-touch rounded-lg px-3 text-sm font-semibold ${
            administrador.activo
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {cargando
            ? "Guardando..."
            : administrador.activo
              ? "Desactivar"
              : "Activar"}
        </button>
      </div>
    </div>
  );
}

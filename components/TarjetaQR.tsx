"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { CodigoQR } from "@/lib/types";
import { adminApi } from "@/lib/admin-api";
import { Boton } from "./Boton";

// Muestra el QR ya generado para el sorteo, o un botón para generarlo.
// Recordar: el QR se genera UNA sola vez por sorteo, antes de imprimir
// los cartones. No cambia después.
export function TarjetaQR({
  sorteoId,
  codigoQR,
}: {
  sorteoId: number;
  codigoQR?: CodigoQR | null;
}) {
  const router = useRouter();
  const [generando, setGenerando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generar() {
    setError(null);
    setGenerando(true);
    try {
      await adminApi.post(`/sorteos/${sorteoId}/generar-qr`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo generar el QR.");
    } finally {
      setGenerando(false);
    }
  }

  if (!codigoQR) {
    return (
      <div className="tarjeta text-center">
        <p className="etiqueta mb-3">
          Este sorteo todavía no tiene código QR
        </p>
        {error && (
          <p className="mb-2 text-sm font-medium text-red-600">{error}</p>
        )}
        <Boton onClick={generar} disabled={generando}>
          {generando ? "Generando..." : "Generar QR"}
        </Boton>
        <p className="mt-2 text-sm text-neutral-500">
          Genera el QR antes de imprimir los cartones de este sorteo.
        </p>
      </div>
    );
  }

  return (
    <div className="tarjeta text-center">
      <p className="etiqueta mb-2">Código QR de este sorteo</p>
      {/* La imagen del QR la sirve el backend directo (endpoint público, no sensible). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/qr/${codigoQR.codigo}.png`}
        alt={`Código QR del sorteo ${sorteoId}`}
        className="mx-auto h-48 w-48"
      />
      <p className="mt-2 break-all text-sm text-neutral-500">
        {codigoQR.url_publica}
      </p>
      <p
        className={`mt-1 text-sm font-semibold ${
          codigoQR.activo ? "text-green-700" : "text-red-600"
        }`}
      >
        {codigoQR.activo ? "Activo" : "Inactivo"}
      </p>
    </div>
  );
}

"use client";

import { useState } from "react";
import { adminApi } from "@/lib/admin-api";
import { Boton } from "./Boton";
import { MensajeError } from "./MensajeError";

export function BotonesHojaImpresion({
  sorteoId,
  tieneCodigoQR,
}: {
  sorteoId: number;
  tieneCodigoQR: boolean;
}) {
  const [cargando, setCargando] = useState<"frontal" | "trasera" | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function descargar(cara: "frontal" | "trasera") {
    setError(null);
    setCargando(cara);
    try {
      await adminApi.download(
        `/sorteos/${sorteoId}/generar-hoja-${cara}`,
        `hoja-${cara}-${sorteoId}.png`,
        { method: "POST" },
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo generar la hoja.");
    } finally {
      setCargando(null);
    }
  }

  return (
    <div className="tarjeta space-y-1">
      <p className="etiqueta">Hojas de impresión (24 boletos por hoja)</p>
      <MensajeError mensaje={error} />
      <div className="flex gap-2">
        <Boton
          variante="secundario"
          onClick={() => descargar("frontal")}
          disabled={cargando !== null}
          className="flex-1 text-sm"
        >
          {cargando === "frontal" ? ("Generando...") : (<>Ticket delante <IconoFlechaAbajo className="h-5 w-5 text-white" /></>)}
        </Boton>
        <Boton
          variante="secundario"
          onClick={() => descargar("trasera")}
          disabled={cargando !== null || !tieneCodigoQR}
          className="flex-1 text-sm"
        >
          {cargando === "trasera" ? ("Generando...") : (<>Ticket atrás <IconoFlechaAbajo className="h-5 w-5 text-white" /></>)}
        </Boton>
      </div>
      {!tieneCodigoQR && (
        <p className="text-sm text-neutral-500">
          Genera el código QR del sorteo antes de descargar la hoja trasera.
        </p>
      )}
    </div>
  );
}

function IconoFlechaAbajo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-hidden="true"
    >
      <line x1="12" y1="4" x2="12" y2="18" />
      <polyline points="6 13 12 19 18 13" />
    </svg>
  );
}

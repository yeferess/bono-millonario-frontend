"use client";

import { useEffect, useState } from "react";

interface Restante {
  horas: number;
  minutos: number;
  segundos: number;
  terminado: boolean;
}

function calcularRestante(objetivoMs: number): Restante {
  const diferencia = Math.max(0, objetivoMs - Date.now());
  const totalSegundos = Math.floor(diferencia / 1000);
  return {
    horas: Math.floor(totalSegundos / 3600),
    minutos: Math.floor((totalSegundos % 3600) / 60),
    segundos: totalSegundos % 60,
    terminado: diferencia === 0,
  };
}

function dosDigitos(n: number) {
  return String(n).padStart(2, "0");
}

// Cuenta regresiva en vivo hasta la hora del sorteo. El estado inicial es
// null a propósito (no calcularRestante ya en el primer render): si
// calculáramos el valor real durante el render del servidor, no
// coincidiría con el del cliente al hidratar (el reloj avanzó entre
// ambos) y React tiraría un mismatch de hidratación.
export function CuentaRegresiva({
  fechaSorteo,
  horaSorteo,
}: {
  fechaSorteo: string;
  horaSorteo: string;
}) {
  const objetivoMs = new Date(`${fechaSorteo}T${horaSorteo}`).getTime();
  const [restante, setRestante] = useState<Restante | null>(null);

  useEffect(() => {
    setRestante(calcularRestante(objetivoMs));
    const id = setInterval(() => {
      setRestante(calcularRestante(objetivoMs));
    }, 1000);
    return () => clearInterval(id);
  }, [objetivoMs]);

  return (
    <div className="tarjeta bg-yellow-50 text-center">
      <IconoReloj className="mx-auto h-10 w-10 text-noche-800" />
      <p className="mt-2 text-xl font-semibold text-yellow-800">
        Este sorteo aún no tiene resultado publicado
      </p>

      {restante && !restante.terminado ? (
        <>
          <p className="mt-3 etiqueta">Tiempo estimado para el sorteo</p>
          <div
            className="mt-1 flex justify-center gap-1 text-3xl font-extrabold tabular-nums text-noche-800"
            aria-live="polite"
          >
            <span>{dosDigitos(restante.horas)}</span>
            <span>:</span>
            <span>{dosDigitos(restante.minutos)}</span>
            <span>:</span>
            <span>{dosDigitos(restante.segundos)}</span>
          </div>
          <p className="mt-1 text-sm text-neutral-500">horas : minutos : segundos</p>
        </>
      ) : (
        <p className="mt-2 etiqueta">
          {restante?.terminado
            ? "El sorteo ya se realizó, el resultado se publica pronto."
            : "Vuelve a escanear más tarde o consulta el historial."}
        </p>
      )}
    </div>
  );
}

function IconoReloj({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14" />
    </svg>
  );
}

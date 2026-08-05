"use client";

import { useEffect } from "react";
import { Boton } from "@/components/Boton";
import { EncabezadoAdmin } from "@/components/EncabezadoAdmin";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="contenedor-pagina">
      <EncabezadoAdmin />
      <div className="tarjeta space-y-3 text-center">
        <p className="text-lg font-semibold text-neutral-900">
          Ocurrió un error al cargar esta sección
        </p>
        <p className="text-neutral-600">
          Intenta de nuevo. Si el problema persiste, revisa tu sesión.
        </p>
        <Boton onClick={reset}>Reintentar</Boton>
      </div>
    </main>
  );
}

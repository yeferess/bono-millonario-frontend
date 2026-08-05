"use client";

import { useEffect } from "react";
import { Boton } from "@/components/Boton";
import { LogoHero } from "@/components/LogoHero";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
    <>
      <Navbar />
      <main className="contenedor-pagina">
        <LogoHero />
        <div className="tarjeta space-y-3 text-center">
          <p className="text-lg font-semibold text-neutral-900">
            No pudimos cargar el historial
          </p>
          <p className="text-neutral-600">
            Puede ser un problema de conexión. Intenta de nuevo en unos segundos.
          </p>
          <Boton onClick={reset}>Reintentar</Boton>
        </div>
      </main>
      <Footer />
    </>
  );
}

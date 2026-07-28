import { BotonEnlace } from "@/components/Boton";

export default function CodigoNoEncontrado() {
  return (
    <main className="contenedor-pagina flex min-h-screen flex-col items-center justify-center text-center">
      <p className="text-2xl font-bold text-neutral-900">
        No encontramos este código QR
      </p>
      <p className="mt-2 text-lg text-neutral-600">
        Verifica que el código esté bien impreso o consulta el historial de
        sorteos.
      </p>
      <div className="mt-6 w-full">
        <BotonEnlace href="/historial">Ver historial de sorteos</BotonEnlace>
      </div>
    </main>
  );
}

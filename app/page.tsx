import { BotonEnlace } from "@/components/Boton";
import { LogoHero } from "@/components/LogoHero";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Página de inicio. La mayoría de usuarios NUNCA pasan por aquí: llegan
// directo a /qr/[codigo] al escanear su cartón. Esta pantalla sirve para
// quien abre el sitio sin escanear (ej. quiere ver el historial).
export default function InicioPage() {
  return (
    <>
      <Navbar />
      <main className="contenedor-pagina flex min-h-screen flex-col justify-center">
        <LogoHero />
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-dorado-800">
            Bono Millonario
          </h1>
          <p className="mt-2 text-lg text-neutral-600">
            ¡Consulta los resultados oficiales del sorteo!
          </p>
        </div>

        <div className="space-y-4">
          <BotonEnlace href="/historial" variante="primario">
            Ver historial de sorteos
          </BotonEnlace>
        </div>

        <p className="mt-8 text-center text-base text-neutral-500">
          ¿Tienes un cartón físico? Escanea el código QR impreso en él para
          ver su resultado directamente.
        </p>
      </main>
      <Footer />
    </>
  );
}

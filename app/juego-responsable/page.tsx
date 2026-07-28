import { Encabezado } from "@/components/Encabezado";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function JuegoResponsablePage() {
  return (
    <>
      <Navbar />
      <main className="contenedor-pagina">
        <Encabezado titulo="Juego responsable" volverA="/" />
        <div className="tarjeta text-neutral-700">
          <p>
            [Contenido en preparación. Aquí va la política de juego
            responsable real, incluyendo edad mínima y canales de ayuda.]
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

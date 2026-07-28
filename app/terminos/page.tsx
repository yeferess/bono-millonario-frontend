import { Encabezado } from "@/components/Encabezado";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function TerminosPage() {
  return (
    <>
      <Navbar />
      <main className="contenedor-pagina">
        <Encabezado titulo="Términos y condiciones" volverA="/" />
        <div className="tarjeta text-neutral-700">
          <p>
            [Contenido en preparación. Aquí van los términos y condiciones
            legales reales del servicio.]
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

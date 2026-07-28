import { Encabezado } from "@/components/Encabezado";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PrivacidadPage() {
  return (
    <>
      <Navbar />
      <main className="contenedor-pagina">
        <Encabezado titulo="Política de privacidad" volverA="/" />
        <div className="tarjeta text-neutral-700">
          <p>
            [Contenido en preparación. Aquí va la política de privacidad real
            del servicio.]
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

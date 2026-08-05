import { Encabezado } from "@/components/Encabezado";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AvisoBorrador } from "@/components/AvisoBorrador";

export default function TerminosPage() {
  return (
    <>
      <Navbar />
      <main className="contenedor-pagina">
        <Encabezado titulo="Términos y condiciones" volverA="/" />
        <AvisoBorrador />
        <div className="tarjeta space-y-4 text-base text-neutral-700">
          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              1. Aceptación de los términos
            </h2>
            <p className="mt-1">
              Al acceder y utilizar Bono Millonario aceptas estos términos y
              condiciones. Si no estás de acuerdo con alguno de ellos, te
              pedimos que no utilices el servicio.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              2. Descripción del servicio
            </h2>
            <p className="mt-1">
              Bono Millonario es un servicio de consulta de resultados de
              sorteos mediante código QR o búsqueda en el historial. No
              organizamos ni administramos los sorteos: publicamos los
              resultados oficiales una vez confirmados.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              3. Exactitud de la información
            </h2>
            <p className="mt-1">
              Nos esforzamos por publicar resultados exactos y actualizados,
              pero ante cualquier discrepancia prevalece el acta o comunicado
              oficial del sorteo correspondiente, no lo mostrado en esta
              plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              4. Uso permitido
            </h2>
            <p className="mt-1">
              El servicio es de consulta gratuita para uso personal. No está
              permitido su uso para fines fraudulentos, de suplantación, ni
              para extraer o redistribuir masivamente la información sin
              autorización.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              5. Propiedad intelectual
            </h2>
            <p className="mt-1">
              El nombre, logotipo y diseño de Bono Millonario pertenecen a sus
              titulares. Las imágenes y videos de cada sorteo se publican con
              fines informativos.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              6. Limitación de responsabilidad
            </h2>
            <p className="mt-1">
              El servicio se ofrece &quot;tal cual&quot;, sin garantías de
              disponibilidad continua. No nos hacemos responsables por
              decisiones tomadas únicamente con base en la información
              mostrada aquí sin verificarla con la fuente oficial.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              7. Cambios en estos términos
            </h2>
            <p className="mt-1">
              Podemos actualizar estos términos en cualquier momento. Los
              cambios entran en vigor al publicarse en esta misma página.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

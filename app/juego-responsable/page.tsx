import { Encabezado } from "@/components/Encabezado";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AvisoBorrador } from "@/components/AvisoBorrador";

export default function JuegoResponsablePage() {
  return (
    <>
      <Navbar />
      <main className="contenedor-pagina">
        <Encabezado titulo="Juego responsable" volverA="/" />
        <AvisoBorrador />
        <div className="tarjeta space-y-4 text-base text-neutral-700">
          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              1. Edad mínima
            </h2>
            <p className="mt-1">
              La participación en sorteos y la compra de boletos está
              reservada a personas mayores de edad según la legislación del
              país donde se realiza el sorteo.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              2. Juega con moderación
            </h2>
            <p className="mt-1">
              Los sorteos son una forma de entretenimiento, no una fuente de
              ingresos. Te recomendamos definir un límite de gasto antes de
              participar y respetarlo, sin buscar recuperar pérdidas
              aumentando el gasto.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              3. Señales de alerta
            </h2>
            <p className="mt-1">
              Gastar más de lo planeado, sentir ansiedad por conocer un
              resultado, o descuidar responsabilidades personales por jugar,
              son señales de que vale la pena buscar apoyo.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 hidden">
              4. Dónde buscar ayuda
            </h2>
            <p className="mt-1 ">
              Si sientes que el juego dejó de ser un entretenimiento,
              contacta a la entidad reguladora de juegos y apuestas de tu
              país o a un profesional de salud.{" "}
              <span className="font-semibold">
                [Pendiente: agregar aquí la línea de ayuda oficial y datos de
                contacto de la entidad reguladora local.]
              </span>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

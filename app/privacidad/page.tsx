import { Encabezado } from "@/components/Encabezado";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AvisoBorrador } from "@/components/AvisoBorrador";

export default function PrivacidadPage() {
  return (
    <>
      <Navbar />
      <main className="contenedor-pagina">
        <Encabezado titulo="Política de privacidad" volverA="/" />
        <AvisoBorrador />
        <div className="tarjeta space-y-4 text-base text-neutral-700">
          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              1. Qué información recopilamos
            </h2>
            <p className="mt-1">
              La consulta pública de resultados (por código QR o historial) no
              requiere que nos entregues datos personales. Las cuentas de
              administrador guardan únicamente usuario, correo y contraseña
              cifrada, necesarios para operar el panel.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              2. Cómo usamos la información
            </h2>
            <p className="mt-1">
              Usamos los datos de las cuentas de administrador exclusivamente
              para autenticación y para llevar un registro de auditoría de
              las acciones realizadas en el panel.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              3. Cookies y sesión
            </h2>
            <p className="mt-1">
              El panel de administración utiliza cookies técnicas necesarias
              para mantener la sesión iniciada de forma segura. No usamos
              cookies de seguimiento ni publicidad en la consulta pública de
              resultados.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              4. Con quién compartimos la información
            </h2>
            <p className="mt-1">
              No vendemos ni compartimos datos personales con terceros con
              fines comerciales. Solo los divulgaríamos si una autoridad
              competente lo exige por ley.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              5. Seguridad
            </h2>
            <p className="mt-1">
              Aplicamos medidas técnicas razonables (cifrado de contraseñas,
              sesiones con expiración) para proteger la información de las
              cuentas de administrador.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              6. Tus derechos
            </h2>
            <p className="mt-1">
              Si tienes una cuenta de administrador, puedes solicitar acceso,
              corrección o eliminación de tus datos personales contactando al
              equipo responsable del sistema.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900">
              7. Cambios en esta política
            </h2>
            <p className="mt-1">
              Podemos actualizar esta política ocasionalmente. Los cambios
              entran en vigor al publicarse en esta misma página.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

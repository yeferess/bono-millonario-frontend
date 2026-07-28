import Link from "next/link";

// Datos legales/de contacto: PLACEHOLDERS hasta que se confirmen los reales
// (NIT, dirección, teléfono, redes). Reemplazar antes de producción.
const anioActual = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="mt-10 border-t border-black/10 bg-dorado-500  text-neutral-900">
      <div className="mx-auto w-full max-w-md space-y-4 text-sm">
        <div>
          <p className="text-base font-bold text-neutral-900">Bono Millonario</p>
          <p className="mt-1">Guatemala, Guatemala</p>
          <p>NIT: [pendiente]</p>
          <p>[Dirección pendiente]</p>
        </div>

        <div className="space-y-1">
          <p>
            Correo:{" "}
            <a
              href="mailto:contacto@bonomillonario.com"
              className="underline underline-offset-2 hover:text-gray-500"
            >
              contacto@bonomillonario.com
            </a>{" "}
            <span className="text-neutral-500">[pendiente confirmar]</span>
          </p>
          <p>
            Teléfono:{" "}
            <span className="text-neutral-500">+502 [pendiente]</span>
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-4 gap-y-1">
          <Link
            href="/terminos"
            className="underline underline-offset-2 hover:text-white"
          >
            Términos y condiciones
          </Link>
          <Link
            href="/privacidad"
            className="underline underline-offset-2 hover:text-white"
          >
            Política de privacidad
          </Link>
          <Link
            href="/juego-responsable"
            className="underline underline-offset-2 hover:text-white"
          >
            Juego responsable
          </Link>
        </nav>

        <p className="text-xs text-neutral-400">
          Debes ser mayor de edad para participar. Juega con responsabilidad.
        </p>

        <p className="text-xs text-neutral-500">
          © {anioActual} Bono Millonario. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

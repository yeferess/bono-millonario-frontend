import Link from "next/link";
import { fraunces } from "@/lib/fonts";

const anioActual = new Date().getFullYear();

// Línea discontinua: motivo recurrente del footer, evoca la perforación
// de un talón de boletería (la parte que se separa del cartón).
function LineaPerforada({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`h-px w-full bg-[repeating-linear-gradient(to_right,theme(colors.noche.900)_0_6px,transparent_6px_14px)] opacity-25 ${className}`}
    />
  );
}

function IconoContacto({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-noche-900/10 ring-1 ring-noche-900/20">
      <svg
        className="h-5 w-5 text-noche-900"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        {children}
      </svg>
    </span>
  );
}

function EnlaceLegal({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group flex min-h-touch items-center gap-2 text-base font-semibold text-noche-900 transition-colors hover:text-fuego-700"
    >
      <svg
        className="h-4 w-4 shrink-0 text-noche-900/50 transition-transform group-hover:translate-x-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
      >
        <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-dorado-500 px-6 pb-8 pt-10 text-noche-900">
      <div className="relative">
        <p className="text-base font-semibold uppercase tracking-[0.2em] text-fuego-700">
          Resultados oficiales
        </p>
        <h2 className={`${fraunces.className} mt-1 text-3xl font-black italic leading-none tracking-tight text-noche-900`}>
          Bono Millonario
        </h2>
        <p className="mt-2.5 text-base text-noche-900/70">
          Guatemala · Quetzaltenango · Coatepeque
        </p>

        <LineaPerforada className="my-7" />

        <p className="text-base font-semibold uppercase tracking-[0.15em] text-fuego-700">
          Contacto
        </p>
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex items-start gap-3.5">
            <IconoContacto>
              <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
              <circle cx="12" cy="9" r="2.5" />
            </IconoContacto>
            <p className="mt-2 text-base leading-snug text-noche-900/90">
              4.ª Calle con 4.ª Avenida, Edificio Plaza, segundo nivel, local 1.
            </p>
          </div>

          <div className="flex items-start gap-3.5">
            <IconoContacto>
              <rect x="2.5" y="4.5" width="19" height="15" rx="1.5" />
              <path d="M3 6l9 6 9-6" />
            </IconoContacto>
            <p className="mt-2 text-base leading-snug text-noche-900/90">
              millionariobono8@gmail.com
            </p>
          </div>

          <div className="flex items-start gap-3.5">
            <IconoContacto>
              <path d="M4 4c0 9 7 16 16 16l2-4-5-2-2 2c-2-1-4-3-5-5l2-2-2-5z" />
            </IconoContacto>
            <p className="mt-2 text-base leading-snug text-noche-900/90">
              5480-7105
            </p>
          </div>
        </div>

        <LineaPerforada className="my-7" />

        <p className="text-base font-semibold uppercase tracking-[0.15em] text-fuego-700">
          Enlaces
        </p>
        <div className="mt-4 flex flex-col gap-4">
          <EnlaceLegal href="/terminos">Términos y condiciones</EnlaceLegal>
          <EnlaceLegal href="/privacidad">Política de privacidad</EnlaceLegal>
          <EnlaceLegal href="/juego-responsable">Juego responsable</EnlaceLegal>
        </div>

        <LineaPerforada className="mt-7 mb-6" />

        <p className="text-base text-noche-900/50">
          © {anioActual} Bono Millonario. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

import Link from "next/link";
import Image from "next/image";

// Barra superior del sitio público (no se usa en /admin, que tiene su
// propio NavAdmin). Aparece en todas las páginas de cara al usuario final.
export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-black/10 bg-[#F7ff00]  text-neutral-900 antialiased">
      <div className="mx-auto flex w-full max-w-md items-center justify-between px-4 py-2">
        <Link href="/" className="flex min-h-touch items-center gap-2">
          <Image
            src="/logo.png"
            alt="Bono Millonario"
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />
          <span className="text-lg font-extrabold">
            Bono Millonario
          </span>
        </Link>
        <Link
          href="/historial"
          className="flex min-h-touch items-center text-base font-semibold  text-neutral-800 hover:text-neutral-900"
        >
          Historial
        </Link>
      </div>
    </header>
  );
}

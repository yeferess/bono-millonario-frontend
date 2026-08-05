import Image from "next/image";
import Link from "next/link";
import { NavAdmin } from "./NavAdmin";

// Cabecera del panel admin: una franja de marca compacta (en vez del
// LogoHero público de 220x110, pensado para pantallas de consulta, no
// para el uso operativo diario) seguida de la navegación por pestañas.
export function EncabezadoAdmin() {
  return (
    <div className="-mx-4 mb-4">
      <Link
        href="/admin/dashboard"
        className="flex min-h-touch items-center gap-2 border-b border-black/10 bg-[#F7ff00] px-4 text-neutral-900"
      >
        <Image
          src="/logo.png"
          alt="Bono Millonario"
          width={28}
          height={28}
          className="h-7 w-7 object-contain"
        />
        <span className="text-base font-extrabold">Panel de administración</span>
      </Link>
      <div className="px-4 pt-3">
        <NavAdmin />
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { adminApi } from "@/lib/admin-api";
import type { Administrador } from "@/lib/types";

const enlacesBase = [
  { href: "/admin/dashboard", label: "Sorteos" },
  { href: "/admin/sorteos/nuevo", label: "Nuevo" },
  { href: "/admin/disenos-boletos", label: "Diseños" },
  { href: "/admin/auditoria", label: "Auditoría" },
];

const enlaceAdministradores = { href: "/admin/administradores", label: "Administradores" };

export function NavAdmin() {
  const pathname = usePathname();
  const router = useRouter();
  const [esSuperAdmin, setEsSuperAdmin] = useState(false);

  useEffect(() => {
    adminApi
      .get<Administrador>("/administradores/me")
      .then((actual) => setEsSuperAdmin(actual.rol === "superadmin"))
      .catch(() => setEsSuperAdmin(false));
  }, []);

  const enlaces = esSuperAdmin ? [...enlacesBase, enlaceAdministradores] : enlacesBase;

  async function cerrarSesion() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <nav className="mb-4 flex items-center gap-1 overflow-x-auto rounded-xl bg-white p-1.5 shadow-sm">
      {enlaces.map((enlace) => (
        <Link
          key={enlace.href}
          href={enlace.href}
          className={`min-h-touch flex-1 whitespace-nowrap rounded-lg px-3 text-center text-base font-semibold leading-[3rem] ${
            pathname === enlace.href
              ? "bg-marca-600 text-white"
              : "text-neutral-700"
          }`}
        >
          {enlace.label}
        </Link>
      ))}
      <button
        onClick={cerrarSesion}
        className="min-h-touch shrink-0 rounded-lg px-3 text-base font-semibold text-red-600"
      >
        Salir
      </button>
    </nav>
  );
}

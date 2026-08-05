import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type Variante = "primario" | "secundario" | "peligro" | "fantasma";

const clasesBase =
  "inline-flex min-h-touch w-full items-center justify-center gap-2 rounded-xl px-5 text-lg font-semibold transition active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100";

const clasesPorVariante: Record<Variante, string> = {
  primario: "bg-dorado-300 text-gray-800 hover:bg-dorado-600",
  secundario: "bg-green-600 text-white hover:bg-green-700",
  peligro: "bg-red-600 text-white hover:bg-red-700",
  fantasma: "bg-transparent text-marca-700 underline underline-offset-4",
};

interface BotonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante;
}

// Botón grande, pensado para dedos poco precisos y pantallas pequeñas.
export function Boton({
  variante = "primario",
  className = "",
  ...props
}: BotonProps) {
  return (
    <button
      className={`${clasesBase} ${clasesPorVariante[variante]} ${className}`}
      {...props}
    />
  );
}

export function BotonEnlace({
  href,
  variante = "primario",
  children,
  className = "",
}: {
  href: string;
  variante?: Variante;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`boton ${clasesBase} ${clasesPorVariante[variante]} ${className}`}
    >
      {children}
    </Link>
  );
}

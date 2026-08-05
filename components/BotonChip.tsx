import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type ColorChip = "neutral" | "dorado" | "exito" | "advertencia" | "peligro";

const clasesBase =
  "min-h-touch inline-flex items-center justify-center rounded-lg px-3 text-base font-semibold transition active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100";

const clasesPorColor: Record<ColorChip, string> = {
  neutral: "bg-neutral-100 text-neutral-700",
  dorado: "bg-dorado-100 text-dorado-800",
  exito: "bg-green-100 text-green-700",
  advertencia: "bg-yellow-100 text-yellow-700",
  peligro: "bg-red-50 text-red-600",
};

// Clase compartida para elementos que no pueden usar BotonChip/BotonChipEnlace
// directamente (ej. un <a download> hacia un recurso externo).
export function claseChip(color: ColorChip = "neutral", className = "") {
  return `${clasesBase} ${clasesPorColor[color]} ${className}`;
}

interface BotonChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ColorChip;
}

// Botón de acción secundaria dentro de una tarjeta (Editar, Publicar,
// Eliminar, etc.): más compacto que <Boton>, varios conviven en una fila.
export function BotonChip({ color = "neutral", className = "", ...props }: BotonChipProps) {
  return <button className={claseChip(color, className)} {...props} />;
}

export function BotonChipEnlace({
  href,
  color = "neutral",
  children,
  className = "",
}: {
  href: string;
  color?: ColorChip;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={claseChip(color, className)}>
      {children}
    </Link>
  );
}

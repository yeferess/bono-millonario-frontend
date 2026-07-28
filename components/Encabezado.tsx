import Link from "next/link";

export function Encabezado({
  titulo,
  volverA,
}: {
  titulo: string;
  volverA?: string;
}) {
  return (
    <header className="mb-4 flex items-center gap-3 py-2">
      {volverA && (
        <Link
          href={volverA}
          aria-label="Volver"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-xl shadow-sm"
        >
          ←
        </Link>
      )}
      <h1 className="truncate text-xl font-bold text-neutral-900">
        {titulo}
      </h1>
    </header>
  );
}

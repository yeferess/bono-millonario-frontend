export function MensajeError({
  mensaje,
  className = "",
}: {
  mensaje: string | null;
  className?: string;
}) {
  if (!mensaje) return null;
  return <p className={`text-base font-medium text-red-600 ${className}`}>{mensaje}</p>;
}

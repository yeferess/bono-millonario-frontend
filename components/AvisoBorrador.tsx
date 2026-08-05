// Aviso visible en las páginas legales mientras el contenido sea un
// borrador genérico: recuerda que debe pasar por revisión legal real
// antes de considerarse vigente.
export function AvisoBorrador() {
  return (
    <div className="mb-4 rounded-xl border border-yellow-300 bg-yellow-50 p-4 text-base text-yellow-800">
      <p className="font-semibold">Borrador pendiente de revisión legal</p>
      <p className="mt-1">
        Este texto es una plantilla genérica de referencia y todavía no ha sido
        revisado por un profesional legal. No debe considerarse vigente hasta
        que el equipo responsable lo confirme.
      </p>
    </div>
  );
}

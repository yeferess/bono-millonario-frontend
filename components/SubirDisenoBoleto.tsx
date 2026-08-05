"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { adminApi } from "@/lib/admin-api";
import type { TipoDisenoBoleto } from "@/lib/types";
import { MensajeError } from "./MensajeError";

// Sube un nuevo diseño de boleto (delante o atrás, según `tipo`) y lo deja
// activo automáticamente. El backend se encarga de desactivar el anterior
// activo de ese mismo tipo (ver DisenoBoletoAdminViewSet.create).
export function SubirDisenoBoleto({
  tipo,
  etiqueta,
}: {
  tipo: TipoDisenoBoleto;
  etiqueta: string;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function subir(e: React.ChangeEvent<HTMLInputElement>) {
    const archivo = e.target.files?.[0];
    if (!archivo) return;

    setError(null);
    setSubiendo(true);
    try {
      const formData = new FormData();
      formData.append("imagen", archivo);
      formData.append("tipo", tipo);
      await adminApi.post(`/disenos-boletos`, formData);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo subir el diseño.");
    } finally {
      setSubiendo(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <p className="etiqueta mb-2">{etiqueta}</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={subir}
        disabled={subiendo}
        className="block w-full text-base"
      />
      {subiendo && <p className="mt-2 text-base text-neutral-500">Subiendo...</p>}
      <MensajeError mensaje={error} className="mt-2" />
    </div>
  );
}

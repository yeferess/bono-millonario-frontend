"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { adminApi } from "@/lib/admin-api";
import type { TipoImagen } from "@/lib/types";
import { MensajeError } from "./MensajeError";

// Sube una imagen para el sorteo (foto del resultado o foto del ganador,
// según `tipo`). Se guarda como multipart/form-data; el backend la sube a
// Cloudinary y responde con url_original / url_optimizada.
export function SubirImagen({
  sorteoId,
  tipo,
  etiqueta,
}: {
  sorteoId: number;
  tipo: TipoImagen;
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
      await adminApi.post(`/sorteos/${sorteoId}/imagenes`, formData);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo subir la imagen.");
    } finally {
      setSubiendo(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="tarjeta">
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

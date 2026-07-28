import { API_V1, backendUrl } from "./config";
import type { PaginaHistorial, Sorteo } from "./types";

/**
 * Cliente para los ENDPOINTS PÚBLICOS (sin JWT).
 * Se usa desde Server Components, así que puede aprovechar el cache/ISR
 * nativo de Next.js (fetch con `next.revalidate`).
 *
 * Importante: estas funciones corren en el servidor de Next.js, no en el
 * navegador del usuario, por eso pueden usar BACKEND_API_URL directamente.
 */

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function get<T>(path: string, revalidateSegundos: number): Promise<T> {
  const res = await fetch(`${backendUrl()}${path}`, {
    next: { revalidate: revalidateSegundos },
  });

  if (!res.ok) {
    throw new ApiError(
      `Error consultando ${path}: ${res.status}`,
      res.status,
    );
  }

  return res.json() as Promise<T>;
}

/** Resuelve un código QR al sorteo específico al que apunta. */
export async function resolverCodigoQR(codigo: string): Promise<Sorteo> {
  // revalidate corto: el sorteo puede pasar de "pendiente" a "publicado".
  return get<Sorteo>(`${API_V1}/qr/${encodeURIComponent(codigo)}`, 30);
}

export async function obtenerResultado(id: number | string): Promise<Sorteo> {
  return get<Sorteo>(`${API_V1}/resultados/${id}`, 60);
}

export interface FiltrosHistorial {
  fecha?: string; // YYYY-MM-DD
  page?: number;
}

export async function obtenerHistorial(
  filtros: FiltrosHistorial = {},
): Promise<PaginaHistorial> {
  const params = new URLSearchParams();
  if (filtros.fecha) params.set("fecha", filtros.fecha);
  if (filtros.page) params.set("page", String(filtros.page));

  const query = params.toString();
  return get<PaginaHistorial>(
    `${API_V1}/resultados/historial${query ? `?${query}` : ""}`,
    60,
  );
}

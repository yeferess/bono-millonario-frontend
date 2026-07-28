import { cookies } from "next/headers";
import { API_V1, backendUrl } from "./config";
import { COOKIE_ACCESS } from "./auth-server";
import type { Administrador, LogAuditoria, PaginaHistorial, Sorteo } from "./types";

/**
 * Lecturas de datos de administración para SERVER COMPONENTS (páginas del
 * panel al cargar por primera vez). Lee el access token directamente de la
 * cookie httpOnly con next/headers y llama al backend sin pasar por el
 * proxy /api/admin (eso lo usan solo los Client Components para mutaciones).
 *
 * Si esto se llama en una página bajo /admin, el middleware ya garantizó
 * que exista un access token válido antes de llegar aquí.
 */

class AdminDataError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function get<T>(path: string): Promise<T> {
  const token = cookies().get(COOKIE_ACCESS)?.value;
  const res = await fetch(`${backendUrl()}${API_V1}/admin${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    cache: "no-store",
  });

  if (!res.ok) {
    throw new AdminDataError(`Error consultando ${path}`, res.status);
  }
  return res.json();
}

export interface FiltrosSorteosAdmin {
  page?: number;
  estado?: string;
  fecha?: string;
  q?: string;
}

export interface PaginaSorteos {
  count: number;
  next: string | null;
  previous: string | null;
  results: Sorteo[];
}

export async function listarSorteosAdmin(
  filtros: FiltrosSorteosAdmin = {},
): Promise<PaginaSorteos> {
  const params = new URLSearchParams();
  if (filtros.page) params.set("page", String(filtros.page));
  if (filtros.estado) params.set("estado", filtros.estado);
  if (filtros.fecha) params.set("fecha", filtros.fecha);
  if (filtros.q) params.set("q", filtros.q);
  const query = params.toString();
  return get<PaginaSorteos>(`/sorteos${query ? `?${query}` : ""}`);
}

export async function obtenerSorteoAdmin(id: number | string): Promise<Sorteo> {
  return get<Sorteo>(`/sorteos/${id}`);
}

export interface FiltrosAuditoria {
  page?: number;
  administrador?: string;
}

export interface PaginaAuditoria {
  count: number;
  next: string | null;
  previous: string | null;
  results: LogAuditoria[];
}

export async function listarAuditoria(
  filtros: FiltrosAuditoria = {},
): Promise<PaginaAuditoria> {
  const params = new URLSearchParams();
  if (filtros.page) params.set("page", String(filtros.page));
  if (filtros.administrador) params.set("administrador", filtros.administrador);
  const query = params.toString();
  return get<PaginaAuditoria>(`/auditoria${query ? `?${query}` : ""}`);
}

export interface PaginaAdministradores {
  count: number;
  next: string | null;
  previous: string | null;
  results: Administrador[];
}

export async function listarAdministradores(
  page = 1,
): Promise<PaginaAdministradores> {
  return get<PaginaAdministradores>(`/administradores?page=${page}`);
}

export async function obtenerAdministradorAdmin(
  id: number | string,
): Promise<Administrador> {
  return get<Administrador>(`/administradores/${id}`);
}

export async function obtenerAdministradorActual(): Promise<Administrador> {
  return get<Administrador>(`/administradores/me`);
}

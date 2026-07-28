"use client";

/**
 * Cliente para el PANEL DE ADMINISTRACIÓN, pensado para usarse desde
 * Client Components (formularios, botones con onClick, etc.).
 *
 * IMPORTANTE sobre seguridad: este cliente NUNCA maneja el JWT directamente.
 * Llama a nuestras propias rutas /api/admin/* (ver app/api/admin/[...path]/route.ts),
 * que son las que agregan el header Authorization leyendo la cookie httpOnly
 * en el servidor de Next.js. Así el access token nunca queda expuesto al
 * JavaScript del navegador (mitiga robo de token por XSS).
 */

export class AdminApiError extends Error {
  status: number;
  detalle?: unknown;
  constructor(message: string, status: number, detalle?: unknown) {
    super(message);
    this.status = status;
    this.detalle = detalle;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`/api/admin${path}`, {
    ...options,
    headers: {
      ...(options.body && !(options.body instanceof FormData)
        ? { "Content-Type": "application/json" }
        : {}),
      ...options.headers,
    },
    credentials: "include",
    cache: "no-store",
  });

  if (res.status === 204) {
    return undefined as T;
  }

  const contentType = res.headers.get("content-type") || "";
  const body = contentType.includes("application/json")
    ? await res.json().catch(() => null)
    : null;

  if (!res.ok) {
    throw new AdminApiError(
      body?.detail || `Error en ${path} (${res.status})`,
      res.status,
      body,
    );
  }

  return body as T;
}

async function download(
  path: string,
  filenameFallback: string,
  options: RequestInit = {},
): Promise<void> {
  const res = await fetch(`/api/admin${path}`, {
    ...options,
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    const contentType = res.headers.get("content-type") || "";
    const body = contentType.includes("application/json")
      ? await res.json().catch(() => null)
      : null;
    throw new AdminApiError(
      body?.detail || `Error en ${path} (${res.status})`,
      res.status,
      body,
    );
  }

  const blob = await res.blob();
  const disposition = res.headers.get("content-disposition") || "";
  const nombreEncontrado = disposition.match(/filename="?([^"]+)"?/)?.[1];
  const filename = nombreEncontrado || filenameFallback;

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export const adminApi = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
  post: <T>(path: string, data?: unknown) =>
    request<T>(path, {
      method: "POST",
      body: data instanceof FormData ? data : JSON.stringify(data ?? {}),
    }),
  put: <T>(path: string, data?: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(data ?? {}) }),
  patch: <T>(path: string, data?: unknown) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(data ?? {}) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
  download,
};

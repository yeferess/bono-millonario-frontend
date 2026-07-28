import { API_V1, COOKIE_ACCESS, COOKIE_REFRESH, backendUrl } from "./config";

/**
 * Lógica de autenticación que SOLO corre en el servidor de Next.js
 * (middleware y route handlers). Nunca se importa desde un Client Component.
 *
 * Flujo de tokens:
 * 1. El admin hace login en /admin/login -> POST /api/auth/login (route handler).
 * 2. Ese handler llama al backend Django (simplejwt), recibe {access, refresh}
 *    y los guarda como cookies httpOnly (el JS del navegador nunca los toca).
 * 3. En cada request a /admin/** o /api/admin/**, el middleware revisa si el
 *    access token sigue vigente. Si no, intenta renovarlo con el refresh
 *    token (rotativo: el backend devuelve un refresh nuevo cada vez).
 * 4. El route handler proxy (/api/admin/[...path]) reenvía la petición al
 *    backend agregando "Authorization: Bearer <access>".
 */

// Duraciones deben coincidir (o ser un poco menores) que SIMPLE_JWT en Django:
// ACCESS_TOKEN_LIFETIME y REFRESH_TOKEN_LIFETIME.
export const ACCESS_MAX_AGE = 5 * 60; // 5 minutos
export const REFRESH_MAX_AGE = 7 * 24 * 60 * 60; // 7 días

export function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

export interface TokenPair {
  access: string;
  refresh: string;
}

export interface LoginResult extends TokenPair {
  administrador: {
    id: number;
    usuario: string;
    email: string;
    rol: "superadmin" | "editor";
  };
}

/** Llama al endpoint de login del backend (Django + simplejwt). */
export async function loginBackend(
  usuario: string,
  password: string,
): Promise<LoginResult> {
  const res = await fetch(`${backendUrl()}${API_V1}/admin/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario, password }),
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.detail || "Usuario o contraseña incorrectos");
  }

  return res.json();
}

/**
 * Intenta renovar el access token usando el refresh token.
 * Devuelve null si el refresh también expiró o es inválido
 * (en ese caso hay que forzar login de nuevo).
 */
export async function refreshBackend(
  refreshToken: string,
): Promise<TokenPair | null> {
  const res = await fetch(`${backendUrl()}${API_V1}/admin/auth/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refreshToken }),
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = await res.json();
  // simplejwt con ROTATE_REFRESH_TOKENS=True devuelve un refresh nuevo.
  return { access: data.access, refresh: data.refresh ?? refreshToken };
}

export async function logoutBackend(refreshToken: string): Promise<void> {
  try {
    await fetch(`${backendUrl()}${API_V1}/admin/auth/logout/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
      cache: "no-store",
    });
  } catch {
    // Si el backend no responde, igual limpiamos las cookies localmente.
  }
}

export { COOKIE_ACCESS, COOKIE_REFRESH };

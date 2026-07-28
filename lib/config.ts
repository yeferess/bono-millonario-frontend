// Lee la URL del backend en el servidor. Nunca se expone al bundle del cliente
// (a diferencia de NEXT_PUBLIC_*), lo cual es correcto porque todo lo que
// necesita autenticación pasa por nuestros propios route handlers (/api/*).
export function backendUrl(): string {
  const url = process.env.BACKEND_API_URL;
  if (!url) {
    throw new Error(
      "Falta la variable de entorno BACKEND_API_URL (URL del backend Django).",
    );
  }
  return url.replace(/\/$/, "");
}

export const API_V1 = "/api/v1";

export const COOKIE_ACCESS = process.env.AUTH_COOKIE_ACCESS || "bm_access";
export const COOKIE_REFRESH = process.env.AUTH_COOKIE_REFRESH || "bm_refresh";

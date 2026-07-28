import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_MAX_AGE,
  COOKIE_ACCESS,
  COOKIE_REFRESH,
  REFRESH_MAX_AGE,
  cookieOptions,
  refreshBackend,
} from "./lib/auth-server";

// Protege el panel de administración y su API proxy.
// /admin/login queda fuera para poder mostrar el formulario de acceso.
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

function esRutaLogin(pathname: string) {
  return pathname === "/admin/login";
}

function noAutorizado(req: NextRequest) {
  const esApi = req.nextUrl.pathname.startsWith("/api/admin");
  if (esApi) {
    return NextResponse.json(
      { detail: "Sesión expirada, inicia sesión de nuevo." },
      { status: 401 },
    );
  }
  const loginUrl = new URL("/admin/login", req.url);
  loginUrl.searchParams.set("next", req.nextUrl.pathname);
  const res = NextResponse.redirect(loginUrl);
  res.cookies.delete(COOKIE_ACCESS);
  res.cookies.delete(COOKIE_REFRESH);
  return res;
}

export async function middleware(req: NextRequest) {
  if (esRutaLogin(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const access = req.cookies.get(COOKIE_ACCESS)?.value;
  const refresh = req.cookies.get(COOKIE_REFRESH)?.value;

  if (access) {
    return NextResponse.next();
  }

  if (!refresh) {
    return noAutorizado(req);
  }

  // El access expiró (o nunca existió en este request) pero tenemos refresh:
  // intentamos renovar de forma transparente para el usuario.
  const renovado = await refreshBackend(refresh);
  if (!renovado) {
    return noAutorizado(req);
  }

  // Propagamos las cookies nuevas tanto a la request actual (para que el
  // route handler / server component que sigue ya las vea) como a la
  // response (para que el navegador las guarde).
  req.cookies.set(COOKIE_ACCESS, renovado.access);
  req.cookies.set(COOKIE_REFRESH, renovado.refresh);

  const res = NextResponse.next({ request: req });
  res.cookies.set(COOKIE_ACCESS, renovado.access, cookieOptions(ACCESS_MAX_AGE));
  res.cookies.set(
    COOKIE_REFRESH,
    renovado.refresh,
    cookieOptions(REFRESH_MAX_AGE),
  );
  return res;
}

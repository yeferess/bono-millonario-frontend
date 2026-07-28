import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_MAX_AGE,
  COOKIE_ACCESS,
  COOKIE_REFRESH,
  REFRESH_MAX_AGE,
  cookieOptions,
  refreshBackend,
} from "@/lib/auth-server";

// Normalmente el middleware ya renueva el token de forma transparente.
// Esta ruta existe como respaldo para casos donde el cliente detecte
// un 401 inesperado y quiera forzar una renovación manual.
export async function POST(req: NextRequest) {
  const refresh = req.cookies.get(COOKIE_REFRESH)?.value;

  if (!refresh) {
    return NextResponse.json({ detail: "No hay sesión." }, { status: 401 });
  }

  const renovado = await refreshBackend(refresh);
  if (!renovado) {
    const res = NextResponse.json(
      { detail: "Sesión expirada." },
      { status: 401 },
    );
    res.cookies.delete(COOKIE_ACCESS);
    res.cookies.delete(COOKIE_REFRESH);
    return res;
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_ACCESS, renovado.access, cookieOptions(ACCESS_MAX_AGE));
  res.cookies.set(
    COOKIE_REFRESH,
    renovado.refresh,
    cookieOptions(REFRESH_MAX_AGE),
  );
  return res;
}

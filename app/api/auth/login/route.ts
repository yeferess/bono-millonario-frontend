import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_MAX_AGE,
  COOKIE_ACCESS,
  COOKIE_REFRESH,
  REFRESH_MAX_AGE,
  cookieOptions,
  loginBackend,
} from "@/lib/auth-server";

export async function POST(req: NextRequest) {
  const { usuario, password } = await req.json().catch(() => ({}));

  if (!usuario || !password) {
    return NextResponse.json(
      { detail: "Usuario y contraseña son obligatorios." },
      { status: 400 },
    );
  }

  try {
    const { access, refresh, administrador } = await loginBackend(
      usuario,
      password,
    );

    const res = NextResponse.json({ administrador });
    res.cookies.set(COOKIE_ACCESS, access, cookieOptions(ACCESS_MAX_AGE));
    res.cookies.set(COOKIE_REFRESH, refresh, cookieOptions(REFRESH_MAX_AGE));
    return res;
  } catch (err) {
    const mensaje =
      err instanceof Error ? err.message : "No se pudo iniciar sesión.";
    return NextResponse.json({ detail: mensaje }, { status: 401 });
  }
}

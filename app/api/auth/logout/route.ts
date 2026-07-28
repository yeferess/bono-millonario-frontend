import { NextRequest, NextResponse } from "next/server";
import { COOKIE_ACCESS, COOKIE_REFRESH, logoutBackend } from "@/lib/auth-server";

export async function POST(req: NextRequest) {
  const refresh = req.cookies.get(COOKIE_REFRESH)?.value;

  if (refresh) {
    await logoutBackend(refresh);
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.delete(COOKIE_ACCESS);
  res.cookies.delete(COOKIE_REFRESH);
  return res;
}

import { NextRequest, NextResponse } from "next/server";
import { API_V1, backendUrl } from "@/lib/config";
import { COOKIE_ACCESS } from "@/lib/auth-server";

/**
 * Proxy genérico: todo lo que el panel admin llama en /api/admin/<algo>
 * se reenvía a {BACKEND_API_URL}/api/v1/admin/<algo> agregando el header
 * Authorization con el access token que guardamos en la cookie httpOnly.
 *
 * Ventaja de este patrón: el frontend (Client Components) nunca necesita
 * saber el token ni la URL real del backend. Y no hay que escribir un
 * route handler distinto para cada endpoint de administración.
 */

const METODOS_CON_BODY = new Set(["POST", "PUT", "PATCH"]);

async function proxy(req: NextRequest, path: string[]) {
  const access = req.cookies.get(COOKIE_ACCESS)?.value;

  if (!access) {
    // El middleware debería haber bloqueado esto antes, pero por seguridad
    // lo validamos también aquí.
    return NextResponse.json(
      { detail: "No autenticado." },
      { status: 401 },
    );
  }

  const destino = new URL(
    `${backendUrl()}${API_V1}/admin/${path.join("/")}/`,
  );
  destino.search = req.nextUrl.search;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${access}`,
  };

  const contentType = req.headers.get("content-type");
  let body: BodyInit | undefined;

  if (METODOS_CON_BODY.has(req.method)) {
    if (contentType?.includes("multipart/form-data")) {
      // Subida de imágenes: reenviamos el FormData tal cual.
      body = await req.formData();
    } else {
      body = await req.text();
      if (contentType) headers["Content-Type"] = contentType;
    }
  }

  const respuestaBackend = await fetch(destino, {
    method: req.method,
    headers,
    body,
    cache: "no-store",
  });

  const respContentType = respuestaBackend.headers.get("content-type") || "";
  if (respuestaBackend.status === 204) {
    return new NextResponse(null, { status: 204 });
  }

  if (respContentType.includes("application/json")) {
    const data = await respuestaBackend.json().catch(() => null);
    return NextResponse.json(data, { status: respuestaBackend.status });
  }

  // Respuestas binarias (ej. el PDF de boletos): pasar los bytes tal cual,
  // sin decodificar como texto, y reenviar Content-Type/Content-Disposition
  // para que el navegador sepa qué es y cómo nombrarlo al descargar.
  const bytes = await respuestaBackend.arrayBuffer();
  const headersRespuesta: HeadersInit = {};
  if (respContentType) headersRespuesta["Content-Type"] = respContentType;
  const disposition = respuestaBackend.headers.get("content-disposition");
  if (disposition) headersRespuesta["Content-Disposition"] = disposition;

  return new NextResponse(bytes, {
    status: respuestaBackend.status,
    headers: headersRespuesta,
  });
}

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  return proxy(req, params.path);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  return proxy(req, params.path);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  return proxy(req, params.path);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  return proxy(req, params.path);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  return proxy(req, params.path);
}

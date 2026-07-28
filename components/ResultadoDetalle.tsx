import Image from "next/image";
import type { Sorteo } from "@/lib/types";
import { EstadoBadge } from "./EstadoBadge";
import { CuentaRegresiva } from "./CuentaRegresiva";

function extraerIdYoutube(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  );
  return match ? match[1] : null;
}

function formatearFecha(fecha: string) {
  const d = new Date(`${fecha}T00:00:00`);
  return d.toLocaleDateString("es", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Muestra el resultado completo de un sorteo: es el componente que ve
// el usuario final al escanear el QR o al abrir un resultado del historial.
export function ResultadoDetalle({ sorteo }: { sorteo: Sorteo }) {
  const pendiente = sorteo.estado !== "publicado";
  const imagenResultado =
    sorteo.imagenes?.find((img) => img.tipo === "resultado") ??
    sorteo.imagenes?.[0];
  const imagenGanador = sorteo.imagenes?.find((img) => img.tipo === "ganador");
  const idYoutube = sorteo.video_url ? extraerIdYoutube(sorteo.video_url) : null;

  return (
    <div className="space-y-5">
      <div className="tarjeta text-center">
        <p className="etiqueta">{sorteo.nombre_juego}</p>
        <p className="mt-1 text-lg text-neutral-700">
          {formatearFecha(sorteo.fecha_sorteo)}
        </p>
        <div className="mt-2">
          <EstadoBadge estado={sorteo.estado} />
        </div>
      </div>

      {pendiente ? (
        <CuentaRegresiva
          fechaSorteo={sorteo.fecha_sorteo}
          horaSorteo={sorteo.hora_sorteo}
        />
      ) : (
        <>
          {imagenResultado && (
            <div className="overflow-hidden rounded-2xl border border-neutral-200 shadow-sm">
              <Image
                src={imagenResultado.url_optimizada || imagenResultado.url_original}
                alt={`Imagen oficial del resultado de ${sorteo.nombre_juego}`}
                width={800}
                height={800}
                className="h-auto w-full"
              />
            </div>
          )}

          <div className="tarjeta text-center">
            <p className="etiqueta">Número ganador</p>
            <p className="mt-1 text-3xl font-extrabold tracking-wide text-fuego-600">
              {sorteo.numero_ganador}
            </p>
            {sorteo.serie && (
              <p className="mt-1 text-lg text-neutral-700">
                Serie: <span className="font-semibold">{sorteo.serie}</span>
              </p>
            )}
          </div>

          <div className="tarjeta text-center">
            <p className="etiqueta">Premio principal</p>
            <p className="mt-1 text-2xl font-bold text-neutral-900">
              $ {sorteo.premio_principal}
            </p>
          </div>

          {imagenGanador && (
            <div className="tarjeta text-center">
              <p className="etiqueta mb-2">Foto del ganador</p>
              <div className="overflow-hidden rounded-2xl border border-neutral-200 shadow-sm">
                <Image
                  src={imagenGanador.url_optimizada || imagenGanador.url_original}
                  alt={`Foto del ganador de ${sorteo.nombre_juego}`}
                  width={800}
                  height={800}
                  className="h-auto w-full"
                />
              </div>
            </div>
          )}

          {idYoutube && (
            <div className="tarjeta">
              <p className="etiqueta mb-2">Video del sorteo</p>
              <div className="relative aspect-video overflow-hidden rounded-2xl">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${idYoutube}`}
                  title={`Video del sorteo ${sorteo.nombre_juego}`}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {sorteo.premios_secundarios && sorteo.premios_secundarios.length > 0 && (
            <div className="tarjeta">
              <p className="etiqueta mb-2">Premios secundarios</p>
              <ul className="divide-y divide-neutral-100">
                {sorteo.premios_secundarios.map((p) => (
                  <li key={p.id} className="flex justify-between py-2 text-lg">
                    <span>{p.nombre} · {p.numero}</span>
                    <span className="font-semibold">{p.valor}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

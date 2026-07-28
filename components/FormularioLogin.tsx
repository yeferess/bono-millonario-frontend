"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Boton } from "./Boton";

export function FormularioLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setCargando(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || "No se pudo iniciar sesión.");
      }
      const destino = searchParams.get("next") || "/admin/dashboard";
      router.push(destino);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <form onSubmit={enviar} className="tarjeta space-y-4">
      <div>
        <label htmlFor="usuario" className="etiqueta mb-1 block">
          Usuario
        </label>
        <input
          id="usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="min-h-touch w-full rounded-lg border border-neutral-300 px-3 text-lg"
          autoComplete="username"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="etiqueta mb-1 block">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="min-h-touch w-full rounded-lg border border-neutral-300 px-3 text-lg"
          autoComplete="current-password"
          required
        />
      </div>

      {error && <p className="text-base font-medium text-red-600">{error}</p>}

      <Boton type="submit" disabled={cargando}>
        {cargando ? "Ingresando..." : "Ingresar"}
      </Boton>
    </form>
  );
}

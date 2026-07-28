"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Administrador, AdministradorFormValues } from "@/lib/types";
import { AdminApiError, adminApi } from "@/lib/admin-api";
import { Boton } from "./Boton";

const valoresVacios: AdministradorFormValues = {
  usuario: "",
  email: "",
  rol: "editor",
  password: "",
};

function extraerMensajeError(err: unknown): string {
  if (err instanceof AdminApiError && err.detalle && typeof err.detalle === "object") {
    const primerCampo = Object.values(err.detalle as Record<string, unknown>)[0];
    if (Array.isArray(primerCampo) && typeof primerCampo[0] === "string") {
      return primerCampo[0];
    }
  }
  return err instanceof Error ? err.message : "No se pudo guardar.";
}

export function FormularioAdministrador({
  administrador,
}: {
  administrador?: Administrador;
}) {
  const router = useRouter();
  const [valores, setValores] = useState<AdministradorFormValues>(
    administrador
      ? {
          usuario: administrador.usuario,
          email: administrador.email,
          rol: administrador.rol,
          password: "",
        }
      : valoresVacios,
  );
  const [error, setError] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);

  function actualizar<K extends keyof AdministradorFormValues>(
    campo: K,
    valor: AdministradorFormValues[K],
  ) {
    setValores((v) => ({ ...v, [campo]: valor }));
  }

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setGuardando(true);
    try {
      const payload = { ...valores };
      if (!payload.password) delete payload.password;

      if (administrador) {
        await adminApi.patch<Administrador>(
          `/administradores/${administrador.id}`,
          payload,
        );
        router.push("/admin/administradores");
        router.refresh();
      } else {
        await adminApi.post<Administrador>("/administradores", payload);
        router.push("/admin/administradores");
      }
    } catch (err) {
      setError(extraerMensajeError(err));
    } finally {
      setGuardando(false);
    }
  }

  return (
    <form onSubmit={guardar} className="tarjeta space-y-4">
      <div>
        <label className="etiqueta mb-1 block">Usuario</label>
        <input
          value={valores.usuario}
          onChange={(e) => actualizar("usuario", e.target.value)}
          required
          className="min-h-touch w-full rounded-lg border border-neutral-300 px-3 text-lg"
        />
      </div>

      <div>
        <label className="etiqueta mb-1 block">Email</label>
        <input
          type="email"
          value={valores.email}
          onChange={(e) => actualizar("email", e.target.value)}
          required
          className="min-h-touch w-full rounded-lg border border-neutral-300 px-3 text-lg"
        />
      </div>

      <div>
        <label className="etiqueta mb-1 block">Rol</label>
        <select
          value={valores.rol}
          onChange={(e) => actualizar("rol", e.target.value as AdministradorFormValues["rol"])}
          className="min-h-touch w-full rounded-lg border border-neutral-300 px-3 text-lg"
        >
          <option value="editor">Editor</option>
          <option value="superadmin">Superadmin</option>
        </select>
      </div>

      <div>
        <label className="etiqueta mb-1 block">
          {administrador ? "Nueva contraseña (opcional)" : "Contraseña"}
        </label>
        <input
          type="password"
          value={valores.password}
          onChange={(e) => actualizar("password", e.target.value)}
          required={!administrador}
          minLength={8}
          placeholder={administrador ? "Dejar en blanco para no cambiarla" : undefined}
          className="min-h-touch w-full rounded-lg border border-neutral-300 px-3 text-lg"
        />
      </div>

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      <Boton type="submit" disabled={guardando}>
        {guardando
          ? "Guardando..."
          : administrador
            ? "Guardar cambios"
            : "Crear administrador"}
      </Boton>
    </form>
  );
}

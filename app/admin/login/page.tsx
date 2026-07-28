import { Suspense } from "react";
import { FormularioLogin } from "@/components/FormularioLogin";

export default function AdminLoginPage() {
  return (
    <main className="contenedor-pagina flex min-h-screen flex-col justify-center">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-neutral-900">
          Panel de administración
        </h1>
        <p className="etiqueta mt-1">Bono Millonario</p>
      </div>
      <Suspense>
        <FormularioLogin />
      </Suspense>
    </main>
  );
}

import { LogoHero } from "@/components/LogoHero";
import { NavAdmin } from "@/components/NavAdmin";

export default function Cargando() {
  return (
    <main className="contenedor-pagina animate-pulse">
      <LogoHero />
      <NavAdmin />
      <div className="mb-4 h-8 w-1/2 rounded-lg bg-neutral-100" />
      <div className="space-y-3">
        <div className="tarjeta h-24 bg-neutral-100" />
        <div className="tarjeta h-24 bg-neutral-100" />
        <div className="tarjeta h-24 bg-neutral-100" />
      </div>
    </main>
  );
}

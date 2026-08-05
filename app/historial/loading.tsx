import { LogoHero } from "@/components/LogoHero";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Cargando() {
  return (
    <>
      <Navbar />
      <main className="contenedor-pagina animate-pulse">
        <LogoHero />
        <div className="mb-4 h-8 w-2/3 rounded-lg bg-neutral-100" />
        <div className="mb-3 h-12 rounded-lg bg-neutral-100" />
        <div className="space-y-3">
          <div className="tarjeta h-16 bg-neutral-100" />
          <div className="tarjeta h-16 bg-neutral-100" />
          <div className="tarjeta h-16 bg-neutral-100" />
        </div>
      </main>
      <Footer />
    </>
  );
}

import { LogoHero } from "@/components/LogoHero";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Cargando() {
  return (
    <>
      <Navbar />
      <main className="contenedor-pagina animate-pulse">
        <LogoHero />
        <div className="tarjeta mb-5 h-20 bg-neutral-100" />
        <div className="tarjeta mb-3 h-56 bg-neutral-100" />
        <div className="tarjeta h-20 bg-neutral-100" />
      </main>
      <Footer />
    </>
  );
}

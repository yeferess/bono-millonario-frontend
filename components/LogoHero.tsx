import Image from "next/image";

export function LogoHero() {
  return (
    <div className="-mx-4 mb-4 flex justify-center  px-4 py-6">
      <Image src="/logo.png" alt="Bono Millonario" width={220} height={110} priority />
    </div>
  );
}

import type { Metadata, Viewport } from "next";
import { inter, nunito, poppins, openSans, notoSans } from "@/lib/fonts";
import "./globals.css";
import { Open_Sans } from "next/font/google";

export const metadata: Metadata = {
  title: "Bono Millonario | Resultados de sorteos",
  description:
    "Consulta el resultado oficial de tu sorteo escaneando el código QR de tu cartón.",
};

// viewport separado (requisito de Next.js 14) + evitamos zoom raro en inputs
// pero permitimos zoom manual por accesibilidad (adultos mayores).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${openSans.className} antialiased`}>{children}</body>
    </html>
  );
}

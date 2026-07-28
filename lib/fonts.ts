import { Inter, Nunito, Poppins, Open_Sans, Noto_Sans } from "next/font/google";

export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-nunito" });
export const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-poppins" });
export const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-open-sans", });
export const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-noto-sans", });
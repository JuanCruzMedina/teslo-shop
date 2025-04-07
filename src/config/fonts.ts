import { Geist, Geist_Mono, Inter, Montserrat_Alternates } from "next/font/google";

export const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const titleFont = Montserrat_Alternates({
    variable: "--font-title",
    subsets: ["latin"],
    weight: ["500", "700"],
});
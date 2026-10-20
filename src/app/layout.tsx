import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { LocationMap } from "@/components/sections/LocationMap";
import { site, siteUrl } from "@/data/site";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AGN | Cestas básicas para empresas",
    template: "%s | AGN",
  },
  description: site.description,
  applicationName: site.legalName,
  keywords: [
    "cesta básica",
    "cestas básicas para empresas",
    "atacado de alimentos",
    "AGN",
    "distribuição de cestas",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    title: "AGN | Cestas básicas para empresas",
    description: site.description,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "AGN | Cestas básicas para empresas",
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-canvas text-ink">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Ir para o conteúdo
        </a>
        <Header />
        <main id="conteudo" tabIndex={-1} className="flex flex-1 flex-col outline-none">
          {children}
        </main>
        <LocationMap />
        <Footer />
        <WhatsAppFloat />
        <ScrollToTop />
      </body>
    </html>
  );
}

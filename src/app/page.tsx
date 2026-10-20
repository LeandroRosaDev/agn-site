import type { Metadata } from "next";
import { CatalogPreview } from "@/components/sections/CatalogPreview";
import { Clients } from "@/components/sections/Clients";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Differentials } from "@/components/sections/Differentials";
import { Faq } from "@/components/sections/Faq";
import { FreshToHome } from "@/components/sections/FreshToHome";
import { Hero } from "@/components/sections/Hero";
import { NotSoBasic } from "@/components/sections/NotSoBasic";
import { Socials } from "@/components/sections/Socials";
import { Stats } from "@/components/sections/Stats";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FreshToHome />
      <Clients />
      <Differentials />
      <CatalogPreview />
      <NotSoBasic />
      <Stats />
      <Faq />
      <Socials />
      <CtaBanner />
    </>
  );
}

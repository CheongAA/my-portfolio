import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import TechMarquee from "@/components/home/TechMarquee";
import CTAPanels from "@/components/home/CTAPanels";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <TechMarquee />
      <CTAPanels />
    </>
  );
}

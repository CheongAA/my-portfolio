import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import ContactSection from "@/components/home/ContactSection";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="relative bg-background text-foreground overflow-hidden flex flex-col gap-50">
      <header className="fixed w-full z-30 flex justify-center items-center pt-4 backdrop-blur">
        <Navbar />
      </header>

      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}

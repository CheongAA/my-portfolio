import Navbar from "../components/Navbar";

import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import ProjectsSection from "../components/home/ProjectsSection";
import ContactSection from "../components/home/ContactSection";

export default function HomePage() {
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

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import Container from "./Container";
import LanguageSwitcher from "./LanguageSwitcher";
import NavLink from "./NavLink";

const Navbar = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Container className="w-full flex items-center justify-end md:justify-between my-0">
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-1">
        <NavLink href="#about">{t("nav.about")}</NavLink>
        <NavLink href="#experiences">{t("nav.experiences")}</NavLink>
        <NavLink href="#contact">{t("nav.contact")}</NavLink>
      </nav>

      {/* Desktop Language Switcher & Mobile Menu Button */}
      <div className="flex items-center gap-1">
        {/* Desktop Language Switcher */}
        <div className="hidden md:flex">
          <LanguageSwitcher />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden relative z-50 pt-2 text-primary"
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6">
            {/* top */}
            <motion.span
              className="absolute left-0 top-1/2 w-full h-0.5 bg-current origin-center"
              animate={isMenuOpen ? { rotate: 45 } : { rotate: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            />

            {/* middle */}
            <motion.span
              className="absolute left-0 top-1/2 w-full h-0.5 bg-current"
              animate={{ opacity: isMenuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />

            {/* bottom */}
            <motion.span
              className="absolute left-0 top-1/2 w-full h-0.5 bg-current origin-center"
              animate={isMenuOpen ? { rotate: -45 } : { rotate: 0, y: 6 }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 h-svh z-40 md:hidden bg-background pt-20 pb-8 px-10"
          >
            <nav className="flex flex-col gap-4">
              <NavLink href="#about" onClick={() => setIsMenuOpen(false)}>
                {t("nav.about")}
              </NavLink>
              <NavLink href="#experiences" onClick={() => setIsMenuOpen(false)}>
                {t("nav.experiences")}
              </NavLink>
              <NavLink href="#contact" onClick={() => setIsMenuOpen(false)}>
                {t("nav.contact")}
              </NavLink>
              <div className="mt-4 pt-4 border-t border-border">
                <LanguageSwitcher
                  onLanguageChange={() => setIsMenuOpen(false)}
                />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Navbar;

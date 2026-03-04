"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link, usePathname } from "@/i18n/navigation";
import Container from "./Container";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { NAV_LINKS } from "@/constants/navLinks";
import { Button } from "./ui/button";

const Navbar = () => {
  const t = useTranslations("nav");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Container className="w-full flex items-center justify-end md:justify-between my-0">
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-1">
        {NAV_LINKS.map(({ href, labelKey }) => (
          <Button
            key={href}
            variant="ghost"
            data-active={isActive(href)}
            asChild
          >
            <Link href={href}>{t(labelKey)}</Link>
          </Button>
        ))}
      </nav>

      {/* Right controls */}
      <div className="flex items-center justify-between gap-1 w-full md:w-fit">
        <div className="flex flex-row gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <Button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden relative z-50 text-primary"
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6">
            <motion.span
              className="absolute left-0 top-1/2 w-full h-0.5 bg-current origin-center"
              animate={isMenuOpen ? { rotate: 45 } : { rotate: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute left-0 top-1/2 w-full h-0.5 bg-current"
              animate={{ opacity: isMenuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute left-0 top-1/2 w-full h-0.5 bg-current origin-center"
              animate={isMenuOpen ? { rotate: -45 } : { rotate: 0, y: 6 }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </Button>
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
              {NAV_LINKS.map(({ href, labelKey }) => (
                <Button
                  key={href}
                  variant="ghost"
                  size="lg"
                  className="justify-start"
                  data-active={isActive(href)}
                  onClick={() => setIsMenuOpen(false)}
                  asChild
                >
                  <Link href={href}>{t(labelKey)}</Link>
                </Button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Navbar;

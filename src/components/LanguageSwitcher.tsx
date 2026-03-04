"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

type LanguageSwitcherProps = {
  onLanguageChange?: () => void;
};

export default function LanguageSwitcher({
  onLanguageChange,
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "ko" : "en";
    router.replace(pathname, { locale: newLocale });
    onLanguageChange?.();
  };

  return (
    <Button variant="ghost" data-active size="sm" onClick={toggleLanguage}>
      {locale === "en" ? "Ko" : "En"}
    </Button>
  );
}

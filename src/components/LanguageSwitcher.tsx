import { useTranslation } from "react-i18next";
import NavLink from "./NavLink";

type LanguageSwitcherProps = {
  onLanguageChange?: () => void;
};

export default function LanguageSwitcher({ onLanguageChange }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ko" : "en";
    i18n.changeLanguage(newLang);
    onLanguageChange?.();
  };

  return (
    <NavLink as="button" onClick={toggleLanguage}>
      {i18n.language === "en" ? "Ko" : "En"}
    </NavLink>
  );
}

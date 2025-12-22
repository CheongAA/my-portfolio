import { useTranslation } from "react-i18next";
import Container from "./Container";
import LanguageSwitcher from "./LanguageSwitcher";
import NavLink from "./NavLink";

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <Container className="w-full flex items-center justify-between my-0">
      <nav className="flex items-center gap-1">
        <NavLink href="#about">{t("nav.about")}</NavLink>
        <NavLink href="#experiences">{t("nav.experiences")}</NavLink>
        <NavLink href="#contact">{t("nav.contact")}</NavLink>
      </nav>

      <div className="flex items-center gap-1">
        <LanguageSwitcher />
      </div>
    </Container>
  );
};

export default Navbar;

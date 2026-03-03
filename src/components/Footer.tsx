import { useTranslations } from "next-intl";
import Container from "./Container";

interface SocialLink {
  name: string;
  url: string;
}

const Footer = () => {
  const t = useTranslations("contact");
  const socialLinks = t.raw("social") as SocialLink[];
  return (
    <Container
      as="footer"
      className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-border pt-12 mt-0"
    >
      <div className="flex gap-8">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit my ${social.name} profile`}
            className="relative z-20 text-secondary hover:text-primary transition text-sm cursor-pointer"
          >
            {social.name}
          </a>
        ))}
      </div>
      <div className="text-secondary text-sm">
        © {new Date().getFullYear()} {t("copyright")}
      </div>
    </Container>
  );
};

export default Footer;

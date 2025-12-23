import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Container from "../Container";
import ContactForm from "../ContactForm";
import Trans from "../Trans";

interface SocialLink {
  name: string;
  url: string;
}

export default function ContactSection() {
  const { t } = useTranslation();
  const socialLinks = t("contact.social", {
    returnObjects: true,
  }) as SocialLink[];

  return (
    <section id="contact" className="relative z-10">
      <Container>
        {/* Contact Title */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-primary mb-6">
            {t("contact.title")}
          </h2>
          <p className="text-xl text-secondary max-w-2xl">
            <Trans i18nKey="contact.subtitle" />
          </p>
        </motion.div>

        {/* Contact Form */}
        <ContactForm />

        {/* Social Links */}
        <div className="border-t border-border pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
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
              © {new Date().getFullYear()} {t("contact.copyright")}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

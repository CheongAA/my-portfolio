"use client";

import { useTranslations } from "next-intl";
import Container from "../Container";
import ContactForm from "./ContactForm";
import Trans from "../Trans";

export default function ContactSection() {
  const t = useTranslations("contact");

  return (
    <section className="relative z-10">
      <Container>
        <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-primary mb-6">
          {t("title")}
        </h2>
        <p className="text-xl text-secondary max-w-2xl mb-16">
          <Trans text={t("subtitle")} />
        </p>

        <ContactForm />
      </Container>
    </section>
  );
}

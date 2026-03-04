import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import ViewportHeightProvider from "@/components/ViewportHeightProvider";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";

const baseUrl = "https://cheongaa.github.io/my-portfolio";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        ko: `${baseUrl}/ko`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ViewportHeightProvider />

      <div className="relative bg-background text-foreground overflow-hidden flex flex-col min-h-screen">
        <header className="fixed w-full z-30 flex justify-center items-center pt-4 backdrop-blur">
          <Navbar />
        </header>
        {children}
        <Footer />
        <ScrollToTop />
      </div>
    </NextIntlClientProvider>
  );
}

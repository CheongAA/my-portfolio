import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const GA_ID = "G-YX7ZCVD7H5";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Kim Cheong A — Frontend Developer",
  description:
    "서비스 전반을 이해하는 프론트엔드 개발자 김청아의 포트폴리오입니다.",
  icons: { icon: `${basePath}/favicon.ico` },
  openGraph: {
    title: "Kim Cheong A — Frontend Developer",
    description:
      "서비스 전반을 이해하는 프론트엔드 개발자 김청아의 포트폴리오입니다.",
    type: "website",
    siteName: "Kim Cheong A — Frontend Developer",
    locale: "ko_KR",
    url: "https://cheongaa.github.io/my-portfolio",
    images: [
      {
        url: "https://cheongaa.github.io/my-portfolio/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kim Cheong A — Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kim Cheong A — Frontend Developer",
    description:
      "서비스 전반을 이해하는 프론트엔드 개발자 김청아의 포트폴리오입니다.",
    images: ["https://cheongaa.github.io/my-portfolio/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
          crossOrigin="anonymous"
        />
        <link
          href="https://db.onlinewebfonts.com/c/879269be836bf8d970d4ef4fb0e54f42?family=GT+America+Extended+Regular"
          rel="stylesheet"
        />
        <meta
          name="google-site-verification"
          content="JexWRUoN3jeag7CuuYEiiAidIVkN-FoMgXElNoA9m2I"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}

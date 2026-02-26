import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Devlog - Kim Cheong A",
  description: "Developer blog by Kim Cheong A",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
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
      </head>
      <body>{children}</body>
    </html>
  );
}

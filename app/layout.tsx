import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brayan G. Vieira",
  description: "Brayan G. Vieira - Full Stack Developer Portfolio",
  generator: "Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";
import GSAPProvider from "@/components/GSAPProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Jack Wang",
  description: "Software Engineer & Developer & Researcher & Athlete",
  appleWebApp: {
    capable: false,
    statusBarStyle: "default",
    title: "Jack Wang"
  },
  applicationName: "Jack Wang"
};

export const viewport: Viewport = {
  themeColor: 'black',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable}`}>
      <GoogleAnalytics />
      <body className="relative">
        <GSAPProvider>
          <ScrollToTop />
          <main className="relative z-10">{children}</main>
        </GSAPProvider>
      </body>
    </html>
  );
}

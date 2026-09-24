import type { Metadata } from "next";
import "./globals.css";
import CatalogProviders from "@/components/products/CatalogProviders";

export const metadata: Metadata = {
  title: "Crunchie Wunche — Premium Snacking & Gifting",
  description: "Premium snacking & thoughtfully curated gifting — turning everyday snacking into memorable moments.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body><CatalogProviders>{children}</CatalogProviders></body>
    </html>
  );
}

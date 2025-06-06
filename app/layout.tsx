import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Sync-ui - HuizenHub",
  description: "Revolutioneren van de Nederlandse woningmarkt met innovatieve technologie en een disruptieve aanpak.",
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className="text-primary scroll-smooth">
      <body className={`${GeistSans.className} ${GeistMono.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

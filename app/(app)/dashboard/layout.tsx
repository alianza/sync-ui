import React from "react";
import { Footer } from "@/components/layout/Footer";
import { AppHeader } from "@/components/layout/Header/app/AppHeader";
import Providers from "@/components/providers/providers";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Providers>
      <div className="flex min-h-screen grow flex-col">
        <AppHeader />
        <main className="flex-1">{children}</main>
        <Toaster />
        <Footer />
      </div>
    </Providers>
  );
}

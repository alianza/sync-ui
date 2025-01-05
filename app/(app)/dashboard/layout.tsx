import React from "react";
import { Footer } from "@/components/layout/Footer";
import { AppHeader } from "@/components/layout/Header/app/AppHeader";
import Providers from "@/components/providers/providers";
import { Toaster } from "@/components/ui/toaster";
import { authGuard } from "@/lib/server.utils";

export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await authGuard();

  return (
    <Providers>
      <div className="flex min-h-screen flex-col">
        <AppHeader session={session} />
        <main className="grow bg-neutral-100 dark:bg-neutral-900">{children}</main>
        <Toaster />
        <Footer />
      </div>
    </Providers>
  );
}

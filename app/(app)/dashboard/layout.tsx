import React from "react";
import { Footer } from "@/components/layout/Footer";
import { AppHeader } from "@/components/layout/Header/app/AppHeader";
import Providers from "@/components/providers/providers";
import { Toaster } from "@/components/ui/toaster";
import { SidebarInset } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Providers appMode>
      <SidebarInset className="overflow-hidden">
        <div className="flex min-h-screen w-full flex-col">
          <AppHeader />
          <main className="grow bg-neutral-100 dark:bg-neutral-900">{children}</main>
          <Toaster />
          <Footer />
        </div>
      </SidebarInset>
    </Providers>
  );
}

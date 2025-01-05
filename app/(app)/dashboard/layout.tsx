import React from "react";
import { Footer } from "@/components/layout/Footer";
import { AppHeader } from "@/components/layout/Header/app/AppHeader";
import Providers from "@/components/providers/providers";
import { authGuard } from "@/lib/server.utils";
import { SidebarInset } from "@/components/ui/sidebar";

export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await authGuard();

  return (
    <Providers appMode>
      <SidebarInset className="overflow-hidden">
        <div className="flex min-h-screen w-full flex-col">
          <AppHeader session={session}/>
          <main className="grow bg-neutral-100 dark:bg-neutral-900">{children}</main>

          <Footer />
        </div>
      </SidebarInset>
    </Providers>
  );
}

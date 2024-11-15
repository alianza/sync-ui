"use client";

import { SessionProvider } from "next-auth/react";

const NextNProgress = dynamic(() => import("next-nprogress-bar").then((mod) => mod.AppProgressBar), {
  loading: () => <></>,
  ssr: false,
});

import React from "react";
import dynamic from "next/dynamic";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSideBar";

function Providers({ children, appMode = false }: { children: React.ReactNode; appMode?: boolean }) {
  return (
    <>
      {appMode ? (
        <SessionProvider>
          <SidebarProvider>
            <AppSidebar />
            {children}
          </SidebarProvider>
        </SessionProvider>
      ) : (
        <SessionProvider>{children}</SessionProvider>
      )}
      <NextNProgress
        height="3px"
        color="#eee"
        shallowRouting
        options={{ showSpinner: false, easing: "ease", speed: 500 }}
      />
    </>
  );
}

export default Providers;

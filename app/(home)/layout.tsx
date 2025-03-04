import { HomeHeader } from "@/components/layout/Header/home/HomeHeader";
import { Footer } from "@/components/layout/Footer";
import React from "react";
import Providers from "@/components/providers/providers";

interface Props {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: Props) {
  return (
    <Providers>
      <div className="flex min-h-screen flex-col">
        <HomeHeader />
        <main className="grow bg-neutral-100 dark:bg-neutral-900">{children}</main>
        <Footer />
      </div>
    </Providers>
  );
}

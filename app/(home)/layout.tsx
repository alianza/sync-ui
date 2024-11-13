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
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </Providers>
  );
}

"use client";

import Link from "next/link";
import { Home } from "lucide-react";
import { usePathname } from "next/navigation";
import NavLink from "@/components/navLink";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="flex h-14 items-center bg-background px-4 shadow dark:border-b-2 lg:px-6">
      <Link className="flex items-center justify-center" href="/">
        {pathname !== "/" ? <Home className="size-6" /> : <span className="underline-hover">Sync UI - HuizenHub</span>}
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <NavLink href="/#features" label="Features" />
        <NavLink href="/pricing" label="Pricing" />
        <NavLink href="/about" label="About" />
        <NavLink href="/contact" label="Contact" />
        <NavLink href="/login" label="Login" />
      </nav>
    </header>
  );
}

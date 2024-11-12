"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home } from "lucide-react";

export function HeaderLogo() {
  const pathname = usePathname();

  return (
    <Link className="flex items-center justify-center" href="/">
      {pathname !== "/" ? <Home className="size-6" /> : <span className="underline-hover">Sync UI - HuizenHub</span>}
    </Link>
  );
}

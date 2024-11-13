"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeaderLogo() {
  const pathname = usePathname();

  return (
    <Link className="flex items-center justify-center" href="/">
      {pathname !== "/" ? (
        <Button variant="ghost" className="size-7 p-0">
          <Home className="size-6" />
        </Button>
      ) : (
        <span className="underline-hover">Sync UI - HuizenHub</span>
      )}
    </Link>
  );
}

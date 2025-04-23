"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/client.utils";

interface NavLinkProps {
  href: string;
  exact?: boolean;
  label: React.ReactNode | string;
  className?: string;
}

const NavLink = ({ href, exact, label, className }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "flex p-2 text-sm font-bold underline-offset-4",
        isActive ? "underline decoration-inherit!" : "underline-hover",
        "decoration-transparent",
        className,
      )}
    >
      {label}
    </Link>
  );
};

export default NavLink;

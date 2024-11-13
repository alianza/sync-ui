"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  exact?: boolean;
  label: string;
}

const NavLink = ({ href, exact, label }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`underline-hover p-2 text-sm font-bold underline-offset-4 ${isActive ? "underline !decoration-inherit" : "no-underline"}`}
    >
      {label}
    </Link>
  );
};

export default NavLink;

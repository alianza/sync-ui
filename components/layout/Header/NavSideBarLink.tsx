"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  label: string;
  href: string;
  icon: React.ElementType;
  exact?: boolean;
};

export function NavSideBarLink({ label, href, icon: Icon, exact }: Props) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <SidebarMenuItem key={label}>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link href={href}>
          <Icon />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

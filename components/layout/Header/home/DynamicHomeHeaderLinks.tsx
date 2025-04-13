"use client";

import NavLink from "@/components/NavLink";
import SignOutButton from "@/components/SignOutButton";
import { useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";

export function DynamicHomeHeaderLinks() {
  const { data: session } = useSession();

  return session ? (
    <>
      <NavLink href="/dashboard" label="Dashboard" />
      <SignOutButton />
    </>
  ) : (
    <NavLink href="/login" label="Login" />
  );
}

export function MobileDynamicHomeHeaderLinks() {
  const { data: session } = useSession();

  return session ? (
    <>
      <NavLink
        href="/dashboard"
        label="Dashboard"
        className="hover:bg-muted active:bg-muted rounded p-4 transition-colors duration-200 ease-in-out"
      />
      <Separator className="mt-auto" />
      <SignOutButton className="hover:bg-muted active:bg-muted rounded p-4 transition-colors duration-200 ease-in-out" />
    </>
  ) : (
    <NavLink
      href="/login"
      label="Login"
      className="hover:bg-muted active:bg-muted rounded p-4 transition-colors duration-200 ease-in-out"
    />
  );
}

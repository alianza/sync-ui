"use client";

import NavLink from "@/components/NavLink";
import SignOutButton from "@/components/SignOutButton";
import { useSession } from "next-auth/react";

export function DynamicAppHeaderLinks() {
  const { data: session, status } = useSession();

  return <>{session ? <SignOutButton /> : <NavLink href="/login" label="Login" />}</>;
}

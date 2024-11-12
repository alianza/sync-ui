"use client";

import NavLink from "@/components/NavLink";
import SignOutButton from "@/components/SignOutButton";
import { useCurrentSession } from "@/lib/client.utils";

export function DynamicAppHeaderLinks() {
  const { session, status } = useCurrentSession();

  return <>{session ? <SignOutButton /> : <NavLink href="/login" label="Login" />}</>;
}

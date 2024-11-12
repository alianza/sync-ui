"use client";

import NavLink from "@/components/NavLink";
import SignOutButton from "@/components/SignOutButton";
import { useCurrentSession } from "@/lib/client.utils";

export function DynamicHomeHeaderLinks() {
  const { session, status } = useCurrentSession();

  return (
    <>
      {session ? (
        <>
          <NavLink href="/dashboard" label="Dashboard" />
          <SignOutButton />
        </>
      ) : (
        <NavLink href="/login" label="Login" />
      )}
    </>
  );
}

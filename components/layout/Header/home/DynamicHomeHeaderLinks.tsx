"use client";

import NavLink from "@/components/NavLink";
import SignOutButton from "@/components/SignOutButton";
import { useSession } from "next-auth/react";

export function DynamicHomeHeaderLinks() {
  const { data: session, status } = useSession()

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

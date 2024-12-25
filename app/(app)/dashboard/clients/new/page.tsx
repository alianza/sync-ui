import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ClientInviteForm } from "@/components/forms/ClientInviteForm";

export default async function ClientsPage() {
  const session = await auth();

  if (!session) redirect("/login");

  return (
    <section className="container mx-auto w-full px-4 py-12 md:px-6 md:py-24 lg:py-32">
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Invite</h2>
      </div>
      <div className="mx-auto mt-12">
        <ClientInviteForm />
      </div>
    </section>
  );
}

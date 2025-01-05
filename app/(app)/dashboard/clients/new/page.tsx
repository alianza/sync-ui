import React from "react";
import { ClientInviteForm } from "@/components/forms/ClientInviteForm";
import { authGuard } from "@/lib/server.utils";

export default async function NewClientPage() {
  await authGuard({ realtorOnly: true });

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

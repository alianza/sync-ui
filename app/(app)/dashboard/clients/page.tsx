import React, { Suspense } from "react";
import AgentsTable from "@/app/(app)/dashboard/agents/agentsTable";
import Loader from "@/components/layout/Loader";
import { authGuard } from "@/lib/server.utils";

export const revalidate = 60;

export default async function ClientsPage() {
  await authGuard({ realtorOnly: true });

  return (
    <section className="container mx-auto flex w-full flex-col gap-12 px-4 py-12 md:px-6 md:py-24 lg:py-32">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Klanten</h2>
        <p className="max-w-4xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Bekijk en bewerk hier de klanten die je hebt toegevoegd. Je kunt ook nieuwe klanten toevoegen.
        </p>
      </div>

      <Suspense fallback={<Loader className="h-auto" />}>
        <AgentsTable />
      </Suspense>
    </section>
  );
}

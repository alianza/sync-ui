import React, { Suspense } from "react";
import Loader from "@/components/layout/Loader";
import ListingsTable from "@/app/(app)/dashboard/listings/listingsTable";
import { authGuard } from "@/lib/server.utils";

export default async function ListingsPage() {
  await authGuard();

  return (
    <section className="container mx-auto flex w-full flex-col gap-12 px-4 py-12 md:px-6 md:py-24 lg:py-32">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Woningen</h2>
        <p className="max-w-4xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Bekijk en bewerk hier de woningen die je hebt toegevoegd. Je kunt ook nieuwe woningen toevoegen.
        </p>
      </div>

      <Suspense fallback={<Loader className="h-auto" />}>
        <ListingsTable />
      </Suspense>
    </section>
  );
}

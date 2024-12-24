import { ListingForm } from "@/components/forms/ListingForm";
import React from "react";

export default function NewListingPage() {
  return (
    <section className="container mx-auto flex w-full flex-col gap-12 px-4 py-12 md:px-6 md:py-24 lg:py-32">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Nieuwe woning toevoegen</h2>
          <p className="max-w-4xl text-gray-500 md:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Voeg hier een nieuwe woning toe. Vul alle gegevens in en klik op opslaan om de woning toe te voegen.
          </p>
        </div>
      </div>
      <section className="w-full">
        <ListingForm />
      </section>
    </section>
  );
}

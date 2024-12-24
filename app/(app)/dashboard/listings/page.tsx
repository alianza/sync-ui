import React from "react";
import dbConnect from "@/lib/dbConnect";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Listing from "@/models/Listing";
import { ListingDoc } from "@/models/Listing.type";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/(app)/dashboard/listings/columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

export const revalidate = 60;

export default async function ListingsPage() {
  const session = await auth();

  if (!session) redirect("/login");

  await dbConnect();
  const listings = (await Listing.find({ userId: session.user?.id })).map((doc) =>
    doc.toObject({ flattenObjectIds: true }),
  ) as ListingDoc[];

  const newLink = (
    <Link href="/dashboard/listings/new">
      <Button>
        <PlusIcon className="mr-2" size={16} />
        Nieuwe woning toevoegen
      </Button>
    </Link>
  );

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto flex flex-col gap-12 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Woningen</h2>
            <p className="max-w-4xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Bekijk en bewerk hier de woningen die je hebt toegevoegd. Je kunt ook nieuwe woningen toevoegen.
            </p>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={listings}
          filterColumn="title"
          filterPlaceholder="Filter woningen"
          emptyComponent={
            <div className="flex flex-col justify-center gap-2">
              Geen resultaten gevonden.
              {newLink}
            </div>
          }
        />

        {newLink}
      </div>
    </section>
  );
}

import React from "react";
import dbConnect from "@/lib/dbConnect";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ListingForm } from "@/components/forms/ListingForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Listing from "@/models/Listing";
import { ListingDoc } from "@/models/Listing.type";
import { DataTable } from "@/app/(app)/dashboard/listings/data-table";
import { columns } from "@/app/(app)/dashboard/listings/columns";

export const revalidate = 60;

export default async function ListingsPage() {
  const session = await auth();

  if (!session) redirect("/login");

  await dbConnect();
  const listings = (await Listing.find({ userId: session.user?.id })).map((doc) =>
    doc.toObject({ flattenObjectIds: true }),
  ) as ListingDoc[];

  return (
    <>
      <section className="w-full bg-neutral-100 py-12 md:py-24 lg:py-32 dark:bg-neutral-900">
        <div className="container mx-auto flex flex-col gap-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Listings</h2>
              <p className="max-w-4xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                These are your listings. You can edit or delete them here.
              </p>
            </div>
          </div>
          <DataTable columns={columns} data={listings} filterColumn="title" filterPlaceholder="Filter woningen" />
        </div>
      </section>
      <section className="w-full bg-neutral-200 py-12 md:py-24 lg:py-32 dark:bg-neutral-800">
        <ListingForm />
      </section>
    </>
  );
}

function EmptyCard() {
  return (
    <Card className="col-span-full mx-auto max-w-screen-sm">
      <CardHeader>
        <CardTitle>No listings found</CardTitle>
        <CardDescription> There are no listings available at the moment.</CardDescription>
      </CardHeader>
    </Card>
  );
}

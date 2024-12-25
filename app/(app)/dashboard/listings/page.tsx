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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const revalidate = 60;

export default async function ListingsPage() {
  const session = await auth();

  if (!session) redirect("/login");

  await dbConnect();
  const listings = (await Listing.find({ userId: session.user?.id })).map((doc) =>
    doc.toObject({ flattenObjectIds: true }),
  ) as ListingDoc[];

  return (
    <section className="container mx-auto flex w-full flex-col gap-12 px-4 py-12 md:px-6 md:py-24 lg:py-32">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Woningen</h2>
        <p className="max-w-4xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Bekijk en bewerk hier de woningen die je hebt toegevoegd. Je kunt ook nieuwe woningen toevoegen.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <DataTable
          columns={columns}
          data={listings}
          filterColumn="title"
          filterPlaceholder="Filter woningen"
          emptyComponent={
            <div className="flex flex-col justify-center gap-2">
              Geen resultaten gevonden.
              <Link href="/dashboard/listings/new">
                <Button>
                  <PlusIcon /> Voeg een nieuwe woning toe
                </Button>
              </Link>
            </div>
          }
        />

        {listings.length > 0 ? (
          <Link href="/dashboard/listings/new">
            <Button>
              <PlusIcon />
              Voeg een nieuwe woning toe
            </Button>
          </Link>
        ) : (
          <Card className="mx-auto">
            <CardHeader>
              <CardTitle>Voeg je eerste woning toe!</CardTitle>
              <CardDescription>
                Je hebt nog geen woningen toegevoegd. Voeg een nieuwe woning toe om te beginnen.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/listings/new">
                <Button>
                  <PlusIcon /> Voeg een nieuwe woning toe
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}

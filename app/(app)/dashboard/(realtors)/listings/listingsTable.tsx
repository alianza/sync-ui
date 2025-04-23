import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import dbConnect from "@/lib/dbConnect";
import Listing from "@/models/Listing";
import { ListingObj } from "@/models/Listing.type";
import { authGuard, serializeDoc } from "@/lib/server.utils";

export default async function ListingsTable() {
  const session = await authGuard();

  await dbConnect();
  const listings = serializeDoc(
    await Listing.find({ userId: session.user?.id }, {}).sort({ createdAt: -1 }),
  ) as ListingObj[];

  const newListingButton = (
    <Link href="/dashboard/listings/new">
      <Button>
        <PlusIcon /> Voeg een nieuwe woning toe
      </Button>
    </Link>
  );

  return (
    <div className="flex flex-col gap-2">
      <DataTable
        columns={columns}
        data={listings}
        filterColumn="title"
        filterPlaceholder="Filter woningen"
        emptyComponent={
          <div className="flex flex-col justify-center gap-2">
            Geen resultaten gevonden.
            {newListingButton}
          </div>
        }
      />

      {listings.length > 0 ? (
        <div className="self-start">{newListingButton}</div>
      ) : (
        <Card className="mx-auto">
          <CardHeader>
            <CardTitle>Voeg je eerste woning toe!</CardTitle>
            <CardDescription>
              Je hebt nog geen woningen toegevoegd. Voeg een nieuwe woning toe om te beginnen.
            </CardDescription>
          </CardHeader>
          <CardContent>{newListingButton}</CardContent>
        </Card>
      )}
    </div>
  );
}

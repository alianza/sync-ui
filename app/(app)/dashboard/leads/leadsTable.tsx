import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import React from "react";
import dbConnect from "@/lib/dbConnect";
import Listing from "@/models/Listing";
import { ListingObj } from "@/models/Listing.type";
import { authGuard, serializeDoc } from "@/lib/server.utils";

export default async function LeadsTable() {
  const session = await authGuard();

  await dbConnect();
  const listings = serializeDoc(await Listing.find({})) as ListingObj[];

  return (
    <div className="flex flex-col gap-2">
      <DataTable
        columns={columns}
        data={listings}
        filterColumn="title"
        filterPlaceholder="Filter leads"
        emptyComponent={<div className="flex flex-col justify-center gap-2">Geen resultaten gevonden.</div>}
      />
    </div>
  );
}

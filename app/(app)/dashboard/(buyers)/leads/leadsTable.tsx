import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import React from "react";
import dbConnect from "@/lib/dbConnect";
import { ListingObj } from "@/models/Listing.type";
import { authGuard } from "@/lib/server.utils";
import User from "@/models/User";

export default async function LeadsTable() {
  const session = await authGuard();

  await dbConnect();
  const userLeads = await User.findById(session.user?.id)
    .populate<{ listings: { listingId: ListingObj; linkedAt: Date }[] }>("listings.listingId")
    .lean();

  if (!userLeads) {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-lg">Geen leads gevonden.</p>
      </div>
    );
  }

  const listings: (ListingObj & { linkedAt: Date })[] = userLeads.listings.map(({ listingId, linkedAt }) => ({
    ...(listingId as ListingObj),
    linkedAt,
  }));

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

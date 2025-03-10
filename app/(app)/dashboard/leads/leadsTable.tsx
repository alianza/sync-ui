import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import React from "react";
import dbConnect from "@/lib/dbConnect";
import { ListingObj } from "@/models/Listing.type";
import { authGuard, serializeDoc } from "@/lib/server.utils";
import User from "@/models/User";
import { UserObj } from "@/models/User.type";
import { MergeType } from "mongoose";

export default async function LeadsTable() {
  const session = await authGuard();

  await dbConnect();
  const userLeads = serializeDoc(await User.findById(session.user?.id).populate("listings.listingId")) as MergeType<
    UserObj,
    { listings: { listingId: ListingObj; linkedAt: Date }[] }
  >;

  const listings = userLeads.listings.map((listing) => ({
    ...listing.listingId,
    id: listing.listingId._id,
    linkedAt: listing.linkedAt,
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

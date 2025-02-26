import Listing from "@/models/Listing";
import { ListingObj } from "@/models/Listing.type";
import dbConnect from "@/lib/dbConnect";
import { isValidObjectId } from "mongoose";
import React from "react";
import { authGuard, serializeDoc } from "@/lib/server.utils";
import ListingDetails from "@/components/ListingDetails";

export default async function ListingPage(props: { params: Promise<{ id: string }> }) {
  const session = await authGuard({ buyerOnly: true });

  const { id } = await props.params;

  if (!isValidObjectId(id)) {
    return (
      <section className="container mx-auto w-full px-4 py-12 md:px-6 md:py-24 lg:py-32">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ongeldige woning ID</h2>
          <p className="max-w-4xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            De woning ID die je probeert te openen is ongeldig.
          </p>
        </div>
      </section>
    );
  }

  await dbConnect();
  const lead = serializeDoc(await Listing.findById(id).populate("userId")) as ListingObj;

  if (!lead) {
    return (
      <section className="container mx-auto w-full px-4 py-12 md:px-6 md:py-24 lg:py-32">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Woning niet gevonden</h2>
          <p className="max-w-4xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            De woning die je probeert te openen bestaat niet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto w-full px-4 py-12 md:px-6 md:py-24 lg:py-32">
      <ListingDetails listing={lead} />
    </section>
  );
}

import Listing from "@/models/Listing";
import { ListingObj } from "@/models/Listing.type";
import dbConnect from "@/lib/dbConnect";
import { isValidObjectId } from "mongoose";
import React from "react";
import { authGuard, serializeDoc } from "@/lib/server.utils";
import ListingDetails from "@/components/ListingDetails";
import { FileQuestion, FileWarning } from "lucide-react";

export default async function ListingPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const { id } = params;

  const session = await authGuard({ realtorOnly: true });

  if (!isValidObjectId(id)) {
    return (
      <ErrorSection
        icon={<FileWarning size={128} />}
        title="Ongeldige woning ID"
        message="De woning ID die je probeert te openen is ongeldig."
      />
    );
  }

  await dbConnect();
  const listing = serializeDoc(
    await Listing.findOne({ _id: id, userId: session.user.id }).populate("userId"),
  ) as ListingObj;

  if (!listing) {
    return (
      <ErrorSection
        icon={<FileQuestion size={128} />}
        title="Woning niet gevonden"
        message="De woning die je probeert te openen bestaat niet of je hebt geen toegang."
      />
    );
  }

  const isOwner = session.user.id === listing.userId._id;

  return (
    <section className="container mx-auto w-full px-4 py-12 md:px-6 md:py-24 lg:py-32">
      <ListingDetails listing={listing} isOwner={isOwner} />
    </section>
  );
}

function ErrorSection({ icon, title, message }: { icon: React.ReactNode; title: string; message: string }) {
  return (
    <section className="container mx-auto w-full px-4 py-12 md:px-6 md:py-24 lg:py-32">
      <div className="flex flex-col items-center justify-center gap-8 text-center">
        {icon}
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{title}</h2>
          <p className="max-w-4xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            {message}
          </p>
        </div>
      </div>
    </section>
  );
}

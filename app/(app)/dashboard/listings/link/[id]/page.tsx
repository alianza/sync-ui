import React from "react";
import { LinkListing } from "@/components/LinkListing";
import Listing from "@/models/Listing";
import { ListingDoc, ListingObj } from "@/models/Listing.type";
import { isValidObjectId, MergeType } from "mongoose";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authGuard, serializeDoc } from "@/lib/server.utils";
import User from "@/models/User";
import { UserObj } from "@/models/User.type";
import dbConnect from "@/lib/dbConnect";

export default async function LinkListingPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const Layout = ({ title, description }: { title: string; description: string }) => (
    <section className="container mx-auto flex h-full w-full items-center justify-center px-4 py-12 md:px-6 md:py-24 lg:py-32">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">{title}</CardTitle>
          <CardDescription className="flex flex-col gap-4 text-center">{description}</CardDescription>
        </CardHeader>
      </Card>
    </section>
  );

  if (!isValidObjectId(id)) {
    return <Layout title="Ongeldige id" description="De opgegeven woning id is niet geldig" />;
  }

  const session = await authGuard();

  await dbConnect();

  const listing = serializeDoc(await Listing.findById<ListingDoc>(id)) as ListingObj;

  if (!listing) {
    return <Layout title="Woning niet gevonden" description="De opgegeven woning kon niet worden gevonden" />;
  }

  const dbUser = serializeDoc(await User.findById(session.user?.id).populate("clients")) as MergeType<
    UserObj,
    { clients: UserObj[] }
  >;

  return (
    <section className="container mx-auto flex w-full flex-col gap-12 px-4 py-12 md:px-6 md:py-24 lg:py-32">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Koppel woning</h2>
        <p className="max-w-4xl text-gray-500 md:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Koppel deze woning aan één of meerdere van je klanten om deze toegankelijk te maken voor je klanten.
        </p>
      </div>
      <section className="w-full">
        <LinkListing listing={listing} clients={dbUser.clients} />
      </section>
    </section>
  );
}

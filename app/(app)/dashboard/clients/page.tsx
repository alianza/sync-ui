import React from "react";
import dbConnect from "@/lib/dbConnect";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ListingCard } from "@/components/ListingCard";
import { ListingForm } from "@/components/forms/ListingForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Listing from "@/models/Listing";
import { ListingDoc } from "@/models/Listing.type";
import User from "@/models/User";
import { UserDoc } from "@/models/User.type";

export const revalidate = 60;

export default async function ClientsPage() {
  const session = await auth();

  if (!session) redirect("/login");

  await dbConnect();
  const dbUser = await User.findById<UserDoc>(session.user?.id).populate("clients");

  if (!dbUser) redirect("/login");

  console.log(`dbUser`, dbUser);

  return (
    <>
      <section className="w-full bg-neutral-100 py-12 md:py-24 lg:py-32 dark:bg-neutral-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Listings</h2>
              <p className="max-w-4xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                These are your clients. You can add, edit, and delete them as you see fit.
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
            {/*{dbUser.clients.length > 0 ? (*/}
            {/*  dbUser.clients.map((client) => <ListingCard key={client._id} listing={client as ListingDoc} />)*/}
            {/*) : (*/}
            {/*  <EmptyCard />*/}
            {/*)}*/}
          </div>
        </div>
      </section>
    </>
  );
}

function EmptyCard() {
  return (
    <Card className="col-span-full mx-auto max-w-screen-sm">
      <CardHeader>
        <CardTitle>No clients found</CardTitle>
        <CardDescription>
          You have no clients on your file yet. You can create an invite for a new client here!
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

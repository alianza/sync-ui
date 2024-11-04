import React from "react";
import dbConnect from "@/lib/dbConnect";
import Listing from "@/models/Listing";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { ListingCard } from "@/components/ListingCard";
import { ListingForm } from "@/components/forms/ListingForm";
import { Footer } from "@/components/layout/Footer";

export default async function ListingsPage() {
  await dbConnect();
  const listings = (await Listing.find({})).map((doc) => doc.toObject({ flattenObjectIds: true }));

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full bg-neutral-100 py-12 md:py-24 lg:py-32 dark:bg-neutral-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Listings</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Check out the latest listings from our users.
                </p>
              </div>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
              {listings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
              {!listings.length && <EmptyCard />}
            </div>
          </div>
        </section>
        <section className="w-full bg-neutral-200 py-12 md:py-24 lg:py-32 dark:bg-neutral-900">
          <ListingForm />
        </section>
      </main>
      <Footer />
    </div>
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

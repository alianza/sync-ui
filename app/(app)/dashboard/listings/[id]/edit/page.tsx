import { ListingCard } from "@/components/ListingCard";
import { ListingDoc } from "@/models/Listing.type";
import Listing from "@/models/Listing";
import dbConnect from "@/lib/dbConnect";
import { ListingForm } from "@/components/forms/ListingForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true; // or false, to 404 on unknown paths

export async function generateStaticParams() {
  await dbConnect();
  const listings = (await Listing.find({})).map((doc) => doc.toObject({ flattenObjectIds: true }));

  return listings.map((listing) => ({ id: listing._id }));
}

export default async function EditListingPage(props: { params: Promise<{ id: string }> }) {
  const session = await auth();

  if (!session) redirect("/login");

  const params = await props.params;
  await dbConnect();
  const listing = (await Listing.findById(params.id))?.toObject({ flattenObjectIds: true }) as ListingDoc;

  return (
    <>
      <section className="w-full bg-neutral-100 py-12 md:py-24 lg:py-32 dark:bg-neutral-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{listing.title}</h2>
              <p className="max-w-4xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                {listing.description}
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12">
            <ListingCard key={listing._id} listing={listing} redirectAfterDelete="/dashboard/listings" />
          </div>
        </div>
      </section>
      <section className="w-full bg-neutral-200 py-12 md:py-24 lg:py-32 dark:bg-neutral-900">
        <ListingForm listing={listing} />
      </section>
    </>
  );
}

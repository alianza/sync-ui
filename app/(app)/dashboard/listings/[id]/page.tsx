import Listing from "@/models/Listing";
import { ListingDoc } from "@/models/Listing.type";
import dbConnect from "@/lib/dbConnect";
import { ListingCard } from "@/components/ListingCard";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { isValidObjectId } from "mongoose";

// // Next.js will invalidate the cache when a
// // request comes in, at most once every 60 seconds.
// export const revalidate = 60;
//
// // We'll prerender only the params from `generateStaticParams` at build time.
// // If a request comes in for a path that hasn't been generated,
// // Next.js will server-render the page on-demand.
// export const dynamicParams = true; // or false, to 404 on unknown paths
//
// export async function generateStaticParams() {
//   await dbConnect();
//   const listings = (await Listing.find({})).map((doc) => doc?.toObject({ flattenObjectIds: true }));
//
//   return listings.map((listing) => ({ id: listing._id }));
// }

export default async function ListingPage(props: { params: Promise<{ id: string }> }) {
  const session = await auth();

  if (!session) redirect("/login");

  const { id } = await props.params;

  if (!isValidObjectId(id)) {
    return (
      <section className="container mx-auto w-full px-4 py-12 md:px-6 md:py-24 lg:py-32">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Invalid listing ID</h2>
          <p className="max-w-4xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            The listing ID you are trying to access is invalid.
          </p>
        </div>
      </section>
    );
  }

  await dbConnect();
  const listing = (await Listing.findById(id))?.toObject({ flattenObjectIds: true }) as ListingDoc;

  if (!listing) {
    return (
      <section className="container mx-auto w-full px-4 py-12 md:px-6 md:py-24 lg:py-32">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Listing not found</h2>
          <p className="max-w-4xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            The listing you are trying to access does not exist.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto w-full px-4 py-12 md:px-6 md:py-24 lg:py-32">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{listing.title}</h2>
        <p className="max-w-4xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          {listing.description}
        </p>
      </div>
      <div className="mx-auto mt-12">
        <ListingCard key={listing._id} listing={listing} redirectAfterDelete="/dashboard/listings" />
      </div>
    </section>
  );
}

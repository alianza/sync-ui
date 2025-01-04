import { ListingDoc } from "@/models/Listing.type";
import Listing from "@/models/Listing";
import dbConnect from "@/lib/dbConnect";
import { ListingForm } from "@/components/forms/ListingForm";
import { authGuard } from "@/lib/server.utils";

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
// export const revalidate = 60;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
// export const dynamicParams = true; // or false, to 404 on unknown paths

// export async function generateStaticParams() {
//   await dbConnect();
//   const listings = (await Listing.find({})).map((doc) => doc.toObject({ flattenObjectIds: true }));
//
//   return listings.map((listing) => ({ id: listing._id }));
// }

export default async function EditListingPage(props: { params: Promise<{ id: string }> }) {
  const session = await authGuard();

  const { id } = await props.params;
  await dbConnect();
  const listing = (await Listing.findOne({ _id: id, userId: session.user.id }))?.toObject({
    flattenObjectIds: true,
  }) as ListingDoc;

  return (
    <>
      <section className="container mx-auto flex w-full flex-col gap-8 px-4 py-12 md:px-6 md:py-24 lg:py-32">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{listing.title}</h2>
          <p className="max-w-4xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            {listing.description}
          </p>
        </div>
      </section>
      <section className="w-full bg-neutral-200 dark:bg-neutral-900">
        <ListingForm listing={listing} />
      </section>
    </>
  );
}

import Listing from "@/models/Listing";
import dbConnect from "@/lib/dbConnect";
import { Header } from "@/components/layout/Header";
import { ListingCard } from "@/components/ListingCard";
import { ListingType } from "@/types/listing";
import { Footer } from "@/components/layout/Footer";

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

export default async function ListingPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  await dbConnect();
  const listing = (await Listing.findById(params.id)).toObject({ flattenObjectIds: true }) as ListingType;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full bg-neutral-100 py-12 md:py-24 lg:py-32 dark:bg-neutral-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{listing.title}</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  {listing.description}
                </p>
              </div>
            </div>
            <div className="mx-auto mt-12">
              <ListingCard key={listing._id} listing={listing} redirectAfterDelete="/listings" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

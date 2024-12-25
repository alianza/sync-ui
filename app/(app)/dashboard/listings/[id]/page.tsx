import Listing from "@/models/Listing";
import { ListingDoc } from "@/models/Listing.type";
import dbConnect from "@/lib/dbConnect";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { isValidObjectId } from "mongoose";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BathIcon,
  BedIcon,
  CalendarIcon,
  EuroIcon,
  HomeIcon,
  KeyIcon,
  MapPin,
  MaximizeIcon,
  SquareM,
  ThermometerSunIcon,
  UserIcon,
} from "lucide-react";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
  const listing = (await Listing.findOne({ _id: id, userId: session.user.id }))?.toObject({
    flattenObjectIds: true,
  }) as ListingDoc;

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
      <div className="mx-auto flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{listing.title}</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
                <CardDescription>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    {listing.streetName} {listing.streetNumber}, {listing.postalCode} {listing.city}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <HomeIcon className="mr-2 h-4 w-4" />
                    <span>{listing.type}</span>
                  </div>
                  <div className="flex items-center">
                    <EuroIcon className="mr-2 h-4 w-4" />
                    <span>{listing.askingPrice.toLocaleString("nl-NL", { style: "currency", currency: "EUR" })}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>Built in {listing.yearBuilt}</span>
                  </div>
                  <div className="flex items-center">
                    <SquareM className="mr-2 h-4 w-4" />
                    <span>{listing.measurements.squareMetersTotal} m²</span>
                  </div>
                </div>
                <Separator className="my-4" />
                <p>{listing.description}</p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Measurements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>Living area: {listing.measurements.squareMetersLiving} m²</div>
                  <div>Other area: {listing.measurements.squareMetersOther} m²</div>
                  <div>Outdoor area: {listing.measurements.squareMetersOutdoor} m²</div>
                  <div>Property area: {listing.measurements.squareMetersProperty} m²</div>
                  <div>Volume: {listing.measurements.cubicMetersVolume} m³</div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Rooms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <MaximizeIcon className="mr-2 h-4 w-4" />
                    <span>{listing.rooms.roomCount} rooms</span>
                  </div>
                  <div className="flex items-center">
                    <BedIcon className="mr-2 h-4 w-4" />
                    <span>{listing.rooms.bedRoomCount} bedrooms</span>
                  </div>
                  <div className="flex items-center">
                    <BathIcon className="mr-2 h-4 w-4" />
                    <span>{listing.rooms.bathroomCount} bathrooms</span>
                  </div>
                  <div>{listing.rooms.toiletCount} toilets</div>
                  <div>{listing.stories} stories</div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {listing.features.map((feature, index) => (
                    <Badge key={index} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Energy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <ThermometerSunIcon className="mr-2 h-4 w-4" />
                    <span>Energy Label: {listing.energy.energyLabel}</span>
                  </div>
                  <div>
                    <strong>Insulation:</strong>
                    <ul className="list-inside list-disc">
                      {listing.energy.insulation.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong>Heating:</strong> {listing.energy.heating}
                  </div>
                  <div>
                    <strong>Water Heating:</strong> {listing.energy.waterHeating}
                  </div>
                  <div>
                    <strong>CV:</strong> {listing.energy.CV}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Ownership</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <KeyIcon className="mr-2 h-4 w-4" />
                  <span>{listing.ownership}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>{listing.userId}</span>
                  </div>
                  <div>{listing.userId.email}</div>
                  <Button className="mt-4 w-full">Contact Agent</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

import { ENERGY_LABELS, FEATURES, INSULATION, LISTING_TYPES, ListingObj } from "@/models/Listing.type";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BathIcon,
  BedIcon,
  CalendarIcon,
  EuroIcon,
  HomeIcon,
  KeyIcon,
  MailIcon,
  MapPin,
  MaximizeIcon,
  PencilIcon,
  SquareM,
  ThermometerSunIcon,
  Toilet,
  TrashIcon,
  UserIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { del, list, put } from "@vercel/blob";
import { Input } from "@/components/forms/input/Input";
import Image from "next/image";

export default async function ListingDetails({ listing, isOwner = false }: { listing: ListingObj; isOwner?: boolean }) {
  async function uploadImage(formData: FormData) {
    "use server";
    const images = await list({ prefix: `listingMedia/images/${listing._id}/` });
    if (images.blobs.length >= 2) {
      // throw new Error("Maximum of 10 images allowed per listing");
      // return errorResponse({ message: "Maximum of 10 images allowed per listing" });
    }
    const imageFile = formData.get("image") as File;
    const blob = await put(`listingMedia/images/${listing._id}/${imageFile.name}`, imageFile, { access: "public" });
    revalidatePath(`/dashboard/listings/${listing._id}`);
    console.log(`blob`, blob);
    // return blob;
    // return successResponse({ message: "upload success" });
  } // todo: Create client forms for uploading and deleting images and use useActionState for the state, formAction and pending state See: https://nextjs.org/docs/app/building-your-application/routing/error-handling & https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
  // todo: add confirm dialog to delete image
  async function deleteImage(formData: FormData) {
    "use server";
    const url = formData.get("url") as string;
    console.log(`url`, url);
    const result = await del(url);
    console.log(`result`, result);
    revalidatePath(`/dashboard/listings/${listing._id}`);
    // return successResponse({ message: "delete success" });
  }

  const images = await list({ prefix: `listingMedia/images/${listing._id}/` });

  console.log(`images`, images);

  const fullAddress = `${listing.streetName} ${listing.streetNumber}, ${listing.postalCode}, ${listing.city}`;

  return (
    <div className="mx-auto flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-3xl font-bold">{listing.title}</h1>
        {isOwner && (
          <Link href={`/dashboard/listings/${listing._id}/edit`} title="Bewerk woning">
            <Button>
              <span>Bewerk woning</span>
              <PencilIcon className="scale-hover-xl size-4" />
            </Button>
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="flex flex-col gap-6 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Woning Details</CardTitle>
              <CardDescription>
                <IconField
                  Icon={MapPin}
                  value={
                    <a
                      href={`https://www.google.nl/maps?q=${fullAddress}`}
                      target="_blank"
                      rel="noreferrer"
                      className="underline-hover"
                    >
                      {fullAddress}
                    </a>
                  }
                />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <IconField Icon={HomeIcon} value={LISTING_TYPES[listing.type as keyof typeof LISTING_TYPES]} />
                <IconField
                  Icon={EuroIcon}
                  value={listing.askingPrice.toLocaleString("nl-NL", { style: "currency", currency: "EUR" })}
                />
                <IconField Icon={CalendarIcon} value={`Bouwjaar ${listing.yearBuilt}`} />
                <IconField Icon={SquareM} value={`${listing.measurements.squareMetersTotal} m²`} />
              </div>
              {listing.description && (
                <>
                  <Separator className="my-4" />
                  <pre className="font-sans text-wrap">{listing.description}</pre>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Afmetingen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>Woonoppervlakte: {listing.measurements.squareMetersLiving} m²</div>
                <div>Overige ruimte: {listing.measurements.squareMetersOther} m²</div>
                <div>Buitenruimte: {listing.measurements.squareMetersOutdoor} m²</div>
                <div>Perceelgrootte: {listing.measurements.squareMetersProperty} m²</div>
                <div>Volume: {listing.measurements.cubicMetersVolume} m³</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kamers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <IconField Icon={MaximizeIcon} value={`${listing.rooms.roomCount} kamers`} />
                <IconField Icon={BedIcon} value={`${listing.rooms.bedRoomCount} slaapkamers`} />
                <IconField Icon={BathIcon} value={`${listing.rooms.bathroomCount} badkamers`} />
                <IconField Icon={Toilet} value={`${listing.rooms.toiletCount} toiletten`} />
                <div>{listing.stories} verdiepingen</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kenmerken</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {listing.features.map((feature, index) => (
                  <Badge key={index} variant="secondary">
                    {FEATURES[feature as keyof typeof FEATURES]}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Energie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <IconField
                  Icon={ThermometerSunIcon}
                  value={`Energielabel: ${ENERGY_LABELS[listing.energy.energyLabel as keyof typeof ENERGY_LABELS]}`}
                />
                <div>
                  <strong>Isolatie:</strong>
                  <ul className="list-inside list-disc">
                    {listing.energy.insulation.map((item, index) => (
                      <li key={index}>{INSULATION[item as keyof typeof INSULATION]}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong>Verwarming:</strong> {listing.energy.heating}
                </div>
                <div>
                  <strong>Waterverwarming:</strong> {listing.energy.waterHeating}
                </div>
                <div>
                  <strong>CV:</strong> {listing.energy.CV}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Eigendom</CardTitle>
            </CardHeader>
            <CardContent>
              <IconField Icon={KeyIcon} value={listing.ownership} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div>
                <IconField Icon={UserIcon} value={`${listing.userId.firstName} ${listing.userId.lastName}`} />
                <IconField
                  Icon={MailIcon}
                  value={
                    <a className="underline-hover break-all" href={`mailto:${listing.userId.email}`}>
                      {listing.userId.email}
                    </a>
                  }
                />
              </div>
              <a className="underline-hover" href={`mailto:${listing.userId.email}`}>
                <Button className="h-auto w-full text-wrap">Neem contact op met makelaar</Button>
              </a>
            </CardContent>
          </Card>

          {/*card to display images if any*/}
          <Card>
            <CardHeader>
              <CardTitle>Afbeeldingen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {images.blobs.map((image, index) => (
                  <div className="relative" key={image.pathname}>
                    <form action={deleteImage}>
                      <input type="hidden" name="url" value={image.url} />
                      <Button variant="destructive" className="absolute top-2 right-2" title="Verwijder afbeelding">
                        <TrashIcon />
                      </Button>
                    </form>
                    <Image
                      src={image.url}
                      width={200}
                      height={200}
                      alt={`${listing.title} image ${index + 1}`}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upload bestanden</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <form action={uploadImage} className="flex flex-col gap-2">
                <Input label="Afbeelding" type="file" id="image" name="image" required />
                <Button>Upload</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

const IconField = ({ Icon, value }: { Icon: React.ComponentType<{ className?: string }>; value: React.ReactNode }) => (
  <div className="flex items-center gap-2">
    <Icon className="size-4" />
    <span>{value}</span>
  </div>
);

const ImageDeleteButton = ({ pathname, listingId }: { pathname: string; listingId: string }) => {
  "use client";

  async function deleteImage(pathname: string) {
    "use server";
    await del(pathname);
    revalidatePath(`/dashboard/listings/${listingId}`);
    // return successResponse({ message: "delete success" });
  }

  return (
    <Button
      onClick={() => deleteImage(pathname)}
      variant="destructive"
      className="absolute top-2 right-2"
      title="Verwijder afbeelding"
    >
      <TrashIcon />
    </Button>
  );
};

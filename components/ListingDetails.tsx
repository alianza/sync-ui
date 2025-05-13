import {
  ENERGY_LABELS,
  FEATURES,
  INSULATION,
  LISTING_TYPES,
  ListingObj,
  STATUS,
  STATUS_COLOR,
  STATUS_TEXT,
} from "@/models/Listing.type";
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
  UserIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React, { Suspense } from "react";
import Link from "next/link";
import { list } from "@vercel/blob";
import FileUploadForm from "@/components/ListingFileUploadForm";
import ListingImages from "./ListingImages";
import { ServerResponse } from "@/lib/types";
import Loader from "@/components/layout/Loader";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { Tooltip } from "@/components/ui/tooltip";
import ListingDocuments from "@/components/ListingDocuments";
import { capitalize } from "@/lib/common.utils";
import { deleteListingFile, uploadListingFile } from "@/lib/actions";

export default async function ListingDetails({ listing, isOwner = false }: { listing: ListingObj; isOwner?: boolean }) {
  async function uploadFile(prevState: unknown, formData: FormData) {
    "use server";
    return await uploadListingFile(formData, listing._id);
  }

  async function deleteFile(formData: FormData) {
    "use server";
    return await deleteListingFile(formData, listing._id);
  }

  const fullAddress = `${listing.streetName} ${listing.streetNumber}, ${listing.postalCode}, ${listing.city}`;

  const statusLabel = STATUS[listing.status] || capitalize(listing.status);
  const color = STATUS_COLOR[listing.status] || "bg-gray-500";
  const statusExplanation = STATUS_TEXT[listing.status] || "";

  return (
    <div className="mx-auto flex flex-col gap-2">
      <div className="flex justify-between gap-2 max-sm:flex-col">
        <div className="flex flex-row gap-2">
          <h1 className="text-3xl font-bold">{listing.title}</h1>
          <div className="flex flex-row items-center gap-2">
            <Tooltip
              tooltipContent={
                <div className="flex flex-col gap-1">
                  <b>{statusLabel}</b>
                  <Separator className="bg-neutral-300" />
                  <p>{statusExplanation}</p>
                </div>
              }
              asChild
            >
              <div className={`size-4 rounded-full p-1 ${color} bg-clip-content`} />
            </Tooltip>
          </div>
        </div>
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

          <Card>
            <CardHeader>
              <CardTitle>Afbeeldingen</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Loader className="h-auto" />}>
                <Images listing={listing} deleteAction={isOwner ? deleteFile : null} />
              </Suspense>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Documenten</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Loader className="h-auto" />}>
                <Documents listing={listing} deleteAction={isOwner ? deleteFile : null} />
              </Suspense>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row gap-1">
              <CardTitle>Upload bestanden</CardTitle>
              <Tooltip
                tooltipContent={
                  <div className="flex flex-col gap-1">
                    <p>Upload hier bestanden die je aan de woning wilt koppelen.</p>
                    <Separator className="bg-neutral-300" />
                    <p>Afbeeldingen, documenten, etc.</p>
                  </div>
                }
                asChild
              >
                <QuestionMarkCircledIcon className="self-start" />
              </Tooltip>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <FileUploadForm fileUploadAction={uploadFile} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

async function Images({
  listing,
  deleteAction,
}: {
  listing: ListingObj;
  deleteAction: ((formData: FormData) => Promise<ServerResponse<unknown>>) | null;
}) {
  "use cache";
  const images = (await list({ prefix: `listingMedia/${listing._id}/images/` })) || { blobs: [] };
  images.blobs.sort((a, b) => a.uploadedAt.getTime() - b.uploadedAt.getTime());
  return <ListingImages blobs={images.blobs} deleteAction={deleteAction} listingTitle={listing.title} />;
}

async function Documents({
  listing,
  deleteAction,
}: {
  listing: ListingObj;
  deleteAction: ((formData: FormData) => Promise<ServerResponse<unknown>>) | null;
}) {
  "use cache";
  const documents = (await list({ prefix: `listingMedia/${listing._id}/documents/` })) || { blobs: [] };
  documents.blobs.sort((a, b) => a.uploadedAt.getTime() - b.uploadedAt.getTime());
  return <ListingDocuments blobs={documents.blobs} deleteAction={deleteAction} listingTitle={listing.title} />;
}

const IconField = ({ Icon, value }: { Icon: React.ComponentType<{ className?: string }>; value: React.ReactNode }) => (
  <div className="flex items-center gap-2">
    <Icon className="size-4" />
    <span>{value}</span>
  </div>
);

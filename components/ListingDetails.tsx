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
  UserIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

export default function ListingDetails({ listing, isOwner = false }: { listing: ListingObj; isOwner?: boolean }) {
  const fullAddress = `${listing.streetName} ${listing.streetNumber}, ${listing.postalCode} ${listing.city}`;

  return (
    <div className="mx-auto flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-3xl font-bold">{listing.title}</h1>
        {isOwner && (
          <Link href={`/dashboard/listings/${listing._id}/edit`} title="Bewerk woning">
            <PencilIcon className="scale-hover-xl size-6 text-neutral-500 dark:text-neutral-400" />
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
                  <p>{listing.description}</p>
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

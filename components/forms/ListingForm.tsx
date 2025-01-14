"use client";

import React, { useActionState, useEffect } from "react";
import { createListing, updateListing } from "@/app/(app)/dashboard/listings/actions";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SubmitButton } from "@/components/SubmitButton";
import { ENERGY_LABELS, FEATURES, INSULATION, LISTING_TYPES, ListingDoc } from "@/models/Listing.type";
import { initialActionState, ResponseStatus } from "@/lib/types";
import { handleAction } from "@/lib/client.utils";
import { FieldSet } from "@/components/forms/input/FieldSet";
import { Input } from "@/components/forms/input/Input";
import { cn } from "@/lib/utils";
import FormSelect from "@/components/forms/input/FormSelect";
import { MultiSelect } from "@/components/ui/multi-select";

interface Props {
  listing?: ListingDoc;
}

export function ListingForm({ listing }: Props) {
  const editMode = Boolean(listing);

  const [state, action] = useActionState(editMode ? updateListing : createListing, initialActionState);
  const [resetKey, setResetKey] = React.useState(new Date().getTime());
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => handleAction(e, action);

  const formRef = React.useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === ResponseStatus.success) {
      formRef.current?.reset();
      setResetKey(new Date().getTime());
    }
  }, [state.status]);

  return (
    <Card className="mx-auto max-w-screen-sm">
      <CardHeader>
        <CardTitle>
          {editMode ? `Bewerk "${listing?.title || state?.data?.title}"` : "Maak een nieuwe woning aan"}
        </CardTitle>
        <CardDescription>
          {editMode ? "Bewerk de details van de woning" : "Vul de details van de nieuwe woning in"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} ref={formRef}>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Input
              id="title"
              label="Titel"
              placeholder="Voer de titel in"
              defaultValue={editMode ? listing?.title || state?.data?.title : undefined}
              required
            />

            <FieldSet label="Adres">
              <Input
                id="streetName"
                label="Straatnaam"
                placeholder="Voer de straatnaam in"
                defaultValue={editMode ? listing?.streetName || state?.data?.streetName : undefined}
                pattern="[a-zA-Z0-9 ]+" // Only allow letters, numbers, and spaces
                required
              />

              <Input
                id="streetNumber"
                label="Huisnummer"
                placeholder="Voer het huisnummer in"
                defaultValue={editMode ? listing?.streetNumber || state?.data?.streetNumber : undefined}
                required
              />

              <Input
                id="postalCode"
                label="Postcode"
                placeholder="Voer de postcode in"
                defaultValue={editMode ? listing?.postalCode || state?.data?.postalCode : undefined}
                pattern="[1-9][0-9]{3}(?!SA|SD|SS)[A-Z]{2}" // Dutch postal code format
                required
              />

              <Input
                id="city"
                label="Stad"
                placeholder="Voer de stad in"
                defaultValue={editMode ? listing?.city || state?.data?.city : undefined}
                required
              />

              <Input
                id="district"
                label="Stadsdeel"
                placeholder="Voer de Stadsdeel in"
                defaultValue={editMode ? listing?.district || state?.data?.district : undefined}
                required
              />
            </FieldSet>

            <Input
              id="description"
              label="Beschrijving"
              placeholder="Voer de beschrijving in"
              type="multiline"
              defaultValue={editMode ? listing?.description || state?.data?.description : undefined}
            />

            <FieldSet label="Details">
              <Input
                id="askingPrice"
                label="Vraagprijs"
                placeholder="Voer de vraagprijs in"
                defaultValue={editMode ? listing?.askingPrice || state?.data?.askingPrice : undefined}
                required
                type="number"
                min={0}
                suffix="€"
              />

              <Input
                id="yearBuilt"
                label="Bouwjaar"
                placeholder="Voer het bouwjaar in"
                defaultValue={editMode ? listing?.yearBuilt || state?.data?.yearBuilt : undefined}
                required
                type="number"
                min={1800}
                max={new Date().getFullYear()} // Allow future years??
              />
            </FieldSet>

            <FormSelect
              id="type"
              label="Type"
              placeholder="Selecteer het type"
              key={resetKey + 1}
              items={Object.entries(LISTING_TYPES).map(([value, key]) => ({ key, value }))}
              defaultValue={editMode ? listing?.type || state?.data?.type : undefined}
              required
            />

            <Input
              id="roofType"
              label="Soort dak"
              placeholder="Voer het soort dak in"
              defaultValue={editMode ? listing?.roofType || state?.data?.roofType : undefined}
              required
            />

            <FieldSet label="Afmetingen">
              <Input
                id="measurements.squareMetersTotal"
                label="Vierkante meters"
                placeholder="Voer het oppervlakte in"
                defaultValue={
                  editMode
                    ? listing?.measurements.squareMetersTotal || state?.data?.measurements.squareMetersTotal
                    : undefined
                }
                required
                type="number"
                min={0}
                suffix="m²"
              />

              <Input
                id="measurements.squareMetersLiving"
                label="Vierkante meters woonruimte"
                placeholder="Voer het oppervlakte in"
                defaultValue={
                  editMode
                    ? listing?.measurements.squareMetersLiving || state?.data?.measurements.squareMetersLiving
                    : undefined
                }
                required
                type="number"
                min={0}
                suffix="m²"
              />

              <Input
                id="measurements.squareMetersOther"
                label="Vierkante meters andere ruimte"
                placeholder="Voer het oppervlakte in"
                defaultValue={
                  editMode
                    ? listing?.measurements.squareMetersOther || state?.data?.measurements.squareMetersOther
                    : undefined
                }
                required
                type="number"
                min={0}
                suffix="m²"
              />

              <Input
                id="measurements.squareMetersOutdoor"
                label="Vierkante meters buitenruimte"
                placeholder="Voer het oppervlakte in"
                defaultValue={
                  editMode
                    ? listing?.measurements.squareMetersOutdoor || state?.data?.measurements.squareMetersOutdoor
                    : undefined
                }
                required
                type="number"
                min={0}
                suffix="m²"
              />

              <Input
                id="measurements.squareMetersProperty"
                label="Vierkante meters eigendom"
                placeholder="Voer het oppervlakte in"
                defaultValue={
                  editMode
                    ? listing?.measurements.squareMetersProperty || state?.data?.measurements.squareMetersProperty
                    : undefined
                }
                required
                type="number"
                min={0}
                suffix="m²"
              />

              <Input
                id="measurements.cubicMetersVolume"
                label="Kubieke meters volume"
                placeholder="Voer het volume in"
                defaultValue={
                  editMode
                    ? listing?.measurements.cubicMetersVolume || state?.data?.measurements.cubicMetersVolume
                    : undefined
                }
                required
                type="number"
                min={0}
                suffix="m³"
              />
            </FieldSet>

            <FieldSet label="Kamers">
              <Input
                id="rooms.roomCount"
                label="Aantal kamers"
                placeholder="Voer het aantal kamers in"
                defaultValue={editMode ? listing?.rooms.roomCount || state?.data?.rooms.roomCount : undefined}
                required
                type="number"
                min={0}
              />

              <Input
                id="rooms.bedRoomCount"
                label="Aantal slaapkamers"
                placeholder="Voer het aantal slaapkamers in"
                defaultValue={editMode ? listing?.rooms.bedRoomCount || state?.data?.rooms.bedRoomCount : undefined}
                required
                type="number"
                min={0}
              />
              <Input
                id="rooms.bathroomCount"
                label="Aantal badkamers"
                placeholder="Voer het aantal badkamers in"
                defaultValue={editMode ? listing?.rooms.bathroomCount || state?.data?.rooms.bathroomCount : undefined}
                required
                type="number"
                min={0}
              />
              <Input
                id="rooms.toiletCount"
                label="Aantal toiletten"
                placeholder="Voer het aantal toiletten in"
                defaultValue={editMode ? listing?.rooms.toiletCount || state?.data?.rooms.toiletCount : undefined}
                required
                type="number"
                min={0}
              />
            </FieldSet>

            <Input
              id="stories"
              label="Aantal verdiepingen"
              placeholder="Voer het aantal verdiepingen in"
              defaultValue={editMode ? listing?.stories || state?.data?.stories : undefined}
              required
            />

            <MultiSelect
              key={resetKey + 2}
              id="features"
              label="Kenmerken"
              placeholder="Selecteer kenmerken..."
              items={Object.entries(FEATURES).map(([value, key]) => ({ key, value }))}
              defaultValue={
                editMode
                  ? (listing?.features || state?.data?.features || []).map((feature: keyof typeof FEATURES) => ({
                      value: feature,
                      key: FEATURES[feature],
                    }))
                  : undefined
              }
            />

            <FieldSet label="Energie">
              <FormSelect
                key={resetKey + 3}
                id="energy.energyLabel"
                label="Energielabel"
                placeholder="Selecteer het energielabel"
                items={Object.entries(ENERGY_LABELS).map(([value, key]) => ({ key, value }))}
                defaultValue={editMode ? listing?.energy.energyLabel || state?.data?.energy.energyLabel : undefined}
                required
              />

              <MultiSelect
                key={resetKey + 4}
                id="energy.insulation"
                label="Isolatie"
                placeholder="Selecteer isolatie..."
                items={Object.entries(INSULATION).map(([value, key]) => ({ key, value }))}
                defaultValue={
                  editMode
                    ? (listing?.energy.insulation || state?.data?.energy.insulation || []).map(
                        (insulation: keyof typeof INSULATION) => ({
                          value: insulation,
                          key: INSULATION[insulation],
                        }),
                      )
                    : undefined
                }
              />

              <Input
                id="energy.heating"
                label="Verwarming"
                placeholder="Voer de verwarming in"
                defaultValue={editMode ? listing?.energy.heating || state?.data?.energy.heating : undefined}
                required
              />

              <Input
                id="energy.waterHeating"
                label="Waterverwarming"
                placeholder="Voer de waterverwarming in"
                defaultValue={editMode ? listing?.energy.waterHeating || state?.data?.energy.waterHeating : undefined}
                required
              />

              <Input
                id="energy.CV"
                label="CV"
                placeholder="Voer de CV in"
                defaultValue={editMode ? listing?.energy.CV || state?.data?.energy.CV : undefined}
                required
              />
            </FieldSet>

            <Input
              id="ownership"
              label="Eigendomstype"
              placeholder="Voer het eigendomstype in"
              defaultValue={editMode ? listing?.ownership || state?.data?.ownership : undefined}
              required
            />
          </div>
          {editMode && <input hidden name="_id" defaultValue={listing?._id || state?.data?._id} />}
        </CardContent>
        <CardFooter className="flex justify-between gap-4">
          <SubmitButton label={editMode ? "Bijwerken" : undefined} />
          {state?.message && (
            <p className={cn("text-sm", state.status !== ResponseStatus.success ? "text-red-800" : "text-neutral-700")}>
              {state.message}
            </p>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}

"use client";

import React, { useActionState, useEffect } from "react";
import { createListing, updateListing } from "@/app/(app)/dashboard/listings/actions";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/SubmitButton";
import { LISTING_TYPES, ListingDoc } from "@/models/Listing.type";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { initialActionState, ResponseStatus } from "@/lib/types";
import { handleAction } from "@/lib/client.utils";
import { FieldSet } from "@/components/forms/input/FieldSet";
import { FormInput } from "@/components/forms/input/FormInput";

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
        <CardTitle>{editMode ? `Edit "${listing?.title || state?.data?.title}"` : "Create a new listing"}</CardTitle>
        <CardDescription>
          {editMode ? "Edit the details of the listing" : "Fill in the details of the new listing"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} ref={formRef}>
        <CardContent>
          <div className="flex flex-col gap-4">
            <FormInput
              id="title"
              label="Title"
              placeholder="Enter the title"
              defaultValue={editMode ? listing?.title || state?.data?.title : undefined}
              required
            />

            <FieldSet label="Address">
              <FormInput
                id="streetName"
                label="Street Name"
                placeholder="Enter the street name"
                defaultValue={editMode ? listing?.streetName || state?.data?.streetName : undefined}
                pattern="[a-zA-Z0-9 ]+" // Only allow letters, numbers, and spaces
                required
              />

              <FormInput
                id="streetNumber"
                label="Street Number"
                placeholder="Enter the street number"
                defaultValue={editMode ? listing?.streetNumber || state?.data?.streetNumber : undefined}
                required
              />

              <FormInput
                id="postalCode"
                label="Postal Code"
                placeholder="Enter the postal code"
                defaultValue={editMode ? listing?.postalCode || state?.data?.postalCode : undefined}
                pattern="[1-9][0-9]{3}(?!SA|SD|SS)[A-Z]{2}" // Dutch postal code format
                required
              />

              <FormInput
                id="city"
                label="City"
                placeholder="Enter the city"
                defaultValue={editMode ? listing?.city || state?.data?.city : undefined}
                required
              />

              <FormInput
                id="district"
                label="District"
                placeholder="Enter the district"
                defaultValue={editMode ? listing?.district || state?.data?.district : undefined}
                required
              />
            </FieldSet>

            <FormInput
              id="description"
              label="Description"
              placeholder="Enter the description"
              type="multiline"
              defaultValue={editMode ? listing?.description || state?.data?.description : undefined}
              required
            />

            <FieldSet label="Details">
              <FormInput
                id="askingPrice"
                label="Asking Price"
                placeholder="Enter the asking price"
                defaultValue={editMode ? listing?.askingPrice || state?.data?.askingPrice : undefined}
                required
                type="number"
                min={0}
              />

              <FormInput
                id="yearBuilt"
                label="Year Built"
                placeholder="Enter the year built"
                defaultValue={editMode ? listing?.yearBuilt || state?.data?.yearBuilt : undefined}
                required
                type="number"
                min={1800}
                max={new Date().getFullYear()}
              />

              <FormInput
                id="squareMeters"
                label="Square Meters"
                placeholder="Enter the square meters"
                defaultValue={editMode ? listing?.squareMeters || state?.data?.squareMeters : undefined}
                required
                type="number"
                min={0}
              />
            </FieldSet>
            <div className="flex flex-col gap-2">
              <Label htmlFor="type">Type</Label>
              <Select
                key={resetKey} // Force re-render to reset the select value
                name="type"
                defaultValue={editMode ? listing?.type || state?.data?.type : undefined}
                required
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Type</SelectLabel>
                    {Object.entries(LISTING_TYPES).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          {editMode && <input hidden name="_id" defaultValue={listing?._id || state?.data?._id} />}
        </CardContent>
        <CardFooter className="flex justify-between gap-4">
          <SubmitButton label={editMode ? "Update" : undefined} />
          {state?.message && <p className="text-sm text-neutral-700">{state.message}</p>}
          {state?.error && <p className="text-sm text-red-900">{state.error}</p>}
        </CardFooter>
      </form>
    </Card>
  );
}

"use client";

import Form from "next/form";
import React, { useActionState } from "react";
import { createListing, ListingResponse, updateListing } from "@/app/listings/actions";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submitButton";
import { Textarea } from "@/components/ui/textarea";
import { ListingType } from "@/types/listing";
import { LISTING_TYPES } from "@/models/Listing";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";

interface Props {
  listing?: ListingType;
}

export const initialState = {
  data: {
    _id: "",
    title: "",
    description: "",
    type: "",
  },
  message: "",
  error: "",
} satisfies ListingResponse;

export function ListingForm({ listing }: Props) {
  const editMode = Boolean(listing);

  const [state, action] = useActionState(editMode ? updateListing : createListing, initialState);

  return (
    <Card className="mx-auto max-w-screen-sm">
      <CardHeader>
        <CardTitle>{editMode ? `Edit "${listing?.title || state?.data?.title}"` : "Create a new listing"}</CardTitle>
        <CardDescription>
          {editMode ? "Edit the details of the listing" : "Fill in the details of the new listing"}
        </CardDescription>
      </CardHeader>
      <Form action={action}>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter the title"
                defaultValue={editMode ? listing?.title || state?.data?.title : undefined}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter the description"
                defaultValue={editMode ? listing?.description || state?.data?.description : undefined}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="type">Type</Label>
              <Select name="type" defaultValue={editMode ? listing?.type || state?.data?.type : undefined} required>
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
      </Form>
    </Card>
  );
}

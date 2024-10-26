"use server";

import dbConnect from "@/lib/dbConnect";
import Listing, { LISTING_TYPES } from "@/models/Listing";
import { revalidatePath } from "next/cache";
import { ListingType } from "@/types/listing";
import { serialize } from "@/lib/server.utils";

export async function createListing(
  prevState: unknown,
  formData: FormData,
): Promise<{ data?: ListingType; message?: string; error?: string }> {
  const rawFormData = {
    title: formData.get("title"),
    description: formData.get("description"),
    type: formData.get("type") || Object.entries(LISTING_TYPES).find(([key]) => key === LISTING_TYPES.apartment),
  };

  Object.entries(rawFormData).forEach(([key, value]) => {
    if (!value) return { error: `Please provide a value for the field '${key}'` }; // return early if any field value is falsy
  });

  try {
    await dbConnect();
    const listing = await Listing.create(rawFormData);
    revalidatePath("/test");
    return {
      data: serialize(listing),
      message: `Successfully created listing with title '${rawFormData.title}'`,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      error: `An error occurred while creating the listing: ${message}`,
    };
  }
}

export async function deleteListing(id: string): Promise<{ data?: ListingType; message?: string; error?: string }> {
  try {
    await dbConnect();
    const listing = await Listing.findByIdAndDelete(id);
    revalidatePath("/test");
    return {
      data: serialize(listing),
      message: `Successfully deleted listing with title '${listing?.title}'`,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      error: `An error occurred while deleting the listing: ${message}`,
    };
  }
}

export async function updateListing(
  prevState: unknown,
  formData: FormData,
): Promise<{ data?: ListingType; message?: string; error?: string }> {
  const rawFormData = {
    _id: formData.get("_id"),
    title: formData.get("title"),
    description: formData.get("description"),
    type: formData.get("type") || Object.entries(LISTING_TYPES).find(([key]) => key === LISTING_TYPES.apartment),
  };

  Object.entries(rawFormData).forEach(([key, value]) => {
    if (!value) return { error: `Please provide a value for the field '${key}'` }; // return early if any field value is falsy
  });

  try {
    await dbConnect();
    const listing = await Listing.findByIdAndUpdate(rawFormData._id, rawFormData, { new: true });
    console.log(`updated`, listing);
    revalidatePath("/test");
    return {
      data: serialize(listing),
      message: `Successfully updated listing with title '${rawFormData.title}'`,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      error: `An error occurred while updating the listing: ${message}`,
    };
  }
}

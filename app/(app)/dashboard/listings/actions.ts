"use server";

import dbConnect from "@/lib/dbConnect";
import Listing, { listingSchema } from "@/models/Listing";
import { LISTING_TYPES, IListing } from "@/models/Listing.type";
import { revalidatePath } from "next/cache";
import { errorResponse, serializeDoc, successResponse } from "@/lib/server.utils";
import { ServerResponse } from "@/lib/types";
import { auth } from "@/auth";

export async function createListing(prevState: unknown, formData: FormData): Promise<ServerResponse<IListing>> {
  const defaultType = Object.keys(LISTING_TYPES).find((key) => key === LISTING_TYPES.apartment)!;
  formData.set("type", formData.get("type") || defaultType);

  const listingData = listingSchema.parse(Object.fromEntries(formData));

  try {
    await dbConnect();
    const session = await auth();
    if (!session) return errorResponse("You must be logged in to create a listing");
    const listing = await Listing.create({ ...listingData, userId: session?.user?.id });
    revalidatePath(`/dashboard/listings`);
    return successResponse({
      data: serializeDoc(listing),
      message: `Successfully created listing with title '${listing.title}'`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return errorResponse(`An error occurred while creating the listing: ${message}`);
  }
}

export async function deleteListing(id: string): Promise<ServerResponse<IListing>> {
  try {
    await dbConnect();
    const listing = await Listing.findByIdAndDelete(id);
    revalidatePath(`/dashboard/listings`);
    return successResponse({
      data: serializeDoc(listing),
      message: `Successfully deleted listing with title '${listing?.title}'`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return errorResponse(`An error occurred while deleting the listing: ${message}`);
  }
}

export async function updateListing(prevState: unknown, formData: FormData): Promise<ServerResponse<IListing>> {
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
    revalidatePath(`/dashboard/listings/${listing._id}`);
    revalidatePath(`/dashboard/listings`);
    return successResponse({
      data: serializeDoc(listing),
      message: `Successfully updated listing with title '${rawFormData.title}'`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return errorResponse(`An error occurred while updating the listing: ${message}`);
  }
}

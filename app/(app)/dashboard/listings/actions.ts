"use server";

import dbConnect from "@/lib/dbConnect";
import Listing, { listingCreateSchema, listingUpdateSchema } from "@/models/Listing";
import { LISTING_TYPES_ENUM } from "@/models/Listing.type";
import { revalidatePath } from "next/cache";
import { errorResponse, failResponse, formatZodError, serializeDoc, successResponse } from "@/lib/server.utils";
import { auth } from "@/auth";
import z from "zod";

export async function createListing(prevState: unknown, formData: FormData) {
  try {
    formData.set("type", formData.get("type") || LISTING_TYPES_ENUM.house);

    const data = Object.fromEntries(formData);

    const listingData = listingCreateSchema.parse(data);

    // const nestedFormData = createNestedObject(listingData); // Nested paths are handles by Mongoose automatically

    const session = await auth();
    if (!session) return errorResponse("You must be logged in to create a listing");

    await dbConnect();
    const listing = await Listing.create({ ...listingData, userId: session?.user?.id });
    revalidatePath(`/dashboard/listings`);
    return successResponse({
      data: serializeDoc(listing),
      message: `Successfully created listing with title '${listing.title}'`,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return failResponse({ message: formatZodError(error) });
    }

    const message = error instanceof Error ? error.message : String(error);
    return errorResponse(`An error occurred while creating the listing: ${message}`);
  }
}

export async function deleteListing(id: string) {
  try {
    const session = await auth();
    if (!session) return errorResponse("You must be logged in to delete a listing");

    await dbConnect();
    const listing = await Listing.findOneAndDelete({ _id: id, userId: session?.user?.id });
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

export async function updateListing(prevState: unknown, formData: FormData) {
  try {
    const data = Object.fromEntries(formData);

    const updateData = listingUpdateSchema.parse(data);

    const session = await auth();
    if (!session) return errorResponse("You must be logged in to update a listing");

    await dbConnect();
    const listing = await Listing.findOneAndUpdate({ _id: updateData._id, userId: session?.user?.id }, updateData, {
      new: true,
    });
    revalidatePath(`/dashboard/listings/${listing._id}`);
    revalidatePath(`/dashboard/listings`);
    return successResponse({
      data: serializeDoc(listing),
      message: `Successfully updated listing with title '${updateData.title}'`,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return failResponse({ message: formatZodError(error) });
    }

    const message = error instanceof Error ? error.message : String(error);
    return errorResponse(`An error occurred while updating the listing: ${message}`);
  }
}

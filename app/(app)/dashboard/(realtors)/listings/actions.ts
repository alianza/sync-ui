"use server";

import dbConnect from "@/lib/dbConnect";
import Listing, { listingCreateSchema, listingUpdateSchema } from "@/models/Listing";
import { revalidatePath } from "next/cache";
import {
  actionAuthGuard,
  errorResponse,
  failResponse,
  formatZodError,
  serializeDoc,
  successResponse,
} from "@/lib/server.utils";
import { auth } from "@/auth";
import { ObjectId } from "mongodb";
import { STATUS } from "@/models/Listing.type";

export async function createListing(prevState: unknown, formData: FormData) {
  const parsedListingSchema = listingCreateSchema.safeParse(Object.fromEntries(formData));
  if (!parsedListingSchema.success)
    return failResponse({ message: formatZodError(parsedListingSchema.error, { messageOnly: true }) });

  const listingData = parsedListingSchema.data;

  // const nestedFormData = createNestedObject(listingData); // Nested paths are handles by Mongoose automatically

  const session = await auth();

  try {
    if (!session) return errorResponse({ message: "Je moet ingelogd zijn om een woning aan te maken" });
    await actionAuthGuard(session, { realtorOnly: true });
  } catch (error) {
    return errorResponse({ message: "Je moet ingelogd zijn als makelaar om een woning aan te maken" });
  }

  try {
    await dbConnect();
    const listing = await Listing.create({ ...listingData, userId: session.user.id });
    return successResponse({
      data: serializeDoc(listing),
      message: `Succesvol woning met naam '${listing.title}' aangemaakt.`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return errorResponse({ message: `Fout bij het aanmaken van de woning: ${message}` });
  }
}

export async function deleteListing(id: string) {
  const session = await auth();

  try {
    if (!session) return errorResponse({ message: "Je moet ingelogd zijn om een woning te verwijderen" });
    await actionAuthGuard(session, { realtorOnly: true });
  } catch (error) {
    return errorResponse({ message: "Je moet ingelogd zijn als makelaar om een woning te verwijderen" });
  }

  try {
    await dbConnect();
    const listing = await Listing.findOneAndDelete({ _id: id, userId: session.user.id });
    revalidatePath(`/dashboard/listings`);
    return successResponse({
      data: serializeDoc(listing),
      message: `Successfully deleted listing with title '${listing?.title}'`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return errorResponse({ message: `An error occurred while deleting the listing: ${message}` });
  }
}

export async function updateListing(prevState: unknown, formData: FormData) {
  const parsedListingUpdateSchema = listingUpdateSchema.safeParse(Object.fromEntries(formData));
  if (!parsedListingUpdateSchema.success)
    return failResponse({ message: formatZodError(parsedListingUpdateSchema.error, { messageOnly: true }) });

  const updateData = parsedListingUpdateSchema.data;

  const session = await auth();

  try {
    if (!session) return errorResponse({ message: "Je moet ingelogd zijn om een woning aan te passen" });
    await actionAuthGuard(session, { realtorOnly: true });
  } catch (error) {
    return errorResponse({ message: "Je moet ingelogd zijn als makelaar om een woning aan te passen" });
  }

  try {
    await dbConnect();
    const listing = await Listing.findOneAndUpdate({ _id: updateData._id, userId: session.user.id }, updateData, {
      new: true,
    });

    if (!listing) return failResponse({ message: "Listing not found" });

    revalidatePath(`/dashboard/listings/${listing._id}`);
    // revalidatePath(`/dashboard/listings`);
    return successResponse({
      data: serializeDoc(listing),
      message: `Successfully updated listing with title '${updateData.title}'`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return errorResponse({ message: `An error occurred while updating the listing: ${message}` });
  }
}

export async function updateListingStatus(listingId: string, status: keyof typeof STATUS) {
  if (!ObjectId.isValid(listingId)) return failResponse({ message: "Ongeldig woning ID" });

  const session = await auth();

  try {
    if (!session) return errorResponse({ message: "Je moet ingelogd zijn om de status van een woning aan te passen" });
    await actionAuthGuard(session, { realtorOnly: true });
  } catch (error) {
    return errorResponse({ message: "Je moet ingelogd zijn als makelaar om de status van een woning aan te passen" });
  }

  try {
    await dbConnect();
    const listing = await Listing.findOneAndUpdate(
      { _id: new ObjectId(listingId), userId: session.user.id },
      { status },
      { new: true },
    );

    if (!listing) return failResponse({ message: "Woning niet gevonden" });

    revalidatePath(`/dashboard/listings/${listing._id}`);
    return successResponse({
      data: serializeDoc(listing),
      message: `Succesvol de status van woning '${listing.title}' aangepast naar '${status}'`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return errorResponse({ message: `Er ging iets mis bij het updaten van de status van de woning: ${message}` });
  }
}

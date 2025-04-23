"use server";

import { ListingDoc } from "@/models/Listing.type";
import Listing from "@/models/Listing";
import { auth } from "@/auth";
import {
  actionAuthGuard,
  errorResponse,
  failResponse,
  formatZodError,
  serializeDoc,
  successResponse,
} from "@/lib/server.utils";
import dbConnect from "@/lib/dbConnect";
import z from "zod";
import { ObjectId } from "mongodb";
import User from "@/models/User";
import { UserDoc } from "@/models/User.type";

const linkListingSchema = z.object({
  listingId: z.string().refine(ObjectId.isValid, { message: "Ongeldig listing id" }),
  linkUserIds: z.array(z.string().refine(ObjectId.isValid, { message: "Ongeldig user id" })),
  unlinkUserIds: z.array(z.string().refine(ObjectId.isValid, { message: "Ongeldig user id" })),
});

export async function linkListing(prevState: unknown, formData: FormData) {
  try {
    const data = {
      listingId: formData.get("listingId"),
      linkUserIds: formData.getAll("linkUserIds[]"),
      unlinkUserIds: formData.getAll("unlinkUserIds[]"),
    };

    const linkListingData = linkListingSchema.parse(data);

    const session = await auth();

    try {
      if (!session) return errorResponse({ message: "Je moet ingelogd zijn om een woning te koppelen." });
      await actionAuthGuard(session, { realtorOnly: true });
    } catch (error) {
      return errorResponse({ message: "Je moet ingelogd zijn als makelaar om een woning te koppelen" });
    }

    await dbConnect();

    // revalidatePath(`/dashboard/listings`);

    const listing = await Listing.findById<ListingDoc>(linkListingData.listingId);

    for (const userId of linkListingData.linkUserIds) {
      const user = await User.findById<UserDoc>(userId);
      if (!user) return errorResponse({ message: `Gebruiker met id '${userId}' niet gevonden` });

      const listingExists = user.listings?.some((listing) => listing.listingId.equals(linkListingData.listingId));

      if (!listingExists) {
        await User.findByIdAndUpdate(userId, { $addToSet: { listings: { listingId: linkListingData.listingId } } });
      }
    }

    for (const userId of linkListingData.unlinkUserIds) {
      await User.findByIdAndUpdate<UserDoc>(userId, {
        $pull: { listings: { listingId: linkListingData.listingId } },
      });
    }

    if (!listing) return errorResponse({ message: `Listing met id '${linkListingData.listingId}' niet gevonden` });

    return successResponse({
      data: serializeDoc(listing),
      message: `Woning met titel '${listing.title}' succesvol gekoppeld`,
    });
  } catch (error) {
    if (error instanceof z.ZodError) return failResponse({ message: formatZodError(error) });

    const message = error instanceof Error ? error.message : String(error);
    return errorResponse({ message: `Er is een fout opgetreden tijdens het koppelen van de woning: ${message}` });
  }
}

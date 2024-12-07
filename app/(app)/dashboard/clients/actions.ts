"use server";

import dbConnect from "@/lib/dbConnect";
import Listing, { listingCreateSchema } from "@/models/Listing";
import { LISTING_TYPES, ListingDoc } from "@/models/Listing.type";
import { revalidatePath } from "next/cache";
import { errorResponse, serializeDoc, successResponse } from "@/lib/server.utils";
import { ServerResponse } from "@/lib/types";
import { auth } from "@/auth";
import { Roles } from "@/models/User.type";
import User from "@/models/User";

export async function deleteClient(id: string) {
  try {
    await dbConnect();
    const session = await auth();
    if (!session) return errorResponse("You must be logged in to delete a client");
    const listing = await User.findOneAndDelete({ _id: id, role: Roles.buyer });
    revalidatePath(`/dashboard/clients/${id}`);
    revalidatePath(`/dashboard/clients`);
    return successResponse({
      data: serializeDoc(listing),
      message: `Successfully deleted client with email: ${listing?.email}`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return errorResponse(`An error occurred while deleting the client: ${message}`);
  }
}

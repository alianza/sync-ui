"use server";

import dbConnect from "@/lib/dbConnect";
import { revalidatePath } from "next/cache";
import { actionAuthGuard, errorResponse, serializeDoc, successResponse } from "@/lib/server.utils";
import { auth } from "@/auth";
import User from "@/models/User";

export async function deleteClient(id: string, email: string) {
  try {
    const session = await auth();

    try {
      if (!session) return errorResponse({ message: "You must be logged in to delete a client" });
      await actionAuthGuard(session, { realtorOnly: true });
    } catch (error) {
      return errorResponse({ message: "You must be logged in as a realtor to delete a client" });
    }

    await dbConnect();

    const user = await User.findByIdAndUpdate(session.user.id, { $pull: { clients: id } });

    if (!user) return errorResponse({ message: `Client with email: ${email} not found` });

    // revalidatePath(`/dashboard/clients/${id}`);
    revalidatePath(`/dashboard/clients`);
    return successResponse({
      data: serializeDoc(user),
      message: `Successfully deleted client with email: ${email}`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return errorResponse({ message: `An error occurred while deleting the client: ${message}` });
  }
}

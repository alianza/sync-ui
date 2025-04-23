"use server";

import dbConnect from "@/lib/dbConnect";
import { revalidatePath } from "next/cache";
import { actionAuthGuard, errorResponse, serializeDoc, successResponse } from "@/lib/server.utils";
import { auth } from "@/auth";
import User from "@/models/User";

export async function deleteAgent(id: string, email: string) {
  try {
    await dbConnect();
    const session = await auth();

    try {
      if (!session) return errorResponse({ message: "You must be logged in to delete an agent" });
      await actionAuthGuard(session, { buyerOnly: true });
    } catch (error) {
      return errorResponse({ message: "You must be logged in as a buyer to delete an agent" });
    }

    const user = await User.findByIdAndUpdate(id, { $pull: { clients: session.user.id } });

    if (!user) return errorResponse({ message: `Agent with email: ${email} not found` });

    // revalidatePath(`/dashboard/agents/${id}`);
    revalidatePath(`/dashboard/agents`);
    return successResponse({
      data: serializeDoc(user),
      message: `Successfully deleted agent with email: ${email}`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return errorResponse({ message: `An error occurred while deleting the agent: ${message}` });
  }
}

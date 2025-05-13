"use server";

import dbConnect from "@/lib/dbConnect";
import { revalidatePath } from "next/cache";
import { actionAuthGuard, errorResponse, serializeDoc, successResponse } from "@/lib/server.utils";
import { auth } from "@/auth";
import User from "@/models/User";

export async function deleteAgent(id: string, email: string) {
  const session = await auth();
  if (!session) return errorResponse({ message: "Je moet ingelogd zijn om een agent te verwijderen." });

  const authResult = await actionAuthGuard(session, { buyerOnly: true });
  if (!authResult.success)
    return errorResponse({ message: "Je moet ingelogd zijn als een koper om een agent te verwijderen" });

  try {
    await dbConnect();
    const user = await User.findByIdAndUpdate(id, { $pull: { clients: session.user.id } });
    if (!user) return errorResponse({ message: `Agent met email: ${email} niet gevonden` });

    // revalidatePath(`/dashboard/agents/${id}`);
    revalidatePath(`/dashboard/agents`);
    return successResponse({
      data: serializeDoc(user),
      message: `Agent with email: ${email} succesvol verwijderd`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return errorResponse({ message: `Fout bij het verwijderen van de agent: ${message}` });
  }
}

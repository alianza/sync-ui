"use server";

import dbConnect from "@/lib/dbConnect";
import { revalidatePath } from "next/cache";
import { actionAuthGuard, errorResponse, serializeDoc, successResponse } from "@/lib/server.utils";
import { auth } from "@/auth";
import User from "@/models/User";

export async function deleteClient(id: string, email: string) {
  const session = await auth();
  if (!session) return errorResponse({ message: "Je moet ingelogd zijn om een klant te verwijderen." });

  const authResult = await actionAuthGuard(session, { realtorOnly: true });
  if (!authResult.success)
    return errorResponse({ message: "Je moet ingelogd zijn als een makelaar om een klant te verwijderen" });

  try {
    await dbConnect();

    const user = await User.findByIdAndUpdate(session.user.id, { $pull: { clients: id } });
    if (!user) return errorResponse({ message: `Klant met email: ${email} niet gevonden` });

    // revalidatePath(`/dashboard/clients/${id}`);
    revalidatePath(`/dashboard/clients`);
    return successResponse({
      data: serializeDoc(user),
      message: `Klant met email: ${email} succesvol verwijderd`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return errorResponse({ message: `Fout bij het verwijderen van de klant: ${message}` });
  }
}

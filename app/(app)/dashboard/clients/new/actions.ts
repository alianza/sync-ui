"use server";

import dbConnect from "@/lib/dbConnect";
import {
  errorResponse,
  failResponse,
  formatZodError,
  isMongooseDuplicateKeyError,
  serializeDoc,
  successResponse,
} from "@/lib/server.utils";
import { auth } from "@/auth";
import ClientInvite, { clientInviteCreateSchema } from "@/models/ClientInvite";
import { ClientInviteDoc } from "@/models/ClientInvite.type";
import z from "zod";

export async function createClientInvite(prevState: unknown, formData: FormData) {
  try {
    const clientInviteData = clientInviteCreateSchema.parse(Object.fromEntries(formData));

    const session = await auth();
    if (!session) return errorResponse("You must be logged in to delete a client");

    if (clientInviteData.inviteeEmail === session.user.email) {
      return failResponse({ message: "Je kan jezelf niet uitnodigen" });
    }

    await dbConnect();
    const clientInvite = await ClientInvite.create<ClientInviteDoc>({
      ...clientInviteData,
      inviter: session?.user?.id,
    });
    return successResponse({
      data: serializeDoc(clientInvite),
      message: `Successfully created client invite for email: ${clientInvite.inviteeEmail}`,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return failResponse({ message: formatZodError(error) });
    }

    if (isMongooseDuplicateKeyError(error)) {
      return failResponse({ message: "A client invite with this email already exists" });
    }

    const message = error instanceof Error ? error.message : String(error);
    return errorResponse(`An error occurred while deleting the client: ${message}`);
  }
}

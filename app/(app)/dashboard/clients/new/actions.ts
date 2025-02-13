"use server";

import dbConnect from "@/lib/dbConnect";
import {
  actionAuthGuard,
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
import User from "@/models/User";
import { UserDoc } from "@/models/User.type";
import { HydratedDocument } from "mongoose";

export async function createClientInvite(prevState: unknown, formData: FormData) {
  try {
    const clientInviteData = clientInviteCreateSchema.parse(Object.fromEntries(formData));

    const session = await auth();

    try {
      if (!session) return errorResponse({ message: "You must be logged in to delete a client" });
      await actionAuthGuard(session, { realtorOnly: true });
    } catch (error) {
      return errorResponse({ message: "You must be logged in as a realtor to create a client invite" });
    }

    if (clientInviteData.inviteeEmail === session.user.email) {
      return failResponse({ message: "Je kan jezelf niet uitnodigen" });
    }

    await dbConnect();

    const user = await User.findOne<HydratedDocument<UserDoc>>({ email: clientInviteData.inviteeEmail });
    if (user) {
      const res = (await User.findOneAndUpdate(
        { _id: session.user.id },
        { $addToSet: { clients: user._id } },
      )) as HydratedDocument<UserDoc>; // Returns the original document

      if (!res) return failResponse({ message: "Error, log opnieuw in en probeer het nog een keer" });

      if (res?.clients?.includes(user._id)) {
        return successResponse({
          data: serializeDoc(user),
          message: `Gebruiker met email: ${clientInviteData.inviteeEmail} is al een klant van jou`,
        });
      }

      return successResponse({
        data: serializeDoc(user),
        message: `Gebruiker met email: ${clientInviteData.inviteeEmail} bestaat al, deze is toegevoegd aan je klanten`,
      });
    }

    const clientInvite = await ClientInvite.create<HydratedDocument<ClientInviteDoc>>({
      ...clientInviteData,
      inviter: session.user.id,
    });
    return successResponse({
      data: serializeDoc(clientInvite),
      statusCode: 201,
      message: `Successfully created client invite for email: ${clientInvite.inviteeEmail}`,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return failResponse({ message: formatZodError(error) });
    }

    if (isMongooseDuplicateKeyError(error)) {
      return failResponse({ message: "Je hebt al een uitnodiging voor deze klant uitstaan" });
    }

    const message = error instanceof Error ? error.message : String(error);
    return errorResponse({ message: `Error bij het aanmaken van uitnodiging: ${message}` });
  }
}

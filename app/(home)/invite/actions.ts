"use server";

import {
  errorResponse,
  failResponse,
  formatZodError,
  isMongooseDuplicateKeyError,
  serializeDoc,
  successResponse,
} from "@/lib/server.utils";
import User from "@/models/User";
import { ROLES, UserDoc } from "@/models/User.type";
import { saltAndHashPassword } from "@/auth";
import z from "zod";
import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import ClientInvite from "@/models/ClientInvite";
import { ClientInviteDoc, STATUS_ENUM } from "@/models/ClientInvite.type";
import { HydratedDocument } from "mongoose";

export async function AcceptInviteAction(prevState: unknown, formData: FormData) {
  const acceptInviteSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    inviteId: z.string().refine(ObjectId.isValid, { message: "Ongeldig uitnodiging id" }),
  });

  const parsedAcceptInviteSchema = acceptInviteSchema.safeParse(Object.fromEntries(formData));
  if (!parsedAcceptInviteSchema.success)
    return failResponse({ message: formatZodError(parsedAcceptInviteSchema.error, { messageOnly: true }) });

  const { firstName, lastName, email, password, confirmPassword, inviteId } = parsedAcceptInviteSchema.data;

  if (password !== confirmPassword) return failResponse({ message: "Wachtwoorden komen niet overeen" });

  const hashedPassword = await saltAndHashPassword(password);

  try {
    await dbConnect();

    const invite = await ClientInvite.findOneAndUpdate<ClientInviteDoc>(
      { _id: inviteId, status: STATUS_ENUM.PENDING, inviteeEmail: email },
      { $set: { status: STATUS_ENUM.ACCEPTED, acceptedAt: new Date() } },
    ).populate<UserDoc>("inviter");

    if (!invite) return failResponse({ message: "Uitnodiging niet gevonden" });

    const user = await User.create({ firstName, lastName, email, password: hashedPassword, role: ROLES.BUYER });
    await User.updateOne({ _id: invite.inviter._id }, { $addToSet: { clients: user._id } });

    const invites = await ClientInvite.find<HydratedDocument<ClientInviteDoc>>({
      inviteeEmail: email,
      status: STATUS_ENUM.PENDING,
    }).populate<UserDoc>("inviter"); // Get all pending invites for the user

    await User.updateMany(
      { _id: { $in: invites.map((invite) => invite.inviter._id) } },
      { $addToSet: { clients: user._id } },
    ); // Add the new user to the inviter's clients

    await ClientInvite.updateMany(
      { inviteeEmail: email, status: STATUS_ENUM.PENDING },
      { $set: { status: STATUS_ENUM.ACCEPTED, acceptedAt: new Date() } },
    ); // Update all pending invites for the user

    // return redirect("/login");
    return successResponse({ message: "Uitnodiging succesvol geaccepteerd!", data: serializeDoc(user) });
  } catch (error) {
    if (isMongooseDuplicateKeyError(error)) {
      return failResponse({ message: "E-mailadres is al in gebruik, je kan inloggen" });
    }

    return errorResponse({ message: error?.toString() });
  }
}

export async function RejectInviteAction({ inviteeEmail, inviteID }: { inviteeEmail: string; inviteID: string }) {
  const rejectInviteSchema = z.object({
    email: z.string().email(),
    inviteId: z.string().refine(ObjectId.isValid, { message: "Ongeldig uitnodiging id" }),
  });

  const parseData = rejectInviteSchema.safeParse({ email: inviteeEmail, inviteId: inviteID });
  if (!parseData.success) return failResponse({ message: formatZodError(parseData.error, { messageOnly: true }) });
  const { email, inviteId } = parseData.data;

  try {
    await dbConnect();

    const invite = await ClientInvite.findOneAndUpdate<ClientInviteDoc>(
      { _id: inviteId, status: STATUS_ENUM.PENDING, inviteeEmail: email },
      { $set: { status: STATUS_ENUM.REJECTED } },
    );

    if (!invite) return failResponse({ message: "Uitnodiging niet gevonden" });

    return successResponse({ message: "Uitnodiging succesvol afgewezen" });
  } catch (error) {
    return errorResponse({ message: error?.toString() });
  }
}

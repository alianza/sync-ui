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

const acceptInviteSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  inviteId: z.string().refine(ObjectId.isValid, { message: "Invalid invite ID" }),
});

export async function AcceptInviteAction(prevState: unknown, formData: FormData) {
  try {
    const { firstName, lastName, email, password, confirmPassword, inviteId } = acceptInviteSchema.parse(
      Object.fromEntries(formData),
    );

    if (password !== confirmPassword) return failResponse({ message: "Passwords do not match" });

    const hashedPassword = await saltAndHashPassword(password);

    await dbConnect();

    const invite = await ClientInvite.findOneAndUpdate<ClientInviteDoc>(
      { _id: inviteId, status: STATUS_ENUM.PENDING, inviteeEmail: email },
      { $set: { status: STATUS_ENUM.ACCEPTED, acceptedAt: new Date() } },
    ).populate<UserDoc>("inviter");

    if (!invite) return failResponse({ message: "Invite not found" });

    const user = await User.create({ firstName, lastName, email, password: hashedPassword, role: ROLES.BUYER });

    await User.updateOne({ _id: invite.inviter._id }, { $push: { clients: user._id } });

    // return redirect("/login");
    return successResponse({ message: "Successfully accepted invite!", data: serializeDoc(user) });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return failResponse({ message: formatZodError(error) });
    }

    if (isMongooseDuplicateKeyError(error)) {
      return failResponse({ message: "This email is already in use, please log in" });
    }

    return errorResponse(error);
  }
}

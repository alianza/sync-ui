"use server";

import { errorResponse, failResponse, formatZodError, isMongooseDuplicateKeyError } from "@/lib/server.utils";
import User from "@/models/User";
import { Roles, UserDoc } from "@/models/User.type";
import { saltAndHashPassword } from "@/auth";
import z from "zod";
import dbConnect from "@/lib/dbConnect";
import { redirect } from "next/navigation";
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
      { _id: inviteId },
      { $set: { status: STATUS_ENUM.ACCEPTED } },
    ).populate<UserDoc>("inviter");

    if (!invite) return failResponse({ message: "Invite not found" });

    if (invite.inviteeEmail !== email) return failResponse({ message: "Sent email and invite email do not match" });

    const user = await User.create({ firstName, lastName, email, password: hashedPassword, role: Roles.buyer });

    // add user the client list of the inviter

    await User.updateOne({ _id: invite.inviter._id }, { $push: { clients: user._id } });

    // return successResponse({ message: "Successfully signed up!", data: serializeDoc(user) });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return failResponse({ message: formatZodError(error) });
    }

    if (isMongooseDuplicateKeyError(error)) {
      return failResponse({ message: "This email is already in use, please log in" });
    }

    return errorResponse(error);
  }

  return redirect("/login?signup=true");
}

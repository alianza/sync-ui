import mongoose from "mongoose";
import { ClientInviteDoc, STATUS_ENUM } from "@/models/ClientInvite.type";
import z from "zod";

import "server-only";

export const clientInviteCreateSchema = z.object({
  inviteeEmail: z.string().email(),
  message: z.string().max(500).optional(),
});

const ClientInviteSchema = new mongoose.Schema<ClientInviteDoc>(
  {
    inviteeEmail: {
      type: String,
      validate: {
        validator: function (value: string) {
          return /\S+@\S+\.\S+/.test(value);
        },
        message: "Please provide a valid email address",
      },
      required: [true, "Please provide an email address"],
      unique: true,
    },
    message: {
      type: String,
      required: false,
    },
    inviter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(STATUS_ENUM),
      default: STATUS_ENUM.PENDING,
      required: false,
    },
    acceptedAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true },
);

export default mongoose.models?.ClientInvite || mongoose.model<ClientInviteDoc>("ClientInvite", ClientInviteSchema);

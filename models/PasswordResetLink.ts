import mongoose from "mongoose";
import z from "zod";
import { PasswordResetLinkDoc } from "@/models/PasswordResetLink.type";

import "server-only";

export const passwordResetLinkCreateSchema = z.object({
  user: z.string().refine((val) => mongoose.isValidObjectId(val), { message: "Invalid user ID" }),
  token: z.string().min(1, "Token is required"),
});

const PasswordResetLinkSchema = new mongoose.Schema<PasswordResetLinkDoc>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    consumedAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true },
);

export default mongoose.models?.PasswordResetLink ||
  mongoose.model<PasswordResetLinkDoc>("PasswordResetLink", PasswordResetLinkSchema);

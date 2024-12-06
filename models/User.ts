import mongoose from "mongoose";
import { UserDoc, Roles } from "@/models/User.type";

import "server-only";

const UserSchema = new mongoose.Schema<UserDoc>(
  {
    firstName: {
      type: String,
      required: [true, "Please provide your first name."],
    },
    lastName: {
      type: String,
      required: [true, "Please provide your last name."],
    },
    email: {
      type: String,
      required: [true, "Please provide your email."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password."],
      minlength: [6, "Password must be at least 6 characters long."],
    },
    role: {
      type: String,
      enum: Object.values(Roles),
      default: Roles.Buyer,
    },
    clients: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.models?.User || mongoose.model<UserDoc>("User", UserSchema);

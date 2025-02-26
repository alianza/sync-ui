import mongoose from "mongoose";
import { ROLES, UserDoc } from "@/models/User.type";

import "server-only";

const ListingReferenceSchema = new mongoose.Schema({
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true },
  linkedAt: { type: Date, default: Date.now },
});

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
      validator: function (value: string) {
        return /\S+@\S+\.\S+/.test(value);
      },
      required: [true, "Please provide your email."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password."],
      minlength: [8, "Password must be at least 6 characters long."],
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.BUYER,
    },
    clients: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    listings: {
      type: [ListingReferenceSchema],
      default: [],
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.models?.User || mongoose.model<UserDoc>("User", UserSchema);

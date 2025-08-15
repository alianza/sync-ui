import mongoose, { InferSchemaType } from "mongoose";
import { createModel } from "@/lib/typedModelFactory";
import { ROLES } from "@/models/User.type";

import "server-only";

const ListingReferenceSchema = new mongoose.Schema({
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true },
  linkedAt: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: [true, "Please provide your first name."] },
    lastName: { type: String, required: [true, "Please provide your last name."] },
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
    role: { type: String, enum: Object.values(ROLES), default: ROLES.BUYER },
    clients: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
    listings: { type: [ListingReferenceSchema], default: [] },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// type ListingRefType = InferSchemaType<typeof ListingReferenceSchema>; // noinspection JSUnusedLocalSymbols

const User = createModel("User", UserSchema);

export type UserType = InferSchemaType<typeof User.schema> & { _id: mongoose.Schema.Types.ObjectId };
export type UserLeanType = Omit<UserType, keyof import("mongoose").Document> & { _id: mongoose.Schema.Types.ObjectId };
export type UserObjType = Omit<UserType, keyof import("mongoose").Document> & { _id: string };

export default User;

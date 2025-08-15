import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { UserType } from "@/models/User";

interface PasswordResetLink {
  user: UserType;
  token: string;
  consumedAt?: Date;
}

export interface PasswordResetLinkDoc extends PasswordResetLink, mongoose.Document {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface PasswordResetLinkObj extends Omit<PasswordResetLink, "user"> {
  _id: string;
  user: UserType;
  createdAt: Date;
  updatedAt: Date;
}

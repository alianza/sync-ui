import { UserDoc, UserObj } from "./User.type";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

interface PasswordResetLink {
  user: UserDoc;
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
  user: UserObj;
  createdAt: Date;
  updatedAt: Date;
}

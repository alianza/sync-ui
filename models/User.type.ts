import mongoose from "mongoose";
import { ObjectId } from "mongodb";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: string;
  verified: boolean;
  clients?: string[];
  listings?: { listingId: ObjectId; linkedAt: Date }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDoc extends User, mongoose.Document {
  _id: ObjectId;
}

export interface UserObj extends Omit<User, "listings"> {
  _id: string;
  listings?: { listingId: string; linkedAt: Date }[];
}

export enum ROLES {
  REALTOR = "realtor",
  BUYER = "buyer",
  ADMIN = "admin",
}

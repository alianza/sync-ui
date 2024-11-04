import mongoose from "mongoose";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export enum Roles {
  Realtor = "realtor",
  Buyer = "buyer",
}

const UserSchema = new mongoose.Schema<IUser>(
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
      default: "buyer",
    },
  },
  { timestamps: true },
);

export default mongoose.models?.User || mongoose.model<IUser>("User", UserSchema);

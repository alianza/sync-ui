import mongoose from "mongoose";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
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
    },
    role: {
      type: String,
      enum: ["realtor", "buyer"],
      default: "buyer",
    },
  },
  { timestamps: true },
);

export default mongoose.models?.User || mongoose.model<IUser>("User", UserSchema);

import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: [true, "Authentication error. Please log in and try again."],
    },
  },
  { timestamps: true },
);

export default mongoose.models?.Profile ||
  mongoose.model("Profile", ProfileSchema);

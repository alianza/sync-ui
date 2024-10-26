import mongoose from "mongoose";

export const LISTING_TYPES = {
  standalone: "Standalone",
  flat: "Flat",
  apartment: "Apartment",
  house: "House",
  boat: "Boat",
};

interface ListingInterface {
  title: string;
  type: string;
  description: string;
}

const TYPES_ENUM = Object.values(LISTING_TYPES);

const ListingSchema = new mongoose.Schema<ListingInterface>(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for this listing"],
    },
    type: {
      type: String,
      required: [true, "Please provide your preferred stance"],
      enum: {
        values: TYPES_ENUM,
        message: '"{VALUE}" is not a listing type',
      },
    },
    description: {
      type: String,
      required: [true, "Please provide a description for this listing"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
  },
  { timestamps: true },
);

export default mongoose.models?.Listing || mongoose.model<ListingInterface>("Listing", ListingSchema);

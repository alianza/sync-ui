import mongoose from "mongoose";
import z from "zod";

import "server-only";
import { ListingDoc, LISTING_TYPES } from "@/models/Listing.type";

const postalCodeRegex = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i;

const TYPES_ENUM = Object.keys(LISTING_TYPES);

export const listingSchema = z.object({
  title: z.string().min(1),
  streetName: z.string().min(1),
  streetNumber: z.string().min(1),
  postalCode: z.string().regex(postalCodeRegex),
  city: z.string().min(1),
  district: z.string().min(1),
  type: z.enum([TYPES_ENUM[0], ...TYPES_ENUM]),
  askingPrice: z.coerce.number().min(1),
  yearBuilt: z.coerce.number().min(1800).max(new Date().getFullYear()),
  squareMeters: z.coerce.number().min(1),
  description: z.string().max(500),
  // userId: z.string(),
});

const ListingSchema = new mongoose.Schema<ListingDoc>(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for this listing"],
    },
    streetName: {
      type: String,
      required: [true, "Please provide a street name for this listing"],
    },
    streetNumber: {
      type: String,
      required: [true, "Please provide a street number for this listing"],
    },
    postalCode: {
      type: String,
      required: [true, "Please provide a postal code for this listing"],
      validate: {
        validator: function (value: string) {
          return postalCodeRegex.test(value);
        },
        message: "Postal code must be in the format 1234AB",
      },
    },
    city: {
      type: String,
      required: [true, "Please provide a city for this listing"],
    },
    district: {
      type: String,
      required: [true, "Please provide a district for this listing"],
    },
    type: {
      type: String,
      required: [true, "Please provide a type for this listing"],
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
    askingPrice: {
      type: Number,
      required: [true, "Please provide a asking price for this listing"],
    },
    yearBuilt: {
      type: Number,
      required: [true, "Please provide a year built for this listing"],
      validate: {
        validator: function (value: number) {
          return value >= 1800 && value <= new Date().getFullYear();
        },
        message: "Year built must be between 1800 and the current year",
      },
    },
    squareMeters: {
      type: Number,
      required: [true, "Please provide a square meters for this listing"],
      validate: {
        validator: function (value: number) {
          return value > 0;
        },
        message: "Square meters must be greater than 0",
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export default mongoose.models?.Listing || mongoose.model<ListingDoc>("Listing", ListingSchema);

import mongoose from "mongoose";
import z from "zod";

import "server-only";
import {
  ENERGY_LABELS,
  FEATURES,
  INSULATION,
  LISTING_TYPES,
  LISTING_TYPES_ENUM,
  ListingDoc,
} from "@/models/Listing.type";

const postalCodeRegex = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i;

const TYPES_ENUM = Object.keys(LISTING_TYPES);
const ENERGY_LABELS_ENUM = Object.keys(ENERGY_LABELS);
const FEATURES_ENUM = Object.keys(FEATURES);
const INSULATION_ENUM = Object.keys(INSULATION);

const MAX_DESCRIPTION_LENGTH = 1500;

export const listingCreateSchema = z.object({
  title: z.string().min(1),
  streetName: z.string().min(1),
  streetNumber: z.string().min(1),
  postalCode: z.string().regex(postalCodeRegex),
  city: z.string().min(1),
  district: z.string().min(1),
  askingPrice: z.coerce.number().min(1),
  yearBuilt: z.coerce.number().min(1800).max(new Date().getFullYear()),
  description: z.string().max(MAX_DESCRIPTION_LENGTH),
  roofType: z.string().min(1),
  type: z.enum([TYPES_ENUM[0], ...TYPES_ENUM]),
  "measurements.squareMetersTotal": z.coerce.number().min(1),
  "measurements.squareMetersLiving": z.coerce.number().default(0),
  "measurements.squareMetersOther": z.coerce.number().default(0),
  "measurements.squareMetersOutdoor": z.coerce.number().default(0),
  "measurements.squareMetersProperty": z.coerce.number().default(0),
  "measurements.cubicMetersVolume": z.coerce.number().min(1),
  "rooms.roomCount": z.coerce.number().min(1),
  "rooms.bedRoomCount": z.coerce.number().default(0),
  "rooms.bathroomCount": z.coerce.number().default(0),
  "rooms.toiletCount": z.coerce.number().default(0),
  stories: z.coerce.number().default(0),
  features: z
    .union([z.string(), z.array(z.enum([FEATURES_ENUM[0], ...FEATURES_ENUM])).default([])])
    .transform((value) => (typeof value === "string" ? value.split(",").filter(Boolean).map(String) : value)),
  "energy.energyLabel": z.enum([ENERGY_LABELS_ENUM[0], ...ENERGY_LABELS_ENUM]),
  "energy.insulation": z
    .union([z.string(), z.array(z.enum([INSULATION_ENUM[0], ...INSULATION_ENUM])).default([])])
    .transform((value) => (typeof value === "string" ? value.split(",").filter(Boolean).map(String) : value)),
  "energy.heating": z.string(),
  "energy.waterHeating": z.string(),
  "energy.CV": z.string(),
  ownership: z.string().min(1),
  // userId: z.string(),
});

export const listingUpdateSchema = z.object({
  ...listingCreateSchema.shape,
  _id: z.string().min(1),
});

const ListingSchema = new mongoose.Schema<ListingDoc>(
  {
    title: {
      type: String,
      required: [true, "Geef een titel op voor deze woning"],
    },
    streetName: {
      type: String,
      required: [true, "Geef een straatnaam op voor deze woning"],
    },
    streetNumber: {
      type: String,
      required: [true, "Geef een huisnummer op voor deze woning"],
    },
    postalCode: {
      type: String,
      required: [true, "Geef een postcode op voor deze woning"],
      validate: {
        validator: function (value: string) {
          return postalCodeRegex.test(value);
        },
        message: "De postcode moet het formaat 1234AB hebben",
      },
    },
    city: {
      type: String,
      required: [true, "Geef een stad op voor deze woning"],
    },
    district: {
      type: String,
      required: [true, "Geef een wijk op voor deze woning"],
    },
    type: {
      type: String,
      required: [true, "Geef een type op voor deze woning"],
      default: LISTING_TYPES_ENUM.house,
      enum: {
        values: TYPES_ENUM,
        message: '"{VALUE}" is geen geldig type woning',
      },
    },
    description: {
      type: String,
      required: [true, "Geef een beschrijving op voor deze woning"],
      maxlength: [MAX_DESCRIPTION_LENGTH, "De beschrijving mag niet langer zijn dan 500 tekens"],
    },
    askingPrice: {
      type: Number,
      required: [true, "Geef een vraagprijs op voor deze woning"],
    },
    yearBuilt: {
      type: Number,
      required: [true, "Geef een bouwjaar op voor deze woning"],
      validate: {
        validator: function (value: number) {
          return value >= 1800 && value <= new Date().getFullYear();
        },
        message: "Het bouwjaar moet tussen 1800 en het huidige jaar liggen",
      },
    },
    roofType: {
      type: String,
      required: [true, "Geef een daktype op voor deze woning"],
    },
    measurements: {
      squareMetersTotal: {
        type: Number,
        required: [true, "Geef het aantal vierkante meters op voor deze woning"],
        validate: {
          validator: function (value: number) {
            return value > 0;
          },
          message: "Het aantal vierkante meters moet groter zijn dan 0",
        },
      },
      squareMetersLiving: {
        type: Number,
        required: [true, "Geef het aantal vierkante meters op voor deze woning"],
        default: 0,
      },
      squareMetersOther: {
        type: Number,
        required: [true, "Geef het aantal vierkante meters op voor deze woning"],
        default: 0,
      },
      squareMetersOutdoor: {
        type: Number,
        required: [true, "Geef het aantal vierkante meters op voor deze woning"],
        default: 0,
      },
      squareMetersProperty: {
        type: Number,
        required: [true, "Geef het aantal vierkante meters op voor deze woning"],
        default: 0,
      },
      cubicMetersVolume: {
        type: Number,
        required: [true, "Geef het aantal kubieke meters op voor deze woning"],
        validate: {
          validator: function (value: number) {
            return value > 0;
          },
          message: "Het aantal kubieke meters moet groter zijn dan 0",
        },
      },
    },
    rooms: {
      roomCount: {
        type: Number,
        required: [true, "Geef een aantal kamers op voor deze woning"],
        validate: {
          validator: function (value: number) {
            return value > 0;
          },
          message: "Het aantal kamers moet groter zijn dan 0",
        },
      },
      bedRoomCount: {
        type: Number,
        required: [true, "Geef een aantal slaapkamers op voor deze woning"],
        default: 0,
      },
      bathroomCount: {
        type: Number,
        required: [true, "Geef een aantal badkamers op voor deze woning"],
        default: 0,
      },
      toiletCount: {
        type: Number,
        required: [true, "Geef een aantal toiletten op voor deze woning"],
        default: 0,
      },
    },
    stories: {
      type: Number,
      required: [true, "Geef een aantal verdiepingen op voor deze woning"],
      default: 0,
    },
    features: {
      type: [String],
      enum: {
        values: FEATURES_ENUM,
        message: '"{VALUE}" is geen geldige feature',
      },
      default: [],
    },
    energy: {
      energyLabel: {
        type: String,
        enum: {
          values: ENERGY_LABELS_ENUM,
          message: '"{VALUE}" is geen geldig energielabel',
        },
      },
      insulation: {
        type: [String],
        enum: {
          values: INSULATION_ENUM,
          message: '"{VALUE}" is geen geldige isolatie',
        },
        default: [],
      },
      heating: {
        type: String,
      },
      waterHeating: {
        type: String,
      },
      CV: {
        type: String,
      },
    },
    ownership: {
      type: String,
      required: [true, "Geef een eigendomstype op voor deze woning"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export default mongoose.models?.Listing || mongoose.model<ListingDoc>("Listing", ListingSchema);

import { UserDoc } from "./User.type";

export const LISTING_TYPES = {
  standalone: "Standalone",
  flat: "Flat",
  apartment: "Apartment",
  house: "House",
  boat: "Boat",
};

export enum LISTING_TYPES_ENUM {
  standalone = "standalone",
  flat = "flat",
  apartment = "apartment",
  house = "house",
  boat = "boat",
}

export interface ListingDoc {
  _id: string;
  title: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  district: string;
  type: LISTING_TYPES_ENUM;
  askingPrice: number;
  yearBuilt: number;
  squareMeters: number;
  description: string;
  userId: UserDoc;
}

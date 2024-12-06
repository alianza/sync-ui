import { UserDoc } from "./User.type";

export const LISTING_TYPES = {
  standalone: "Standalone",
  flat: "Flat",
  apartment: "Apartment",
  house: "House",
  boat: "Boat",
};

export interface IListing {
  _id: string;
  title: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  district: string;
  type: string;
  askingPrice: number;
  yearBuilt: number;
  squareMeters: number;
  description: string;
  userId: UserDoc;
}

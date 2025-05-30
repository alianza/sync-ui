import { UserDoc, UserObj } from "./User.type";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export const LISTING_TYPES = {
  standalone: "Alleenstaand",
  flat: "Flat",
  apartment: "Appartement",
  house: "Huis",
  boat: "Boot",
};

export const ENERGY_LABELS = {
  a_plus_plus: "A++",
  a_plus: "A+",
  a: "A",
  b: "B",
  c: "C",
  d: "D",
  e: "E",
  f: "F",
  g: "G",
};

export const FEATURES = {
  skylight: "Dakraam",
  fiber: "Glasvezelkabel",
  naturalVentilation: "Natuurlijke ventilatie",
  chimney: "Rookkanaal",
  TV: "TV kabel",
  solarPanels: "Zonnepanelen",
};

export const INSULATION = {
  roofInsulation: "Dakisolatie",
  doubleGlazing: "Dubbel glas",
  muurIsolation: "Muurisolatie",
};

export const STATUS = {
  draft: "Concept",
  available: "Beschikbaar",
  offer_received: "Aanbod ontvangen",
  under_option: "Onder optie",
  reserved: "Gereserveerd",
  sale_pending_conditions: "Verkoop onder voorwaarden",
  sold: "Verkocht",
};

export const STATUS_COLOR = {
  draft: "bg-gray-500",
  available: "bg-green-500",
  offer_received: "bg-yellow-500",
  under_option: "bg-blue-500",
  reserved: "bg-orange-500",
  sale_pending_conditions: "bg-purple-500",
  sold: "bg-red-500",
};

export const STATUS_TEXT = {
  draft: "De woning is nog niet gepubliceerd.",
  available: "De woning is beschikbaar voor verkoop.",
  offer_received: "Er is een bod gedaan op de woning.",
  under_option: "De woning is onder optie.",
  reserved: "De woning is gereserveerd.",
  sale_pending_conditions: "De verkoop is onder voorwaarden.",
  sold: "De woning is verkocht.",
};

interface Listing {
  title: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  district: string;
  type: keyof typeof LISTING_TYPES;
  description: string;
  askingPrice: number;
  yearBuilt: number;
  roofType: string;
  measurements: {
    squareMetersTotal: number;
    squareMetersLiving: number;
    squareMetersOther: number;
    squareMetersOutdoor: number;
    squareMetersProperty: number;
    cubicMetersVolume: number;
  };
  rooms: {
    roomCount: number;
    bedRoomCount: number;
    bathroomCount: number;
    toiletCount: number;
  };
  stories: number;
  features: string[];
  energy: {
    energyLabel: string;
    insulation: (keyof typeof LISTING_TYPES)[];
    heating: string;
    waterHeating: string;
    CV: string;
  };
  ownership: string;
  status: keyof typeof STATUS;
  userId: UserDoc;
}

export interface ListingDoc extends Listing, mongoose.Document {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListingObj extends Omit<Listing, "userId"> {
  _id: string;
  userId: UserObj;
  createdAt: Date;
  updatedAt: Date;
}

import { UserDoc, UserObj } from "./User.type";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

// todo: Remove the need for this duplication
// consts are to get key value pairs from for instance for select options
// enums are to get the ability to use TYPES.key in the code and to get the value from the key

export const LISTING_TYPES = {
  standalone: "Alleenstaand",
  flat: "Flat",
  apartment: "Appartement",
  house: "Huis",
  boat: "Boot",
};

export enum LISTING_TYPES_ENUM {
  standalone = "standalone",
  flat = "flat",
  apartment = "apartment",
  house = "house",
  boat = "boat",
}

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

export enum ENERGY_LABELS_ENUM {
  a_plus_plus = "A++",
  a_plus = "A+",
  a = "A",
  b = "B",
  c = "C",
  d = "D",
  e = "E",
  f = "F",
  g = "G",
}

export const FEATURES = {
  skylight: "Dakraam",
  fiber: "Glasvezelkabel",
  naturalVentilation: "Natuurlijke ventilatie",
  chimney: "Rookkanaal",
  TV: "TV kabel",
  solarPanels: "Zonnepanelen",
};

export enum FEATURES_ENUM {
  skylight = "skylight",
  fiber = "fiber",
  naturalVentilation = "naturalVentilation",
  chimney = "chimney",
  TV = "TV",
  solarPanels = "solarPanels",
}

export const INSULATION = {
  roofInsulation: "Dakisolatie",
  doubleGlazing: "Dubbel glas",
  muurIsolation: "Muurisolatie",
};

export enum INSULATION_ENUM {
  roofInsulation = "roofInsulation",
  doubleGlazing = "doubleGlazing",
  muurIsolation = "muurIsolation",
}

interface Listing {
  title: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  district: string;
  type: LISTING_TYPES_ENUM;
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
    insulation: INSULATION_ENUM[];
    heating: string;
    waterHeating: string;
    CV: string;
  };
  ownership: string;
  userId: UserDoc;
}

export interface ListingDoc extends Listing, mongoose.Document {
  _id: ObjectId;
}

export interface ListingObj extends Omit<Listing, "userId"> {
  _id: string;
  userId: UserObj;
}

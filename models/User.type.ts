export interface UserDoc {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  verified: boolean;
  clients?: string[];
  __v?: number;
}

export enum Roles {
  Realtor = "realtor",
  Buyer = "buyer",
  Admin = "admin",
}

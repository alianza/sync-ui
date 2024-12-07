export interface UserDoc {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  verified: boolean;
  clients?: string[];
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}

export enum Roles {
  realtor = "realtor",
  buyer = "buyer",
  admin = "admin",
}

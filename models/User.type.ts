export interface UserDoc {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: string;
  verified: boolean;
  clients?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export enum ROLES {
  REALTOR = "realtor",
  BUYER = "buyer",
  ADMIN = "admin",
}

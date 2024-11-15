export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export enum Roles {
  Realtor = "realtor",
  Buyer = "buyer",
}

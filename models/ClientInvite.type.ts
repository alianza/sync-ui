import { UserDoc } from "./User.type";

export enum STATUS_ENUM {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

export interface ClientInviteDoc {
  inviteeEmail: string;
  message?: string;
  inviter: UserDoc;
  status: STATUS_ENUM;
  createdAt: Date;
  updatedAt: Date;
}

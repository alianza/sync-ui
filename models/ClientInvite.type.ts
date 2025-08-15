import { UserType } from "@/models/User";

export enum STATUS_ENUM {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

export interface ClientInviteDoc {
  inviteeEmail: string;
  message?: string;
  inviter: UserType;
  status: STATUS_ENUM;
  acceptedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

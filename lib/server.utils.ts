import { HydratedDocument } from "mongoose";
import { ResponseStatus, ServerResponse } from "@/lib/types";
import { ZodError, ZodIssue } from "zod";
import { capitalize } from "@/lib/common.utils";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ROLES } from "@/models/User.type";
import { Session } from "next-auth";

import "server-only";

export function serializeDoc<T>(doc: HydratedDocument<T> | HydratedDocument<T>[] | null): T | T[] {
  if (!doc) {
    return doc as T;
  }

  if (Array.isArray(doc)) {
    return doc.map((item) => item.toObject({ flattenObjectIds: true })) as T[];
  }

  return doc.toObject({ flattenObjectIds: true }) as T;
}

/**
 * Success response with message and data
 * @param message
 * @param data
 */
export const successResponse = <T>({ message, data }: { message?: string; data?: T }): ServerResponse<T> => ({
  status: ResponseStatus.success,
  message,
  data,
});

/**
 * Fail response with message and data
 * @param message
 * @param data
 */
export const failResponse = <T>({ message, data }: { message?: string; data?: T }): ServerResponse<T> => ({
  status: ResponseStatus.fail,
  message,
  data,
});

/**
 * Error response with message
 * @param message
 */
export const errorResponse = <T>(message: T): ServerResponse<undefined> => ({
  status: ResponseStatus.error,
  message: String(message),
});

export const isMongooseDuplicateKeyError = (error: unknown) => {
  return typeof error === "object" && error !== null && "code" in error && error.code === 11000;
};

const formatZodIssue = (issue: ZodIssue): string => {
  const { path, message } = issue;
  const pathString = path.join(".");

  return `${capitalize(pathString)}: ${message}`;
};

// Format the Zod error message with only the current error
export const formatZodError = (error: ZodError) => {
  const { issues } = error;

  const errors = [];

  for (const currentIssue of issues) {
    errors.push(formatZodIssue(currentIssue));
  }

  return errors.join(", ");
};

export async function authGuard({
  realtorOnly,
  buyerOnly,
  adminOnly,
  redirectTo = "/login",
}: { realtorOnly?: boolean; buyerOnly?: boolean; adminOnly?: boolean; redirectTo?: string } = {}) {
  const session = await auth();
  if (!session || !session.user) redirect(redirectTo);

  // check roles
  if (realtorOnly && session.user.role !== ROLES.REALTOR) redirect("/dashboard");
  if (buyerOnly && session.user.role !== ROLES.BUYER) redirect("/dashboard");
  if (adminOnly && session.user.role !== ROLES.ADMIN) redirect("/dashboard");

  return session;
}

export const actionAuthGuard = async (
  session?: Session | null,
  { realtorOnly, buyerOnly, adminOnly }: { realtorOnly?: boolean; buyerOnly?: boolean; adminOnly?: boolean } = {},
) => {
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  // check roles
  if (realtorOnly && session.user.role !== ROLES.REALTOR) throw new Error("Unauthorized");
  if (buyerOnly && session.user.role !== ROLES.BUYER) throw new Error("Unauthorized");
  if (adminOnly && session.user.role !== ROLES.ADMIN) throw new Error("Unauthorized");

  return session;
};

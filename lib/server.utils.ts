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

type ResponseProps<T> = {
  message?: string;
  data?: T;
  statusCode?: number; // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
};

/**
 * Success response with message and data
 * @param message default ""
 * @param data default undefined
 * @param statusCode default 200
 */
export const successResponse = <T>({ message, data, statusCode = 200 }: ResponseProps<T>): ServerResponse<T> => ({
  status: ResponseStatus.success,
  statusCode,
  message,
  data,
});
/**
 * Fail response with message and data
 * @param message
 * @param data
 * @param statusCode default 400
 */
export const failResponse = <T>({ message, data, statusCode = 400 }: ResponseProps<T>): ServerResponse<T> => ({
  status: ResponseStatus.fail,
  message,
  data,
  statusCode,
});

/**
 * Error response with message and data
 * @param message
 * @param data
 * @param statusCode default 500
 */
export const errorResponse = <T>({ message, statusCode = 500 }: ResponseProps<T>): ServerResponse<T> => ({
  status: ResponseStatus.error,
  message,
  statusCode,
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
export const formatZodError = (error: ZodError, options: { messageOnly?: boolean } = {}) => {
  const defaultOptions = { messageOnly: false };
  options = { ...defaultOptions, ...options };

  const { issues } = error;

  const errors = [];

  for (const currentIssue of issues) {
    if (options.messageOnly) {
      errors.push(currentIssue.message);
      continue;
    }
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
  {
    realtorOnly,
    buyerOnly,
    adminOnly,
    roles,
  }: {
    realtorOnly?: boolean;
    buyerOnly?: boolean;
    adminOnly?: boolean;
    roles?: ROLES[];
  } = {},
): Promise<{ success: true; session: Session } | { success: false }> => {
  if (!session || !session.user) return { success: false };

  if (realtorOnly && session.user.role !== ROLES.REALTOR) return { success: false };
  if (buyerOnly && session.user.role !== ROLES.BUYER) return { success: false };
  if (adminOnly && session.user.role !== ROLES.ADMIN) return { success: false };
  if (roles && !roles.includes(session.user.role)) return { success: false };

  return { success: true, session };
};

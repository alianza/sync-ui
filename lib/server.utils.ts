import { HydratedDocument, MongooseError } from "mongoose";
import { ResponseStatus } from "@/lib/types";

export function serializeDoc<T>(doc: HydratedDocument<T> | HydratedDocument<T>[]): T | T[] {
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
export const successResponse = <T>({ message, data }: { message?: string; data?: T }) => ({
  status: ResponseStatus.success,
  message,
  data,
});

/**
 * Fail response with message and data
 * @param message
 * @param data
 */
export const failResponse = <T>({ message, data }: { message?: string; data?: T }) => ({
  status: ResponseStatus.fail,
  message,
  data,
});

/**
 * Error response with message
 * @param message
 */
export const errorResponse = <T>(message: T) => ({ status: ResponseStatus.error, message: String(message) });

export const isMongooseDuplicateKeyError = (error: unknown) => {
  return typeof error === "object" && error !== null && "code" in error && error.code === 11000;
};

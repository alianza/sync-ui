import { HydratedDocument } from "mongoose";

export function serialize<T>(doc: HydratedDocument<T> | HydratedDocument<T>[]): T | T[] {
  if (Array.isArray(doc)) {
    return doc.map((item) => item.toObject({ flattenObjectIds: true })) as T[];
  }

  return doc.toObject({ flattenObjectIds: true }) as T;
}

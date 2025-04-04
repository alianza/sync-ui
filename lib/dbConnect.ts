import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

import "server-only";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
let cached = global.mongoose;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) {
    console.log("Using cached database connection 👌");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Creating new database connection 😢");
    if (!MONGODB_URI) {
      throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
    }
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false }).then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;

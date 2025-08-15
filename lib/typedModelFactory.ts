import {
  Document,
  FilterQuery,
  InferSchemaType,
  model,
  Model,
  models,
  SaveOptions,
  Schema,
  UpdateQuery
} from "mongoose";

/**
 * LeanDoc<T> strips away Mongoose's Document properties
 * to give you a plain JS object type
 */
type LeanDoc<T> = T extends Document ? Omit<T, keyof Document> : T; // noinspection JSUnusedLocalSymbols

/**
 * TypedModel<T> overrides Mongoose's query methods to ensure:
 *  - Filters are always type-checked (FilterQuery<T>)
 *  - Return values are strongly typed
 *  - .lean() returns plain inferred objects
 */
export type TypedModel<T> = Model<T> & {
  // ---------- READ ----------
  find(filter?: FilterQuery<T>): Promise<(T & Document)[]>;
  findOne(filter: FilterQuery<T>): Promise<(T & Document) | null>;
  findById(id: string): Promise<(T & Document) | null>;

  // ---------- WRITE ----------
  create(doc: T, options?: SaveOptions): Promise<T & Document>;
  insertMany(docs: T[], options?: { ordered?: boolean }): Promise<(T & Document)[]>;
  updateOne(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
  ): Promise<{ acknowledged: boolean; modifiedCount: number; upsertedCount: number; matchedCount: number }>;
  updateMany(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
  ): Promise<{ acknowledged: boolean; modifiedCount: number; upsertedCount: number; matchedCount: number }>;
  findOneAndUpdate(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    options?: { new?: boolean },
  ): Promise<(T & Document) | null>;
  replaceOne(
    filter: FilterQuery<T>,
    replacement: T,
  ): Promise<{ acknowledged: boolean; modifiedCount: number; upsertedCount: number; matchedCount: number }>;

  // ---------- DELETE ----------
  deleteOne(filter: FilterQuery<T>): Promise<{ acknowledged: boolean; deletedCount: number }>;
  deleteMany(filter: FilterQuery<T>): Promise<{ acknowledged: boolean; deletedCount: number }>;
  findOneAndDelete(filter: FilterQuery<T>): Promise<(T & Document) | null>;
};

/**
 * Create a type-safe model from a schema.
 * This uses InferSchemaType so the schema is the single source of truth.
 */
export function createModel<TSchema extends Schema>(name: string, schema: TSchema) {
  if (models[name]) return models[name] as TypedModel<InferSchemaType<TSchema>>; // Check if model already exists, if so return it
  type DocType = InferSchemaType<TSchema>; // Ensure _id is always a string for consistency
  return model<DocType>(name, schema) as TypedModel<DocType>;
}

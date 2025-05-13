"use server";

import "server-only";
import { z } from "zod";
import { errorResponse, failResponse, formatZodError, successResponse } from "./server.utils";
import { del, list, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function uploadListingFile(formData: FormData, listingId: string) {
  const maxFileSize = parseFloat(process.env.NEXT_PUBLIC_BLOB_MAX_FILE_SIZE || "4.5") * 1024 * 1024; // 4.5MB
  const uploadFileSchema = z.object({
    file: z.instanceof(File).refine((file) => file.size <= maxFileSize, {
      message: `Bestand is te groot. Maximaal ${process.env.NEXT_PUBLIC_BLOB_MAX_FILE_SIZE || "4.5"}MB toegestaan.`,
    }),
  });

  const parsedUploadFileSchema = uploadFileSchema.safeParse(Object.fromEntries(formData));

  if (!parsedUploadFileSchema.success)
    return failResponse({ message: formatZodError(parsedUploadFileSchema.error, { messageOnly: true }) });

  const { file } = parsedUploadFileSchema.data;

  if (file.size === 0) return errorResponse({ message: "Bestand is vereist." });

  if (!file) return errorResponse({ message: "Geen afbeelding geselecteerd." });

  const isImage = file.type.startsWith("image/");
  const folderName = isImage ? "images" : "documents";
  const fileTypeName = isImage ? "Afbeelding" : "Document";

  const files = await list({ prefix: `listingMedia/${listingId}/${folderName}/` });

  if (files.blobs.some((doc) => doc.pathname.endsWith(file.name)))
    return errorResponse({ message: `${fileTypeName} met deze naam bestaat al.` });

  if (files.blobs.length >= 10)
    return errorResponse({ message: `Maximaal 10 ${fileTypeName.toLowerCase()}en toegestaan.` });

  const allowedFileTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation"] // prettier-ignore

  if (!isImage && !allowedFileTypes.includes(file.type))
    return errorResponse({ message: `Alleen ${fileTypeName.toLowerCase()}en zijn toegestaan.` });

  try {
    await put(`listingMedia/${listingId}/${folderName}/${file.name}`, file, { access: "public" });
  } catch {
    return errorResponse({ message: `Fout bij het uploaden van de afbeelding` });
  }

  revalidatePath(`/dashboard/listings/${listingId}`);
  return successResponse({ message: `${fileTypeName} succesvol geüpload.` });
}

export async function deleteListingFile(formData: FormData, listingId: string) {
  const deleteFileSchema = z
    .object({
      entity: z
        .enum(["image", "document"], { errorMap: () => ({ message: "Ongeldige bestands type." }) })
        .default("image"),
      url: z.string().url({ message: "Ongeldige bestands URL." }),
    })
    .required();
  const parsedDeleteFileSchema = deleteFileSchema.safeParse(Object.fromEntries(formData));

  if (!parsedDeleteFileSchema.success)
    return failResponse({ message: formatZodError(parsedDeleteFileSchema.error, { messageOnly: true }) });

  const { entity, url } = parsedDeleteFileSchema.data;

  try {
    await del(url);
  } catch (error) {
    return errorResponse({ message: `Fout bij verwijderen ${entity === "image" ? "afbeelding" : "document"}.` });
  }

  revalidatePath(`/dashboard/listings/${listingId}`);
  return successResponse({ message: `${entity === "image" ? "Afbeelding" : "Document"} succesvol verwijderd.` });
}

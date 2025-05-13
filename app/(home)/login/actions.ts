"use server";

import { signIn, signOut } from "@/auth";
import { failResponse, formatZodError, successResponse } from "@/lib/server.utils";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import z from "zod";

export async function signInAction(prevState: unknown, formData: FormData) {
  const signInSchema = z.object({ email: z.string().email(), password: z.string().min(8) });

  const parsedSignInSchema = signInSchema.safeParse(Object.fromEntries(formData));
  if (!parsedSignInSchema.success)
    return failResponse({ message: formatZodError(parsedSignInSchema.error, { messageOnly: true }) });

  const { email, password } = parsedSignInSchema.data;

  try {
    await signIn("credentials", { email, password, redirectTo: "/dashboard" });
    return successResponse({ message: "Succesvol ingelogd!" });
  } catch (error) {
    if (isRedirectError(error)) throw error; // Fix for Next.js redirect error
    return failResponse({ message: "Inloggen mislukt. Controleer je e-mailadres en wachtwoord." });
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: "/login" });
  return successResponse({ message: "Succesvol uitgelogd!" });
}

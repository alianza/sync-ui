"use server";

import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { failResponse, successResponse } from "@/lib/server.utils";

export async function signInAction(prevState: unknown, formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    await signIn("credentials", { email, password, redirectTo: "/" });
    return successResponse({ message: "Successfully logged in!" });
  } catch (error) {
    console.log("error", error);
    if (isRedirectError(error)) {
      throw error;
    }
    return failResponse({ message: "Invalid credentials. Please try again!" });
  }
}

export async function signOutAction() {
  await signOut();
  return successResponse({ message: "Successfully logged out!" });
}

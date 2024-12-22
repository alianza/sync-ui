"use server";

import { signIn, signOut } from "@/auth";
import { failResponse, successResponse } from "@/lib/server.utils";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function signInAction(prevState: unknown, formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    await signIn("credentials", { email, password, redirectTo: "/dashboard" });
    return successResponse({ message: "Successfully logged in!" });
  } catch (error) {
    // console.log("error", error);
    if (isRedirectError(error)) {
      throw error;
    }
    return failResponse({ message: "Invalid credentials. Please try again!" });
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: "/login" });
  return successResponse({ message: "Successfully logged out!" });
}

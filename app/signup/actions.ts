"use server";

import { errorResponse, failResponse, serializeDoc, successResponse } from "@/lib/server.utils";
import User, { Roles } from "@/models/User";
import { saltAndHashPassword } from "@/auth";
import z from "zod";
import dbConnect from "@/lib/dbConnect";
import { redirect } from "next/navigation";
import { MongooseError } from "mongoose";

const registerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export async function SignUpAction(prevState: unknown, formData: FormData) {
  try {
    const { firstName, lastName, email, password, confirmPassword } = registerSchema.parse(
      Object.fromEntries(formData),
    );

    console.log(`Object.fromEntries(formData)`, Object.fromEntries(formData));

    if (password !== confirmPassword) return failResponse({ message: "Passwords do not match" });

    const hashedPassword = await saltAndHashPassword(password);

    await dbConnect();
    const user = await User.create({ firstName, lastName, email, password: hashedPassword, role: Roles.Realtor });
    // return successResponse({ message: "Successfully signed up!", data: serializeDoc(user) });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return failResponse({ message: "Invalid form data", data: error.flatten() });
    }

    if (typeof error === "object" && error !== null && "code" in error && error.code === 11000) {
      return failResponse({ message: "This email is already in use, please log in" }); // duplicate key error
    }

    return errorResponse(error);
  }

  return redirect("/login?signup=true");
}

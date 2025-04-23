"use server";

import {
  errorResponse,
  failResponse,
  formatZodError,
  isMongooseDuplicateKeyError,
  serializeDoc,
  successResponse,
} from "@/lib/server.utils";
import User from "@/models/User";
import { ROLES } from "@/models/User.type";
import { saltAndHashPassword } from "@/auth";
import z from "zod";
import dbConnect from "@/lib/dbConnect";

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

    if (password !== confirmPassword) return failResponse({ message: "Passwords do not match" });

    const hashedPassword = await saltAndHashPassword(password);

    await dbConnect();
    const user = await User.create({ firstName, lastName, email, password: hashedPassword, role: ROLES.REALTOR });
    return successResponse({ message: "Successfully signed up!", data: serializeDoc(user) });
  } catch (error) {
    if (error instanceof z.ZodError) return failResponse({ message: formatZodError(error) });

    if (isMongooseDuplicateKeyError(error)) {
      return failResponse({ message: "This email is already in use, please log in" });
    }

    return errorResponse({ message: error?.toString() });
  }
}

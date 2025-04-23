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
  const parsedRegisterSchema = registerSchema.safeParse(Object.fromEntries(formData));

  if (!parsedRegisterSchema.success)
    return errorResponse({ message: formatZodError(parsedRegisterSchema.error, { messageOnly: true }) });

  const { firstName, lastName, email, password, confirmPassword } = parsedRegisterSchema.data;

  if (password !== confirmPassword) return failResponse({ message: "Passwords do not match" });

  const hashedPassword = await saltAndHashPassword(password);

  try {
    await dbConnect();
    const user = await User.create({ firstName, lastName, email, password: hashedPassword, role: ROLES.REALTOR });
    return successResponse({ message: "Successfully signed up!", data: serializeDoc(user) });
  } catch (error) {
    if (isMongooseDuplicateKeyError(error)) {
      return errorResponse({ message: "This email is already in use, please log in" });
    }

    return errorResponse({ message: error?.toString() });
  }
}

"use server";

import { failResponse, formatZodError, successResponse } from "@/lib/server.utils";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import z from "zod";
import { Resend } from "resend";
import { forgotPasswordTemplate } from "@/lib/emailTemplates";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { UserDoc } from "@/models/User.type";
import bcryptjs from "bcryptjs";
import PasswordResetLink, { passwordResetLinkCreateSchema } from "@/models/PasswordResetLink";
import { headers } from "next/headers";
import { PASSWORD_RESET_LINK_EXPIRES_MS } from "@/lib/constants";
import { PasswordResetLinkDoc } from "@/models/PasswordResetLink.type";

const sendPasswordResetEmail = async (baseUrl: string, email: string, token: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY || "");
  const result = await resend.emails.send({
    from: "wachtwoord-reset@resend.dev",
    to: email,
    subject: "Reset je wachtwoord - SyncIU",
    html: forgotPasswordTemplate(`${baseUrl}/reset-password?token=${encodeURIComponent(token)}`),
  });
  if (result.error) {
    console.error("Error sending email:", result.error);
    return failResponse({
      message: "Er is een fout opgetreden bij het versturen van de link. Probeer het later opnieuw.",
    });
  }
  return successResponse({ message: "Link verstuurd!" });
};

export async function forgotPasswordAction(prevState: unknown, formData: FormData) {
  const signInSchema = z.object({ email: z.string().email() });

  const parsedSignInSchema = signInSchema.safeParse(Object.fromEntries(formData));
  if (!parsedSignInSchema.success)
    return failResponse({ message: formatZodError(parsedSignInSchema.error, { messageOnly: true }) });

  const { email } = parsedSignInSchema.data;

  try {
    await dbConnect();
    const user = await User.findOne<UserDoc>({ email });
    if (!user)
      return failResponse({
        message: "Er bestaat geen gebruiker met dit e-mailadres. Check je e-mail adres en probeer het opnieuw.",
      });
    const parsedPasswordResetLinkCreateSchema = passwordResetLinkCreateSchema.safeParse({
      user: user._id.toString(),
      token: bcryptjs.hashSync(user.email + Date.now().toString(), 10), // Generate a unique token
    });

    if (!parsedPasswordResetLinkCreateSchema.success)
      return failResponse({
        message: formatZodError(parsedPasswordResetLinkCreateSchema.error, { messageOnly: true }),
      });

    const resetLinkData = parsedPasswordResetLinkCreateSchema.data;

    const existingLink = await PasswordResetLink.findOne<PasswordResetLinkDoc>({
      user: resetLinkData.user,
      consumedAt: null,
      createdAt: { $gte: new Date(Date.now() - PASSWORD_RESET_LINK_EXPIRES_MS) },
    });

    const headersList = await headers();
    const baseUrl = headersList.get("origin") || process.env.VERCEL_URL || "http://localhost:3000";

    if (existingLink) {
      sendPasswordResetEmail(baseUrl, user.email, existingLink.token);
      return successResponse({ message: "Link verstuurd!" });
    }

    await PasswordResetLink.create({ user: resetLinkData.user, token: resetLinkData.token });

    return await sendPasswordResetEmail(baseUrl, user.email, resetLinkData.token);
  } catch (error) {
    if (isRedirectError(error)) throw error; // Fix for Next.js redirect error
    return failResponse({
      message: "Er is een fout opgetreden bij het versturen van de link. Probeer het later opnieuw.",
    });
  }
}

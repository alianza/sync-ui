import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import ForgotPasswordForm from "@/components/forms/ForgetPasswordForm";

export default function ForgotPassword() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Wachtwoord vergeten</CardTitle>
          <CardDescription className="text-center">
            Voer het e-mailadres in dat aan uw account is gekoppeld. We sturen u een link om uw wachtwoord opnieuw in te
            stellen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="text-center text-sm">
            Terug naar{" "}
            <Link href="/login" className="underline-hover text-primary">
              Inloggen
            </Link>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}

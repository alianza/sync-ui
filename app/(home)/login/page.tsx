import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/components/forms/LoginForm";
import Link from "next/link";
import React from "react";

export default function Login() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Login bij HuizenHub</CardTitle>
          <CardDescription className="text-center">
            Voer uw e-mailadres en wachtwoord in om toegang te krijgen tot uw account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="text-center text-sm">
            <Link href="/forgot-password" className="underline-hover text-primary">
              Wachtwoord vergeten?
            </Link>
          </div>
          <div className="text-center text-sm">
            Geen account?{" "}
            <Link href="/signup" className="underline-hover text-primary">
              Aanmelden
            </Link>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}

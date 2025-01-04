import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/components/forms/LoginForm";
import Link from "next/link";
import React from "react";

export function LoginPage() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Login to HuizenHub</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="text-center text-sm">
            <Link href="/forgot-password" className="underline-hover text-primary">
              Forgot your password?
            </Link>
          </div>
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="underline-hover text-primary">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}

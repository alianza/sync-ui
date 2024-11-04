import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import LoginForm from "@/components/forms/LoginForm";

export function LoginComponent() {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold">Login to HuizenHub</CardTitle>
        <CardDescription className="text-center">Enter your email and password to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
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
  );
}

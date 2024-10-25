"use client";

import React, { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { login } from "@/app/login/actions";
import Form from "next/form";

const initialState = {
  message: "",
};

export default function LoginComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, action] = useActionState(login, initialState);

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold">Login to HuizenHub</CardTitle>
        <CardDescription className="text-center">Enter your email and password to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form action={action}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="m.example@huizenhub.nl"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoCapitalize="none"
                  autoComplete="current-password"
                  autoCorrect="off"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4 text-background" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-background" />
                  )}
                </Button>
              </div>
            </div>
            <SubmitButton />
          </div>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm">
          <Link href="/forgot-password" className="underline-hover text-primary">
            Forgot your password?
          </Link>
        </div>
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link href="/register" className="underline-hover text-primary">
            Sign up
          </Link>
        </div>
        {state?.message && <p className="text-sm text-neutral-700">{state.message}</p>}
      </CardFooter>
    </Card>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Logging in..." : "Log in"}
    </Button>
  );
}

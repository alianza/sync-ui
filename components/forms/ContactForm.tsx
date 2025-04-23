"use client";

import React, { useActionState } from "react";
import { createContact } from "@/app/(home)/contact/actions";
import { initialActionState, ResponseStatus } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/forms/input/Input";

import { cn } from "@/lib/client.utils";

export function ContactForm() {
  const [state, action] = useActionState(createContact, initialActionState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send us a message</CardTitle>
        <CardDescription>We'll get back to you as soon as possible.</CardDescription>
      </CardHeader>
      <form action={action}>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Input id="name" label="Name" placeholder="Enter your name" required />
            <Input label="Email" id="email" placeholder="Enter your email" type="email" autoComplete="email" required />
            <Input id="message" label="Message" type="multiline" placeholder="Enter your message" required />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between gap-4">
          <SubmitButton label="Send message" loadingLabel="Sending message..." />
          {state?.message && (
            <p className={cn("text-sm", state.status !== ResponseStatus.success ? "text-red-800" : "text-neutral-700")}>
              {state.message}
            </p>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}

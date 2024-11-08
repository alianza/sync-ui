"use client";

import React, { useActionState } from "react";
import { createContact } from "@/app/(home)/contact/actions";
import { initialActionState } from "@/lib/types";
import Form from "next/form";
import { CardContent, CardFooter } from "@/components/ui/card";
import { SubmitButton } from "@/components/SubmitButton";
import { FormInput } from "@/components/forms/input/FormInput";

export function ContactForm() {
  const [state, action] = useActionState(createContact, initialActionState);

  return (
    <Form action={action}>
      <CardContent>
        <div className="flex flex-col gap-4">
          <FormInput id="name" label="Name" placeholder={"Enter your name"} required />
          <FormInput
            label="Email"
            id="email"
            placeholder="Enter your email"
            type="email"
            autoComplete="email"
            required
          />
          <FormInput id="message" label="Message" type="multiline" placeholder="Enter your message" required />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-4">
        <SubmitButton label="Send message..." />
        {state?.message && <p className="text-sm text-neutral-700">{state.message}</p>}
      </CardFooter>
    </Form>
  );
}

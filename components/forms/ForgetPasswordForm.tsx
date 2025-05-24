"use client";

import { initialActionState, ResponseStatus } from "@/lib/types";
import React, { useActionState } from "react";
import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/forms/input/Input";
import { handleAction } from "@/lib/client.utils";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { forgotPasswordAction } from "@/app/(home)/forgot-password/actions";

export default function ForgotPasswordForm() {
  const [state, action] = useActionState(forgotPasswordAction, initialActionState);
  const { data: session } = useSession();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => handleAction(e, action);

  if (session) redirect("/dashboard");

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <Input
          label="Email"
          id="email"
          name="email"
          placeholder="m.example@huizenhub.nl"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          required
        />
        <SubmitButton label="Verstuur link" loadingLabel="Versturen..." />
        {state.status !== ResponseStatus.pending && <p className="text-muted-foreground text-sm">{state.message}</p>}
      </div>
    </form>
  );
}

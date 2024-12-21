"use client";

import { initialActionState, ResponseStatus } from "@/lib/types";
import React, { useActionState } from "react";
import { signInAction } from "@/app/(home)/login/actions";
import { SubmitButton } from "@/components/SubmitButton";
import { FormInput } from "@/components/forms/input/FormInput";
import { PasswordInputToggle } from "@/components/forms/input/PasswordInputToggle";
import { handleAction } from "@/lib/client.utils";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

function LoginForm() {
  const [state, action] = useActionState(signInAction, initialActionState);
  const { data: session } = useSession();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => handleAction(e, action);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <FormInput
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
        <PasswordInputToggle minLength={8} label="Password" id="password" required />
        <SubmitButton label="Log in" loadingLabel="Logging in..." />
        {state.status !== ResponseStatus.pending && <p className="text-sm text-muted-foreground">{state.message}</p>}
      </div>
    </form>
  );
}

export default LoginForm;

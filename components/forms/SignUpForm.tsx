"use client";

import React, { useActionState, useEffect, useState } from "react";
import { SubmitButton } from "@/components/SubmitButton";
import { initialActionState, ResponseStatus } from "@/lib/types";
import { SignUpAction } from "@/app/(home)/signup/actions";
import { Input } from "@/components/forms/input/Input";
import { PasswordInputToggle } from "@/components/forms/input/PasswordInputToggle";
import Link from "next/link";
import { handleAction } from "@/lib/client.utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function SignUpForm() {
  const [actionState, action] = useActionState(SignUpAction, initialActionState);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, setState] = useState(actionState);
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setState(actionState);

    if (actionState.status === ResponseStatus.success) {
      toast.success("Succesvol geregistreerd!", { description: "Je kan nu inloggen." });
      setTimeout(() => router.push("/login"), 1000);
    }
  }, [actionState, router]);

  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setState({ status: ResponseStatus.fail, message: "Wachtwoorden komen niet overeen" });
      setDisabled(true);
    } else {
      setState(initialActionState);
      setDisabled(false);
    }
  }, [password, confirmPassword]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => handleAction(e, action);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <Input
          label="Voornaam"
          id="firstName"
          name="firstName"
          placeholder="John"
          type="text"
          autoCapitalize="words"
          autoComplete="name"
          autoCorrect="off"
          required
        />
        <Input
          label="Achternaam"
          id="lastName"
          name="lastName"
          placeholder="Doe"
          type="text"
          autoCapitalize="words"
          autoComplete="name"
          autoCorrect="off"
          required
        />
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
        <PasswordInputToggle
          label="Wachtwoord"
          id="password"
          minLength={8}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordInputToggle
          label="Bevestig wachtwoord"
          id="confirmPassword"
          minLength={8}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {state.status !== ResponseStatus.pending && (
          <div className="flex">
            <p className="text-muted-foreground text-sm">{state.message}</p>
            {state.status === ResponseStatus.success && (
              <>
                &nbsp;
                <Link className="underline-hover text-sm" href="/login">
                  Log hier in.
                </Link>
              </>
            )}
          </div>
        )}

        <SubmitButton label="Registreer" loadingLabel="Registreren..." disabled={disabled} />
      </div>
    </form>
  );
}

export default SignUpForm;

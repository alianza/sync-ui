"use client";

import React, { useActionState, useEffect, useState } from "react";
import { SubmitButton } from "@/components/SubmitButton";
import { initialActionState, ResponseStatus } from "@/lib/types";
import { SignUpAction } from "@/app/(home)/signup/actions";
import { FormInput } from "@/components/forms/input/FormInput";
import { PasswordInputToggle } from "@/components/forms/input/PasswordInputToggle";
import Link from "next/link";
import { handleAction } from "@/lib/client.utils";

function SignUpForm() {
  const [actionState, action] = useActionState(SignUpAction, initialActionState);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, setState] = useState(actionState);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setState(actionState);
  }, [actionState]);

  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setState({ status: ResponseStatus.fail, message: "Passwords do not match" });
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
        <FormInput
          label="First Name"
          id="firstName"
          name="firstName"
          placeholder="John"
          type="text"
          autoCapitalize="words"
          autoComplete="name"
          autoCorrect="off"
          required
        />
        <FormInput
          label="Last Name"
          id="lastName"
          name="lastName"
          placeholder="Doe"
          type="text"
          autoCapitalize="words"
          autoComplete="name"
          autoCorrect="off"
          required
        />
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
        <PasswordInputToggle
          id="password"
          label="Password"
          minLength={8}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordInputToggle
          id="confirmPassword"
          label="Confirm Password"
          minLength={8}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <SubmitButton label="Sign up" loadingLabel="Registering..." disabled={disabled} />
        {state.status !== ResponseStatus.pending && (
          <div className="flex">
            <p className="text-sm text-muted-foreground">{state.message}</p>
            {state.status === ResponseStatus.success && (
              <>
                &nbsp;
                <Link className="underline-hover text-sm" href={"/login"}>
                  Login here.
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </form>
  );
}

export default SignUpForm;

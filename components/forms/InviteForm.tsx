"use client";

import React, { useActionState, useEffect, useState } from "react";
import { SubmitButton } from "@/components/SubmitButton";
import { initialActionState, ResponseStatus } from "@/lib/types";
import { FormInput } from "@/components/forms/input/FormInput";
import { PasswordInputToggle } from "@/components/forms/input/PasswordInputToggle";
import Link from "next/link";
import { handleAction } from "@/lib/client.utils";
import { ClientInviteDoc } from "@/models/ClientInvite.type";
import { UserDoc } from "@/models/User.type";
import { MergeType } from "mongoose";
import { AcceptInviteAction } from "@/app/(app)/invite/actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type Props = {
  invite: MergeType<ClientInviteDoc, UserDoc>;
};

function SignUpForm({ invite }: Props) {
  const [actionState, action] = useActionState(AcceptInviteAction, initialActionState);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, setState] = useState(actionState);
  const [disabled, setDisabled] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setState(actionState);

    if (actionState.status === ResponseStatus.success) {
      toast({ title: "Successfully signed up!", description: "You can now log in." });
      setTimeout(() => router.push("/login"), 1000);
    }
  }, [actionState, router, toast]);

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
          value={invite.inviteeEmail}
          readOnly
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
        <input type="hidden" name="inviteId" value={invite._id} />
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

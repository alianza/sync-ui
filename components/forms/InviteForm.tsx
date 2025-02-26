"use client";

import React, { useActionState, useEffect, useState } from "react";
import { SubmitButton } from "@/components/SubmitButton";
import { initialActionState, ResponseStatus } from "@/lib/types";
import { Input } from "@/components/forms/input/Input";
import { PasswordInputToggle } from "@/components/forms/input/PasswordInputToggle";
import Link from "next/link";
import { handleAction } from "@/lib/client.utils";
import { ClientInviteDoc } from "@/models/ClientInvite.type";
import { UserObj } from "@/models/User.type";
import { MergeType } from "mongoose";
import { AcceptInviteAction, RejectInviteAction } from "@/app/(home)/invite/actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/ConfirmDialog";

type Props = {
  invite: MergeType<ClientInviteDoc, UserObj>;
};

function InviteForm({ invite }: Props) {
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
      toast({ title: "Succesvol uitnodiging geaccepteerd!", description: "Je kan nu inloggen." });
      setTimeout(() => router.replace("/login"), 1000);
    }
  }, [actionState, router, toast]);

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
          label="Acternaam"
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
          value={invite.inviteeEmail}
          readOnly
        />
        <PasswordInputToggle
          label="Waachtwoord"
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
        <input type="hidden" name="inviteId" value={invite._id} />

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
        <ConfirmDialog
          onConfirm={async () => {
            const response = await RejectInviteAction({ inviteeEmail: invite.inviteeEmail, inviteID: invite._id });

            if (response.status === ResponseStatus.success) {
              toast({ title: "Uitnodiging afgewezen." });
              router.replace("/");
            } else {
              toast({ title: "Niet gelukt uitnodiging af te wijzen", description: response.message });
            }
          }}
          asChild
        >
          <Button type="button" variant="secondary" className="w-full">
            Afwijzen
          </Button>
        </ConfirmDialog>
      </div>
    </form>
  );
}

export default InviteForm;

"use client";

import { signOutAction } from "@/app/(home)/login/actions";
import React, { useActionState } from "react";
import { initialActionState } from "@/lib/types";
import { handleAction } from "@/lib/client.utils";
import { AlertDialogAction } from "./ui/alert-dialog";
import ConfirmDialog from "@/components/confirmDialog";

function SignOutButton() {
  const [state, action] = useActionState(signOutAction, initialActionState);

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => handleAction(e, action);

  return (
    <ConfirmDialog
      customAction={
        <AlertDialogAction onClick={handleSubmit} type="submit" className="text-start">
          Log uit
        </AlertDialogAction>
      }
      title="Uitloggen"
      description="Weet je zeker dat je wilt uitloggen?"
      className="underline-hover p-2 text-sm font-bold underline-offset-4"
    >
      Log uit
    </ConfirmDialog>
  );
}

export default SignOutButton;

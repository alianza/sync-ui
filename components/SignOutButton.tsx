"use client";

import React from "react";
import { AlertDialogAction } from "./ui/alert-dialog";
import ConfirmDialog from "@/components/ConfirmDialog";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

function SignOutButton() {
  // const [state, action] = useActionState(signOutAction, initialActionState);
  // const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => handleAction(e, action);

  return (
    <ConfirmDialog
      customAction={
        <AlertDialogAction
          onClick={async () => {
            await signOut({ redirectTo: "/login" })
              .catch(() => toast.error("Failed to sign out"))
              .finally(() => toast.success("Successfully logged out!"));
          }}
          type="submit"
          className="text-start"
        >
          Log uit
        </AlertDialogAction>
      }
      title="Uitloggen"
      description="Weet je zeker dat je wilt uitloggen?"
      className="underline-hover p-2 text-start text-sm font-bold underline-offset-4"
    >
      Log uit
    </ConfirmDialog>
  );
}

export default SignOutButton;

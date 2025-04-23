"use client";

import React from "react";
import { AlertDialogAction } from "./ui/alert-dialog";
import ConfirmDialog from "@/components/ConfirmDialog";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

import { cn } from "@/lib/client.utils";

function SignOutButton({ className }: { className?: string }) {
  // const [state, action] = useActionState(signOutAction, initialActionState);
  // const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => handleAction(e, action);

  return (
    <ConfirmDialog
      customAction={
        <AlertDialogAction
          onClick={async () => {
            await signOut({ redirectTo: "/login" })
              .catch(() => toast.error("Uitloggen mislukt"))
              .finally(() => toast.success("Uitgelogd"));
          }}
          type="submit"
          className="text-start"
        >
          Log uit
        </AlertDialogAction>
      }
      title="Uitloggen"
      description="Weet je zeker dat je wilt uitloggen?"
      className={cn(
        "underline-hover p-2 text-start text-sm font-bold decoration-transparent underline-offset-4",
        className,
      )}
    >
      Log uit
    </ConfirmDialog>
  );
}

export default SignOutButton;

"use client";

import { signOutAction } from "@/app/(home)/login/actions";
import React, { useActionState } from "react";
import { initialActionState } from "@/lib/types";
import { handleAction } from "@/lib/client.utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

function SignOutButton() {
  const [state, action] = useActionState(signOutAction, initialActionState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    return handleAction(e, action);
  };

  return (
    <>
      <AlertDialog>
        <form onSubmit={handleSubmit} className="flex items-center">
          <button type="submit" className="underline-hover p-2 text-sm font-bold underline-offset-4">
            Logout
          </button>
        </form>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default SignOutButton;

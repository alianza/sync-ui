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
    <AlertDialog>
      <AlertDialogTrigger type="submit" className="underline-hover p-2 text-sm font-bold underline-offset-4">
        Sign Out
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to sign out?</AlertDialogTitle>
          <AlertDialogDescription>
            This will end the current session and you will need to log in again to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form onSubmit={handleSubmit} className="flex items-center">
            <AlertDialogAction type="submit">Sign Out</AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default SignOutButton;

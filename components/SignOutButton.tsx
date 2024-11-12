"use client";

import { signOutAction } from "@/app/(home)/login/actions";
import React, { useActionState } from "react";
import { initialActionState } from "@/lib/types";
import { handleAction } from "@/lib/client.utils";

function SignOutButton() {
  const [state, action] = useActionState(signOutAction, initialActionState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => handleAction(e, action);

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <button type="submit" className="underline-hover p-2 text-sm font-medium underline-offset-4">
        Logout
      </button>
    </form>
  );
}

export default SignOutButton;

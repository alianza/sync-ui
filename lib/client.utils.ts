import React, { startTransition } from "react";

export const handleAction = (e: React.FormEvent<HTMLFormElement>, action: (data: FormData) => void) => {
  e.preventDefault();
  startTransition(() => action(new FormData(e.currentTarget))); // use onSubmit instead of action to retain the form state
};

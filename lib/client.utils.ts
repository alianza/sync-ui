import React, { startTransition } from "react";

export const handleAction = (
  e: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  action: (data: FormData) => void,
) => {
  e.preventDefault();
  if (e.currentTarget instanceof HTMLButtonElement) {
    startTransition(() => action(new FormData()));
    return;
  }
  const formData = new FormData(e.currentTarget);
  startTransition(() => action(formData)); // use onSubmit instead of action to retain the form state
};

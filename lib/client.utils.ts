import React, { startTransition } from "react";

export const handleAction = (e: React.FormEvent<HTMLFormElement>, action: (data: FormData) => void) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  startTransition(() => action(formData)); // use onSubmit instead of action to retain the form state
};

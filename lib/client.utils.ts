import React, { startTransition } from "react";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function to handle form submission and button click events. Use this for form submission without resetting the form state.
 * @param e
 * @param action
 */
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

export const ConditionalWrap = ({
  condition,
  wrap,
  children,
}: {
  condition: boolean;
  wrap: (children: React.ReactNode) => React.ReactNode;
  children: React.ReactNode;
}) => (condition ? wrap(children) : children); // Wrap children with a function if condition is true

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

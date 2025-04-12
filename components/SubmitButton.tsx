import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import React from "react";
import Loader from "./layout/Loader";

type Props = {
  label?: string | React.ReactNode;
  loadingLabel?: string | React.ReactNode;
  disabled?: boolean;
  type?: HTMLButtonElement["type"];
} & React.ComponentPropsWithoutRef<typeof Button>;

export function SubmitButton({
  label = "Submit",
  loadingLabel = "Sending...",
  type = "submit",
  disabled = false,
  ...props
}: Props) {
  const { pending } = useFormStatus();

  return (
    <Button type={type} disabled={disabled || pending} {...props}>
      {pending && <Loader fillSpace />}
      {pending ? loadingLabel : label}
    </Button>
  );
}

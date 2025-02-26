import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import React from "react";
import Loader from "./layout/Loader";

type Props = {
  label?: string | React.ReactNode;
  loadingLabel?: string | React.ReactNode;
  disabled?: boolean;
};

export function SubmitButton({ label = "Submit", loadingLabel = "Sending...", disabled = false }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={disabled || pending}>
      {pending && <Loader fillSpace />}
      {pending ? loadingLabel : label}
    </Button>
  );
}

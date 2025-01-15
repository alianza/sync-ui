import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import React from "react";
import Loader from "./layout/Loader";

export function SubmitButton({ label = "Submit", loadingLabel = "Sending...", disabled = false }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={disabled || pending}>
      {pending && <Loader fillSpace />}
      {pending ? loadingLabel : label}
    </Button>
  );
}

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import React from "react";

export function SubmitButton({ label = "Submit", loadingLabel = "Sending..." }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? loadingLabel : label}
    </Button>
  );
}

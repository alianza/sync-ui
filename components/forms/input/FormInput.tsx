import { Label } from "@/components/ui/label";
import { Input as ShadCnInput } from "@/components/ui/input";
import { Textarea as ShadCnTextArea } from "@/components/ui/textarea";

import React from "react";

interface Props {
  id: string;
  name?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"] | "multiline";
  placeholder?: string;
  autoComplete?: React.InputHTMLAttributes<HTMLInputElement>["autoComplete"];
  autoCapitalize?: React.InputHTMLAttributes<HTMLInputElement>["autoCapitalize"];
  autoCorrect?: React.InputHTMLAttributes<HTMLInputElement>["autoCorrect"];
  required?: boolean;
  label: string;
  minLength?: number;
}

export function FormInput({
  id,
  name,
  type = "text",
  placeholder,
  autoComplete = "off",
  autoCapitalize = "none",
  autoCorrect = "off",
  required = false,
  label,
  minLength,
  ...props
}: Props) {
  const InputTag = type === "multiline" ? ShadCnTextArea : ShadCnInput;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-muted-foreground">*</span>}
        </Label>
      )}

      <InputTag
        id={id}
        name={id || name}
        placeholder={placeholder}
        type={type}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        required={required}
        minLength={minLength}
        {...props}
      />
    </div>
  );
}

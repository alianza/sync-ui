import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { FormInput } from "@/components/forms/input/FormInput";

export function PasswordInputToggle({
  id,
  name,
  label,
  required = false,
  onChange = () => {},
  minLength,
}: {
  id: string;
  label: string;
  name?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  minLength?: number;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const Icon = showPassword ? EyeOffIcon : EyeIcon;

  return (
    <FormInput
      id={id}
      label={label}
      name={id || name}
      type={showPassword ? "text" : "password"}
      autoCapitalize="none"
      autoComplete="new-password"
      autoCorrect="off"
      required={required}
      onChange={onChange}
      minLength={minLength}
      hideSuffixOnHover={false}
      suffix={
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          aria-label={showPassword ? "Hide password" : "Show password"}
          onClick={() => setShowPassword(!showPassword)}
        >
          <Icon className="h-4 w-4" />
        </Button>
      }
    />
  );
}

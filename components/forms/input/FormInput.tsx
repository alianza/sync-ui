import { Label } from "@/components/ui/label";
import { Input as ShadCnInput } from "@/components/ui/input";
import { Textarea as ShadCnTextArea, TextareaProps } from "@/components/ui/textarea";
import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  name?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"] | "multiline";
  placeholder?: string;
  autoComplete?: React.InputHTMLAttributes<HTMLInputElement>["autoComplete"];
  autoCapitalize?: React.InputHTMLAttributes<HTMLInputElement>["autoCapitalize"];
  autoCorrect?: React.InputHTMLAttributes<HTMLInputElement>["autoCorrect"];
  required?: boolean;
  label?: string;
  minLength?: number;
  suffix?: string | React.ReactNode;
  hideSuffixOnHover?: boolean;
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
  suffix,
  hideSuffixOnHover,
  ...props
}: Props & React.ComponentProps<"input"> & TextareaProps & React.RefAttributes<HTMLTextAreaElement>) {
  const InputTag = type === "multiline" ? ShadCnTextArea : ShadCnInput;

  return (
    <LabelWrap htmlFor={id} label={label} required={required}>
      <InputSuffixWrap suffix={suffix} hideSuffixOnHover={hideSuffixOnHover}>
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
          className={cn("hover:ring-primary-500 hover:ring-1 hover:ring-accent", props.className)}
          {...props}
        />
      </InputSuffixWrap>
    </LabelWrap>
  );
}

function InputSuffixWrap({
  children,
  suffix,
  hideSuffixOnHover = true,
}: {
  children: React.ReactNode;
  suffix?: string | React.ReactNode;
  hideSuffixOnHover?: boolean;
}) {
  if (!suffix) return children;
  return (
    <div className="group relative">
      {children}
      <div
        className={`absolute inset-y-0 right-0 flex items-center pr-3 text-sm ${
          hideSuffixOnHover ? "pointer-events-none group-hover:opacity-0" : ""
        }`}
      >
        {suffix}
      </div>
    </div>
  );
}

function LabelWrap({
  htmlFor,
  label,
  required,
  children,
}: {
  htmlFor: string;
  label?: string;
  required: boolean;
  children: React.ReactNode;
}) {
  if (!label) return children;
  return (
    <Label htmlFor={htmlFor} className="flex flex-col gap-1 text-sm font-medium text-foreground">
      <span>
        {label}
        {required && <span className="text-muted-foreground">*</span>}
      </span>
      {children}
    </Label>
  );
}

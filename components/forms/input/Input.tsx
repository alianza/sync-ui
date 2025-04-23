import { Label } from "@/components/ui/label";
import { Input as ShadCnInput } from "@/components/ui/input";
import { Textarea as ShadCnTextArea, TextareaProps } from "@/components/ui/textarea";
import React from "react";
import { cn, ConditionalWrap } from "@/lib/client.utils";

interface Props {
  id: string;
  name?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"] | "multiline";
  label?: string;
  suffix?: string | React.ReactNode;
  hideSuffixOnHover?: boolean;
}

export function Input({
  id,
  name,
  type = "text",
  label,
  suffix,
  hideSuffixOnHover = true,
  ...props
}: Props & React.ComponentProps<"input"> & TextareaProps & React.RefAttributes<HTMLTextAreaElement>) {
  const InputTag = type === "multiline" ? ShadCnTextArea : ShadCnInput;

  return (
    <ConditionalWrap
      condition={!!label}
      wrap={(children) => (
        <Label htmlFor={id} className="group/label text-foreground flex flex-col gap-1 text-sm font-medium">
          <span>
            {label}
            {props.required && <span className="text-muted-foreground">*</span>}
          </span>
          {children}
        </Label>
      )}
    >
      <ConditionalWrap
        condition={!!suffix}
        wrap={(children) => (
          <div className="group relative">
            {children}
            <div
              className={cn("absolute inset-y-0 right-0 flex items-center pr-2.5 text-sm", {
                "pointer-events-none group-hover:hidden group-hover/label:hidden": hideSuffixOnHover,
              })}
            >
              {suffix}
            </div>
          </div>
        )}
      >
        <InputTag
          id={id}
          name={id || name}
          type={type}
          className={cn("hover:ring-accent hover:ring-1", props.className)}
          {...props}
        />
      </ConditionalWrap>
    </ConditionalWrap>
  );
}

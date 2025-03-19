import React from "react";

interface FieldSetProps {
  label?: string;
  children: React.ReactNode;
}

export function FieldSet({ label, children, ...props }: FieldSetProps) {
  return (
    <fieldset className="border-input flex w-full flex-col gap-4 self-start rounded-md border p-2" {...props}>
      {label && <legend className="text-sm font-bold">{label}</legend>}
      {children}
    </fieldset>
  );
}

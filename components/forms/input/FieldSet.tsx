import React from "react";

interface FieldSetProps {
  label?: string;
  children: React.ReactNode;
}

export function FieldSet({ label, children, ...props }: FieldSetProps) {
  return (
    <fieldset className="flex flex-col gap-4 rounded-md border border-input p-2" {...props}>
      {label && <legend className="text-sm font-bold">{label}</legend>}
      {children}
    </fieldset>
  );
}

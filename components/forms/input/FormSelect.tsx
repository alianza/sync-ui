import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

type Item = Record<"key" | "value", string>;

type Props = {
  id: string;
  label?: string;
  name?: string;
  placeholder?: string;
  items?: Item[];
  defaultValue?: string;
  required?: boolean;
};

export default function FormSelect({ label, id, name, placeholder, items = [], defaultValue, required }: Props) {
  return (
    <Label className="flex flex-col gap-2" htmlFor={id}>
      <span>
        {label}
        {required && <span className="text-muted-foreground">*</span>}
      </span>
      <Select name={id || name} defaultValue={defaultValue} required>
        <SelectTrigger id={id} className="hover:ring-primary-500 hover:ring-1 hover:ring-accent">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Type</SelectLabel>
            {items.map(({ key, value }: Item) => (
              <SelectItem key={key} value={value}>
                {key}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Label>
  );
}

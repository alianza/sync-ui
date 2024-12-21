"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Item = Record<"key" | "value", string>;

type Props = {
  id: string;
  label?: string;
  name?: string;
  placeholder?: string;
  items: Item[];
  defaultValue?: Item[];
  required?: boolean;
};

export function MultiSelect({ id, label, name, placeholder, defaultValue, required, items = [] }: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Item[]>(defaultValue || []);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback((item: Item) => {
    setSelected((prev) => prev.filter((s) => s.value !== item.value));
  }, []);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          setSelected((prev) => {
            const newSelected = [...prev];
            newSelected.pop();
            return newSelected;
          });
        }
      }
      // This is not a default behaviour of the <input /> field
      if (e.key === "Escape") {
        input.blur();
      }
    }
  }, []);

  const selectables = items.filter((item) => !selected.some((s) => s.value === item.value));

  return (
    <Label className="flex flex-col gap-2" htmlFor={id} onClick={() => inputRef.current?.focus()}>
      <span>
        {label}
        {required && <span className="text-muted-foreground">*</span>}
      </span>
      <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
        <div
          className={cn(
            "group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring",
            {
              "hover:ring-primary-500 hover:ring-1 hover:ring-accent": !open,
            },
          )}
        >
          <div className="flex flex-wrap gap-1">
            {selected.map((item) => (
              <Badge key={item.key} variant="secondary">
                {item.key}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => e.key === "Enter" && handleUnselect(item)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(item)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            ))}
            <CommandPrimitive.Input
              disabled={selected.length === items.length}
              ref={inputRef}
              name={`${id || name}-input`}
              value={inputValue}
              onValueChange={setInputValue}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              placeholder={selected.length === 0 ? placeholder : `${selected.length} geselecteerd`}
              className={cn("flex-1 bg-transparent outline-none placeholder:text-muted-foreground", {
                "ml-2": selected.length > 0,
              })}
              required={required}
            />
            <input type="hidden" name={id || name} value={selected.map((s) => s.value).join(",")} />
          </div>
        </div>
        <div className="relative">
          <CommandList>
            {open && selectables.length > 0 && (
              <div className="absolute top-2 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                <CommandGroup className="h-full overflow-auto">
                  {selectables.map((item) => (
                    <CommandItem
                      key={item.key}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        setInputValue("");
                        if (selected.length + 1 === items.length) setOpen(false);
                        setSelected((prev) => [...prev, item]);
                      }}
                      className="cursor-pointer"
                    >
                      {item.key}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </div>
            )}
          </CommandList>
        </div>
      </Command>
    </Label>
  );
}

import React from "react";
import { cn } from "@/lib/utils";

type Props = { className?: string };

export default function Loader({ className }: Props): React.ReactElement {
  return (
    <div className={cn("flex h-96 items-center justify-center", className)}>
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-l-primary" />
    </div>
  );
}

import React from "react";
import { cn } from "@/lib/utils";

type Props = { className?: string; fillSpace?: boolean };

export default function Loader({ className, fillSpace }: Props): React.ReactElement {
  return (
    <div className={cn("flex items-center justify-center", className, fillSpace ? "aspect-square size-full" : "h-96")}>
      <div
        className={cn(
          "animate-spin rounded-full border-4 border-l-primary border-r-primary border-t-primary",
          fillSpace ? "size-full" : "size-12",
        )}
      />
    </div>
  );
}

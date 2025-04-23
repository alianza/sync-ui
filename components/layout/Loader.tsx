import React from "react";

import { cn } from "@/lib/client.utils";

type Props = { className?: string; fillSpace?: boolean };

export default function Loader({ className, fillSpace }: Props): React.ReactElement {
  return (
    <div className={cn("flex items-center justify-center", className, fillSpace ? "aspect-square h-full" : "h-96")}>
      <div
        className={cn(
          "border-l-primary border-r-primary border-t-primary animate-spin rounded-full border-4",
          fillSpace ? "size-full" : "size-12",
        )}
      />
    </div>
  );
}

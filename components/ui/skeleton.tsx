import React from "react";
import { cn } from "@/lib/client.utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("bg-primary/10 animate-pulse rounded-md", className)} {...props} />;
}

export { Skeleton };

import React from "react";

export default function Loading() {
  return (
    <div className="flex h-96 items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-l-primary" />
    </div>
  );
}

"use client";

import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function MobileNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    setIsOpen(false); // Close the menu when the route changes
  }, [pathname, searchParams]);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="ml-auto md:hidden" onClick={toggleMenu}>
          <Menu className="size-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-[300px] flex-col gap-4 sm:w-[400px]">
        <SheetTitle>Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Navigate to different sections of the website using the links below.
        </SheetDescription>
        <nav className="flex flex-col gap-2">{children}</nav>
      </SheetContent>
    </Sheet>
  );
}

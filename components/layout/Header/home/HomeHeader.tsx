import NavLink from "@/components/NavLink";
import { HeaderLogo } from "@/components/layout/Header/HeaderLogo";
import { DynamicHomeHeaderLinks } from "@/components/layout/Header/home/DynamicHomeHeaderLinks";
import { MobileNav } from "@/components/layout/Header/MobileNav";
import { Suspense } from "react";

export const homeMenuItems = [
  { href: "/#features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function HomeHeader() {
  return (
    <header className="flex shrink flex-wrap items-center gap-8 bg-background p-4 shadow dark:border-b-2">
      <HeaderLogo />
      <nav className="ml-auto hidden max-w-full flex-wrap gap-2 md:flex">
        <HomeNavItems />
      </nav>
      <Suspense fallback={null}>
        <MobileNav>
          <HomeNavItems />
        </MobileNav>
      </Suspense>
    </header>
  );
}

function HomeNavItems() {
  return (
    <>
      {homeMenuItems.map(({ href, label }, index) => (
        <NavLink key={index} href={href} label={label} />
      ))}
      <DynamicHomeHeaderLinks />
    </>
  );
}

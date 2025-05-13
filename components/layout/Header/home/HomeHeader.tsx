import NavLink from "@/components/NavLink";
import { HeaderLogo } from "@/components/layout/Header/HeaderLogo";
import {
  DynamicHomeHeaderLinks,
  MobileDynamicHomeHeaderLinks,
} from "@/components/layout/Header/home/DynamicHomeHeaderLinks";
import { MobileNav } from "@/components/layout/Header/MobileNav";
import { Suspense } from "react";

export const homeMenuItems = [
  { href: "/", label: "Home", exact: true },
  { href: "/#features", label: "Functionaliteiten" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "Over" },
  { href: "/contact", label: "Contact" },
];

export function HomeHeader() {
  return (
    <header className="bg-background flex shrink flex-wrap items-center gap-8 p-4 shadow-sm dark:border-b-2">
      <HeaderLogo />
      <nav className="ml-auto hidden max-w-full flex-wrap gap-2 md:flex">
        {homeMenuItems.map(({ href, label, exact }) => (
          <NavLink key={href} href={href} label={label} exact={exact} />
        ))}
        <Suspense fallback={null}>
          <DynamicHomeHeaderLinks />
        </Suspense>
      </nav>
      <Suspense fallback={null}>
        <MobileNav>
          {homeMenuItems.map(({ href, label, exact }) => (
            <NavLink
              className="hover:bg-muted active:bg-muted rounded p-4 transition-colors duration-200 ease-in-out"
              key={href}
              href={href}
              label={label}
              exact={exact}
            />
          ))}
          <MobileDynamicHomeHeaderLinks />
        </MobileNav>
      </Suspense>
    </header>
  );
}

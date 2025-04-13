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
  { href: "/#features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function HomeHeader() {
  return (
    <header className="bg-background flex shrink flex-wrap items-center gap-8 p-4 shadow-sm dark:border-b-2">
      <HeaderLogo />
      <nav className="ml-auto hidden max-w-full flex-wrap gap-2 md:flex">
        {homeMenuItems.map(({ href, label, exact }, index) => (
          <NavLink key={index} href={href} label={label} exact={exact} />
        ))}
        <Suspense fallback={null}>
          <DynamicHomeHeaderLinks />
        </Suspense>
      </nav>
      <MobileNav>
        {homeMenuItems.map(({ href, label, exact }, index) => (
          <NavLink
            className="hover:bg-muted rounded p-4 transition-colors duration-200 ease-in-out"
            key={index}
            href={href}
            label={label}
            exact={exact}
          />
        ))}
        <Suspense fallback={null}>
          <MobileDynamicHomeHeaderLinks />
        </Suspense>
      </MobileNav>
    </header>
  );
}

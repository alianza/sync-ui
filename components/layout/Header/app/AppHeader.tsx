import NavLink from "@/components/NavLink";
import { HeaderLogo } from "@/components/layout/Header/HeaderLogo";
import { DynamicAppHeaderLinks } from "@/components/layout/Header/app/DynamicAppHeaderLinks";
import { MobileNav } from "@/components/layout/Header/MobileNav";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Home, ScrollText, Users } from "lucide-react";

export const appMenuItems = [
  { href: "/dashboard", label: "Dashboard", exact: true, icon: Home },
  { href: "/dashboard/listings", label: "Listings", icon: ScrollText },
  { href: "/dashboard/clients", label: "Clients", icon: Users },
];

export async function AppHeader() {
  return (
    <header className="flex items-center bg-background p-4 shadow dark:border-b-2">
      <div className="flex h-full items-center gap-2">
        {/*<SidebarTrigger className="size-7" />*/}
        {/*<Separator orientation="vertical" className="grow" />*/}
        <HeaderLogo />
      </div>

      <nav className="ml-auto hidden gap-2 md:flex">
        <AppNavItems />
      </nav>
      <MobileNav>
        <AppNavItems />
      </MobileNav>
    </header>
  );
}

function AppNavItems() {
  return (
    <>
      {appMenuItems.map(({ href, label, exact }, index) => (
        <NavLink key={index} href={href} label={label} exact={exact} />
      ))}
      <DynamicAppHeaderLinks />
    </>
  );
}

import NavLink from "@/components/NavLink";
import { HeaderLogo } from "@/components/layout/Header/HeaderLogo";
import { auth } from "@/auth";
import SignOutButton from "@/components/SignOutButton";
import { DynamicHomeHeaderLinks } from "@/components/layout/Header/home/DynamicHomeHeaderLinks";
import { homeMenuItems } from "@/components/layout/Header/home/HomeHeader";
import { DynamicAppHeaderLinks } from "@/components/layout/Header/app/DynamicAppHeaderLinks";
import { MobileNav } from "@/components/layout/Header/MobileNav";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

const appMenuItems = [{ href: "/dashboard/listings", label: "Listings" }];

export async function AppHeader() {
  return (
    <header className="flex items-center bg-background p-4 shadow dark:border-b-2">
      <div className="flex h-full items-center gap-2">
        <SidebarTrigger className="size-7" />
        <Separator orientation="vertical" className="grow" />
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
      {appMenuItems.map(({ href, label }, index) => (
        <NavLink key={index} href={href} label={label} />
      ))}
      <DynamicAppHeaderLinks />
    </>
  );
}

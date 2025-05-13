import NavLink from "@/components/NavLink";
import { HeaderLogo } from "@/components/layout/Header/HeaderLogo";
import { MobileNav } from "@/components/layout/Header/MobileNav";
import { Home, ScrollText, Users } from "lucide-react";
import { Suspense } from "react";
import { Session } from "next-auth";
import { ROLES } from "@/models/User.type";
import SignOutButton from "@/components/SignOutButton";
import { Separator } from "@/components/ui/separator";

export const appMenuItems = [
  { href: "/dashboard", label: "Dashboard", exact: true, icon: Home },
  { href: "/dashboard/listings", label: "Woningen", icon: ScrollText, role: ROLES.REALTOR },
  { href: "/dashboard/clients", label: "Klanten", icon: Users, role: ROLES.REALTOR },
  { href: "/dashboard/agents", label: "Makelaars", icon: Users, role: ROLES.BUYER },
  { href: "/dashboard/leads", label: "Leads", icon: Users, role: ROLES.BUYER },
];

export function AppHeader({ session }: { session: Session }) {
  const filteredMenuItems = appMenuItems.filter(({ role: itemRole }) => !itemRole || itemRole === session.user.role);

  return (
    <header className="bg-background flex items-center p-4 shadow-sm dark:border-b-2">
      <div className="flex h-full items-center gap-2">
        {/*<SidebarTrigger className="size-7" />*/}
        {/*<Separator orientation="vertical" className="grow" />*/}
        <HeaderLogo />
      </div>

      <nav className="ml-auto hidden gap-2 md:flex">
        {filteredMenuItems.map(({ href, label, exact }) => (
          <NavLink key={href} href={href} label={label} exact={exact} />
        ))}
        <SignOutButton />
      </nav>

      <Suspense fallback={null}>
        <MobileNav>
          {filteredMenuItems.map(({ href, label, exact }) => (
            <NavLink
              key={href}
              href={href}
              label={label}
              exact={exact}
              className="hover:bg-muted active:bg-muted rounded p-4 transition-colors duration-200 ease-in-out"
            />
          ))}
          <Separator className="mt-auto" />
          <SignOutButton className="hover:bg-muted active:bg-muted rounded p-4 transition-colors duration-200 ease-in-out" />
        </MobileNav>
      </Suspense>
    </header>
  );
}

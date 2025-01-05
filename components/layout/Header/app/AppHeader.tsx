import NavLink from "@/components/NavLink";
import { HeaderLogo } from "@/components/layout/Header/HeaderLogo";
import { MobileNav } from "@/components/layout/Header/MobileNav";
import { Home, ScrollText, Users } from "lucide-react";
import { Suspense } from "react";
import { Session } from "next-auth";
import { ROLES } from "@/models/User.type";
import SignOutButton from "@/components/SignOutButton";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export const appMenuItems = [
  { href: "/dashboard", label: "Dashboard", exact: true, icon: Home },
  { href: "/dashboard/listings", label: "Listings", icon: ScrollText, role: ROLES.REALTOR },
  { href: "/dashboard/clients", label: "Clients", icon: Users, role: ROLES.REALTOR },
  { href: "/dashboard/agents", label: "Makelaars", icon: Users, role: ROLES.BUYER },
  { href: "/dashboard/leads", label: "Leads", icon: Users, role: ROLES.BUYER },
];

export function AppHeader({ session }: { session: Session }) {
  return (
    <header className="flex items-center bg-background p-4 shadow dark:border-b-2">
      <div className="flex h-full items-center gap-2">
        <SidebarTrigger className="size-7" />
        <Separator orientation="vertical" className="grow" />
        <HeaderLogo />
      </div>

      <nav className="ml-auto hidden gap-2 md:flex">
        <AppNavItems role={session.user.role} />
      </nav>

      <Suspense fallback={null}>
        <MobileNav>
          <AppNavItems role={session.user.role} />
        </MobileNav>
      </Suspense>
    </header>
  );
}

function AppNavItems({ role }: { role: ROLES }) {
  return (
    <>
      {appMenuItems
        .filter(({ role: itemRole }) => !itemRole || itemRole === role)
        .map(({ href, label, exact }, index) => (
          <NavLink key={index} href={href} label={label} exact={exact} />
        ))}
      <SignOutButton />
    </>
  );
}

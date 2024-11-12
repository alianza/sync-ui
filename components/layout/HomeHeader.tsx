import NavLink from "@/components/NavLink";
import { HeaderLogo } from "@/components/layout/HeaderLogo";
import { DynamicLinks } from "@/components/layout/DynamicHeaderlInks";

export function HomeHeader() {
  return (
    <header className="flex shrink flex-wrap items-center gap-8 bg-background p-4 shadow dark:border-b-2">
      <HeaderLogo />
      <nav className="ml-auto flex max-w-full flex-wrap gap-x-4 gap-y-2 sm:gap-6">
        <NavLink href="/#features" label="Features" />
        <NavLink href="/pricing" label="Pricing" />
        <NavLink href="/about" label="About" />
        <NavLink href="/contact" label="Contact" />
        <DynamicLinks />
      </nav>
    </header>
  );
}

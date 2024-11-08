import NavLink from "@/components/NavLink";
import { HeaderLogo } from "@/components/layout/HeaderLogo";
import { auth } from "@/auth";
import SignOutButton from "@/components/SignOutButton";

export async function HomeHeader() {
  const session = await auth();

  console.log(`session`, session);

  return (
    <header className="flex shrink flex-wrap items-center gap-8 bg-background p-4 shadow dark:border-b-2">
      <HeaderLogo />
      <nav className="ml-auto flex max-w-full flex-wrap gap-x-4 gap-y-2 sm:gap-6">
        <NavLink href="/#features" label="Features" />
        <NavLink href="/pricing" label="Pricing" />
        <NavLink href="/about" label="About" />
        <NavLink href="/contact" label="Contact" />
        {session && <NavLink href="/dashboard" label="Dashboard" />}
        {session ? <SignOutButton /> : <NavLink href="/login" label="Login" />}
      </nav>
    </header>
  );
}

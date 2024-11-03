import NavLink from "@/components/navLink";
import HeaderLogo from "@/components/layout/headerLogo";
import { auth } from "@/auth";
import SignOutButton from "@/components/signOutButton";

export async function Header() {
  const session = await auth();

  console.log(`session`, session);

  return (
    <header className="flex h-14 items-center bg-background px-4 shadow lg:px-6 dark:border-b-2">
      <HeaderLogo />
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <NavLink href="/#features" label="Features" />
        <NavLink href="/pricing" label="Pricing" />
        <NavLink href="/about" label="About" />
        <NavLink href="/contact" label="Contact" />
        {session ? <SignOutButton /> : <NavLink href="/login" label="Login" />}
      </nav>
    </header>
  );
}

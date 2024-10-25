import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Header } from "@/components/layout/header";

export function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  About HuizenHub
                </h1>
                <p className="mx-auto max-w-[700px] text-neutral-500 dark:text-neutral-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Revolutionizing the Dutch housing market with innovative technology and seamless experiences.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-neutral-100 py-12 dark:bg-neutral-800 md:py-24 lg:py-32">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    To simplify and streamline the process of buying and selling homes in the Netherlands, making it
                    more efficient and transparent for all parties involved.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    To become the leading platform for real estate transactions in the Netherlands, known for our
                    innovative technology and exceptional user experience.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Our Values</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-inside list-disc space-y-2">
                    <li>Transparency</li>
                    <li>Innovation</li>
                    <li>Customer-centricity</li>
                    <li>Integrity</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Team</h2>
                <p className="max-w-[900px] text-neutral-500 dark:text-neutral-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Meet the passionate individuals behind HuizenHub, dedicated to transforming the Dutch housing market.
                </p>
              </div>
              {/* Team member cards would go here */}
              <Button className="mt-8">Join Our Team</Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-neutral-500 dark:text-neutral-400">© 2024 HuizenHub. All rights reserved.</p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link className="underline-hover text-xs underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="underline-hover text-xs underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

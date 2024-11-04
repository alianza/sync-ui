import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Home, Users } from "lucide-react";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Header } from "@/components/layout/Header";

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full bg-[url('/placeholder.svg?height=600&width=800')] bg-cover bg-center py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-white drop-shadow-md sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to HuizenHub
                </h1>
                <p className="mx-auto max-w-[700px] text-xl text-white drop-shadow-md md:text-2xl">
                  The ultimate CRM for the Dutch housing market. Connecting realtors and home buyers seamlessly.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-white text-black hover:bg-neutral-200">Get Started</Button>
                <Button
                  variant="outline"
                  className="border-white bg-transparent text-white hover:bg-white hover:text-black"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-neutral-100 py-12 md:py-24 lg:py-32 dark:bg-neutral-800">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <h2 className="mb-12 scroll-m-8 text-center text-3xl font-bold tracking-tighter sm:text-5xl" id="features">
              Key Features
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Home className="mb-2 size-8" />
                    <CardTitle>Comprehensive Listings</CardTitle>
                  </div>
                  <CardDescription>Browse through an extensive database of Dutch properties.</CardDescription>
                </CardHeader>
                <CardContent>
                  Realtors can easily list properties with detailed information, high-quality images, and virtual tours.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Calendar className="mb-2 size-8" />
                    <CardTitle>Efficient Viewing Scheduler</CardTitle>
                  </div>
                  <CardDescription>Plan and manage property viewings with ease.</CardDescription>
                </CardHeader>
                <CardContent>
                  Streamline the viewing process for both realtors and potential buyers with our intuitive scheduling
                  system.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Users className="mb-2 size-8" />
                    <CardTitle>Offer Management</CardTitle>
                  </div>
                  <CardDescription>Submit and track offers seamlessly.</CardDescription>
                </CardHeader>
                <CardContent>
                  Buyers can make offers directly through the platform, while realtors can manage and respond to offers
                  efficiently.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full bg-neutral-50 py-12 md:py-24 lg:py-32 dark:bg-neutral-900">
          <div className="px-4 md:px-6">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="mx-auto w-full max-w-3xl">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is HuizenHub?</AccordionTrigger>
                <AccordionContent>
                  HuizenHub is a comprehensive CRM system designed specifically for the Dutch housing market. It
                  connects realtors and potential home buyers, streamlining the process of selling and purchasing
                  properties.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How does HuizenHub benefit realtors?</AccordionTrigger>
                <AccordionContent>
                  HuizenHub provides realtors with tools to efficiently manage property listings, schedule viewings, and
                  handle offers. It centralizes all aspects of property sales, saving time and improving organization.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can home buyers use HuizenHub?</AccordionTrigger>
                <AccordionContent>
                  Yes, home buyers can use HuizenHub to browse property listings, schedule viewings, and submit offers
                  directly through the platform. This creates a seamless experience for both buyers and sellers.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Is HuizenHub available throughout the Netherlands?</AccordionTrigger>
                <AccordionContent>
                  Yes, HuizenHub is available for use across the entire Netherlands. Our platform caters to all regions
                  and accommodates local market variations.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>How secure is the information on HuizenHub?</AccordionTrigger>
                <AccordionContent>
                  We take data security very seriously. HuizenHub employs state-of-the-art encryption and security
                  measures to protect all user information and transaction details, ensuring a safe environment for all
                  our users.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Join HuizenHub Today</h2>
                <p className="max-w-[900px] text-neutral-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-neutral-400">
                  Whether you're a realtor looking to streamline your sales process or a home buyer searching for your
                  dream property, HuizenHub has you covered. Sign up now and experience the future of Dutch real estate.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex items-center space-x-2">
                  <input
                    className="flex h-10 w-full max-w-lg flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit">Sign Up</Button>
                </form>
              </div>
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

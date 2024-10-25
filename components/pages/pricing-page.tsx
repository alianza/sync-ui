import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PricingComponent } from "@/components/pricingComponent";
import { ContactComponent } from "@/components/contactComponent";

export function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  HuizenHub Pricing
                </h1>
                <p className="mx-auto max-w-[700px] text-neutral-500 dark:text-neutral-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the perfect plan for your real estate business and get started today.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-neutral-100 py-12 dark:bg-neutral-800 md:py-24 lg:py-32">
          <PricingComponent />
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <ContactComponent />
        </section>
      </main>
      <Footer />
    </div>
  );
}

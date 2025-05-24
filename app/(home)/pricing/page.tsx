import { PricingComponent } from "@/components/PricingComponent";
import { ContactComponent } from "@/components/ContactComponent";

export default function Pricing() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              HuizenHub Pricing
            </h1>
            <p className="mx-auto max-w-[700px] text-neutral-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-neutral-400">
              Choose the perfect plan for your real estate business and get started today.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full bg-neutral-200 py-12 md:py-24 lg:py-32 dark:bg-neutral-800">
        <PricingComponent />
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <ContactComponent />
      </section>
    </>
  );
}

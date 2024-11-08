import { HomeHeader } from "@/components/layout/HomeHeader";
import { Footer } from "@/components/layout/Footer";
import { ContactComponent } from "@/components/ContactComponent";

export function ContactPage() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <ContactComponent />
    </section>
  );
}

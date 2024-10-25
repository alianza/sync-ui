import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContactComponent } from "@/components/contactComponent";

export function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <ContactComponent />
        </section>
      </main>
      <Footer />
    </div>
  );
}

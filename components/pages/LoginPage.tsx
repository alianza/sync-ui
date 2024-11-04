import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LoginComponent } from "@/components/LoginComponent";

export function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <LoginComponent />
        </section>
      </main>
      <Footer />
    </div>
  );
}

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import LoginComponent from "@/components/loginComponent";

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

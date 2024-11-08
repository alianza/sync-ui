import { HomeHeader } from "@/components/layout/HomeHeader";
import { Footer } from "@/components/layout/Footer";
import SignupComponent from "@/components/SignupComponent";

export async function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <HomeHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <SignupComponent />
        </section>
      </main>
      <Footer />
    </div>
  );
}

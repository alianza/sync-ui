import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SignUpForm from "@/components/forms/SignUpForm";
import Link from "next/link";

export async function SignUpPage() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Create an account</CardTitle>
          <CardDescription className="text-center">Enter your details below to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline-hover text-primary">
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>{" "}
    </section>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AboutPage() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            About HuizenHub
          </h1>
          <p className="mx-auto max-w-[700px] text-neutral-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-neutral-400">
            Revolutionizing the Dutch housing market with innovative technology and seamless experiences.
          </p>
        </div>
      </section>
      <section className="w-full bg-neutral-50 py-12 md:py-24 lg:py-32 dark:bg-neutral-950">
        <div className="mx-auto max-w-screen-xl px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  To simplify and streamline the process of buying and selling homes in the Netherlands, making it more
                  efficient and transparent for all parties involved.
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
                <ul className="flex list-inside list-disc flex-col gap-2">
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
        <div className="flex flex-col items-center justify-center gap-4 px-4 md:px-6">
          <div className="flex flex-col gap-2 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Team</h2>
            <p className="max-w-4xl text-neutral-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-neutral-400">
              Meet the passionate individuals behind HuizenHub, dedicated to transforming the Dutch housing market.
            </p>
            {/* Team member cards would go here */}
          </div>
          <Button>Join Our Team</Button>
        </div>
      </section>
    </>
  );
}

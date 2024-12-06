import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "€49",
    description: "Perfect for individual realtors or small agencies",
    features: ["Up to 20 active listings", "Basic viewing scheduler", "Email support", "Standard analytics"],
  },
  {
    name: "Professional",
    price: "€99",
    description: "Ideal for growing real estate businesses",
    features: [
      "Up to 100 active listings",
      "Advanced viewing scheduler",
      "Priority email and chat support",
      "Advanced analytics and reporting",
      "Offer management system",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large agencies with complex needs",
    features: [
      "Unlimited active listings",
      "Full-featured viewing scheduler",
      "24/7 priority support",
      "Custom analytics and reporting",
      "Advanced offer management system",
      "API access for custom integrations",
    ],
  },
];

export function PricingComponent() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Pricing Plans</h2>
          <p className="max-w-4xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Choose the perfect plan for your real estate business
          </p>
        </div>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {tiers.map((tier, index) => (
          <Card key={index} className={index === 1 ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle>{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{tier.price}</div>
              {tier.name !== "Enterprise" && <div className="text-sm text-gray-500 dark:text-gray-400">per month</div>}
              <ul className="mt-4 space-y-2">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">{tier.name === "Enterprise" ? "Contact Sales" : "Get Started"}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

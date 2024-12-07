"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";

export function ContactComponent() {
  return (
    <div className="px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Contact Us</h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Have questions about HuizenHub? We're here to help. Reach out to us using the form below or through our
            contact information.
          </p>
        </div>
      </div>
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
        <ContactForm />
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Reach out to us directly using the information below.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center space-x-4">
              <Mail className="h-6 w-6" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <Link href={"mailto:info@huizenhub.nl"} className="text-sm text-gray-500 dark:text-gray-400">
                  info@huizenhub.nl
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="h-6 w-6" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <Link href={"tel:+31201234567"} className="text-sm text-gray-500 dark:text-gray-400">
                  +31 20 123 4567
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="h-6 w-6" />
              <div>
                <p className="text-sm font-medium">Address</p>
                <Link
                  href="https://maps.google.nl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 dark:text-gray-400"
                >
                  Herengracht 182, 1016 BR Amsterdam, Netherlands
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

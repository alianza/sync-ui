"use client";

import React, { useActionState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import Form from "next/form";
import { createContact } from "@/app/contact/actions";
import { SubmitButton } from "@/components/submitButton";

const initialState = {
  message: "",
};

export function ContactComponent() {
  const [state, action] = useActionState(createContact, initialState);

  return (
    <div className="px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Contact Us</h2>
          <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Have questions about HuizenHub? We're here to help. Reach out to us using the form below or through our
            contact information.
          </p>
        </div>
      </div>
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription>We'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <Form action={action}>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" placeholder="Enter your name" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" placeholder="Enter your email" type="email" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" placeholder="Enter your message" required />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-4">
              <SubmitButton label="Send message..." />
              {state?.message && <p className="text-sm text-neutral-700">{state.message}</p>}
            </CardFooter>
          </Form>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Reach out to us directly using the information below.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
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

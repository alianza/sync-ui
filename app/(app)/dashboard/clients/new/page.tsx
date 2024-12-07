import React from "react";
import dbConnect from "@/lib/dbConnect";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ListingCard } from "@/components/ListingCard";
import { ListingForm } from "@/components/forms/ListingForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Listing from "@/models/Listing";
import { ListingDoc } from "@/models/Listing.type";
import User from "@/models/User";
import { UserDoc } from "@/models/User.type";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ClientCard } from "@/components/ClientCard";
import { ClientInviteForm } from "@/components/forms/ClientInviteForm";
import { SubmitButton } from "@/components/SubmitButton";
import { ResponseStatus } from "@/lib/types";

export default async function ClientsPage() {
  const session = await auth();

  if (!session) redirect("/login");

  return (
    <>
      <section className="w-full bg-neutral-100 py-12 md:py-24 lg:py-32 dark:bg-neutral-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Invite</h2>
            </div>
          </div>
          <div className="mx-auto mt-12">
            <ClientInviteForm />
          </div>
        </div>
      </section>
    </>
  );
}

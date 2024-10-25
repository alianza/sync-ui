"use client";

import Form from "next/form";
import React, { useActionState } from "react";
import { createListing } from "@/app/test/actions";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submitButton";
import { Textarea } from "@/components/ui/textarea";

export const initialState = {
  data: {
    _id: "",
    title: "",
    description: "",
    type: "",
  },
  message: "",
  error: "",
};

export function ListingForm() {
  const [state, action] = useActionState(createListing, initialState);

  return (
    <Card className="mx-auto max-w-screen-sm">
      <CardHeader>
        <CardTitle>Add a new listing</CardTitle>
        <CardDescription>Fill in the required fields to create a new listing.</CardDescription>
      </CardHeader>
      <Form action={action}>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Enter the title" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Enter the description" required />
            </div>
            {/*<div className="grid gap-2">*/}
            {/*  <Label htmlFor="type">Type</Label>*/}
            {/*  <select id="type" name="type" required />*/}
            {/*</div>*/}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between gap-4">
          <SubmitButton />
          {state?.message && <p className="text-sm text-neutral-700">{state.message}</p>}
          {state?.error && <p className="text-sm text-red-900">{state.error}</p>}
        </CardFooter>
      </Form>
    </Card>
  );
}

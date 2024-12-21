"use client";

import React, { useActionState } from "react";
import { initialActionState, ResponseStatus } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SubmitButton } from "@/components/SubmitButton";
import { FormInput } from "@/components/forms/input/FormInput";
import { createClientInvite } from "@/app/(app)/dashboard/clients/new/actions";
import { handleAction } from "@/lib/client.utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function ClientInviteForm() {
  const [state, action] = useActionState(createClientInvite, initialActionState);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => handleAction(e, action);
  const { toast } = useToast();

  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const inviteLink = `${baseUrl}/invite?id=${state.data?._id}`;

  return (
    <>
      <Card className="mx-auto max-w-screen-sm">
        <CardHeader>
          <CardTitle>Invite new client</CardTitle>
          <CardDescription>
            Invite a new client to your platform. They will receive an email with a link to sign up and be connected to
            you.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} onChange={() => {}}>
          <CardContent>
            <div className="flex flex-col gap-4">
              <FormInput
                label="Email"
                id="inviteeEmail"
                placeholder="Enter the client's email"
                type="email"
                autoComplete="email"
                required
              />
              <FormInput id="message" label="Message" type="multiline" placeholder="Enter your message" required />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between gap-4">
            <SubmitButton label="Invite" loadingLabel="Inviting..." />
            {state?.message && (
              <p
                className={cn("text-sm", state.status !== ResponseStatus.success ? "text-red-800" : "text-neutral-700")}
              >
                {state.message}
              </p>
            )}
          </CardFooter>
        </form>
      </Card>
      {state.status === ResponseStatus.success && (
        <AlertDialog defaultOpen key={state.message}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Successfully created client invite for: {state.data.inviteeEmail}</AlertDialogTitle>
              <AlertDialogDescription>
                Send them this link to sign up:{" "}
                <a className="underline-hover" href={inviteLink}>
                  {inviteLink}
                </a>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(inviteLink);
                  toast({ title: "Link copied to clipboard" });
                }}
                variant="secondary"
              >
                <Copy />
                Copy link
              </Button>
              <AlertDialogAction>Got it!</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}

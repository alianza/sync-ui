"use client";

import React, { useActionState, useEffect } from "react";
import { initialActionState, ResponseStatus } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/forms/input/Input";
import { createClientInvite } from "@/app/(app)/dashboard/(realtors)/clients/new/actions";
import { cn, handleAction } from "@/lib/client.utils";
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
import { toast } from "sonner";

export function ClientInviteForm() {
  const [state, action] = useActionState(createClientInvite, initialActionState);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => handleAction(e, action);

  const [inviteLink, setInviteLink] = React.useState("");

  useEffect(() => {
    if (state.status !== ResponseStatus.success) return;
    if (state.statusCode !== 201) return;
    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    setInviteLink(`${baseUrl}/invite?id=${state.data?._id}`);
  }, [state]);

  return (
    <>
      <Card className="mx-auto max-w-(--breakpoint-sm)">
        <CardHeader>
          <CardTitle>Invite new client</CardTitle>
          <CardDescription>
            Invite a new client to your platform. They will receive an email with a link to sign up and be connected to
            you.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Input
                label="Email"
                id="inviteeEmail"
                placeholder="Voer het e-mailadres van de klant in"
                type="email"
                autoComplete="email"
                required
              />
              <Input
                label="Bericht"
                id="message"
                type="multiline"
                placeholder="Voeg een persoonlijk bericht toe"
                className="min-h-32"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between gap-4">
            <SubmitButton label="Nodig uit" loadingLabel="Uitnodigen..." />
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
      {state.status === ResponseStatus.success && state.statusCode === 201 && (
        <AlertDialog defaultOpen key={state.message}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Succesvol een uitnodiging aangemaakt voor: <span className="font-bold">{state.data.inviteeEmail}</span>
              </AlertDialogTitle>
              <AlertDialogDescription>
                Stuur ze deze link om in te registreren:{" "}
                <a className="underline-hover" href={inviteLink} target="_blank" rel="noopener noreferrer">
                  {inviteLink}
                </a>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(inviteLink);
                  toast.info("Link gekopieerd");
                }}
                variant="secondary"
              >
                <Copy />
                Kopieer link
              </Button>
              <AlertDialogAction>Sluiten</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}

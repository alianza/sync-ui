"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { ConditionalWrap } from "@/lib/client.utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type Props = {
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  children: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  className?: string;
  customAction?: React.ReactNode;
  asChild?: boolean;
};

function ConfirmDialog({
  title = "Weet je het zeker?",
  cancelText = "Annuleren",
  confirmText = "Bevestigen",
  className,
  description,
  onConfirm = () => {},
  onCancel = () => {},
  customAction,
  asChild,
  children,
}: Props) {
  if (!description) description = title; // If description is not provided, use title as description (for screen readers)

  return (
    <AlertDialog>
      <AlertDialogTrigger className={className} asChild={asChild}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <ConditionalWrap
            condition={description === title}
            wrap={(children) => <VisuallyHidden>{children}</VisuallyHidden>}
          >
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </ConditionalWrap>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel>
          {customAction ? customAction : <AlertDialogAction onClick={onConfirm}>{confirmText}</AlertDialogAction>}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmDialog;

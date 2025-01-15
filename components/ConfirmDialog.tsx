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
  return (
    <AlertDialog>
      <AlertDialogTrigger className={className} asChild={asChild}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
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

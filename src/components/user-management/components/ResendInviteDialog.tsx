
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
} from "@/components/ui/alert-dialog";
import { UserType } from "../types";

interface ResendInviteDialogProps {
  open: boolean;
  user: UserType | null;
  onClose: () => void;
  onConfirm: () => void;
}

const ResendInviteDialog = ({ open, user, onClose, onConfirm }: ResendInviteDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Resend Invitation</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to resend the invitation email to <strong>{user?.email}</strong>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            Resend Invitation
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ResendInviteDialog;

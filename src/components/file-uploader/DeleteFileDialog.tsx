
import React from "react";
import { DeleteConfirmationDialog } from "@/components/file-uploader/DeleteConfirmationDialog";

interface DeleteFileDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

const DeleteFileDialog: React.FC<DeleteFileDialogProps> = ({
  isOpen,
  onOpenChange,
  onConfirm,
  title = "Confirm File Deletion",
  description = "Are you sure you want to delete this file? This action cannot be undone."
}) => {
  return (
    <DeleteConfirmationDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onConfirm={onConfirm}
      title={title}
      description={description}
      confirmLabel="Delete"
      cancelLabel="Cancel"
    />
  );
};

export default DeleteFileDialog;

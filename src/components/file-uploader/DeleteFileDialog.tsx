
import React from "react";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog";

interface DeleteFileDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const DeleteFileDialog: React.FC<DeleteFileDialogProps> = ({
  isOpen,
  onOpenChange,
  onConfirm,
}) => {
  return (
    <DeleteConfirmationDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onConfirm={onConfirm}
      title="Confirm File Deletion"
      description="Are you sure you want to delete this file? This action cannot be undone."
      confirmLabel="Delete"
      cancelLabel="Cancel"
    />
  );
};

export default DeleteFileDialog;


/**
 * DeleteFileDialog component
 * 
 * A specialized dialog for confirming file deletion operations.
 * Uses the more generic DeleteConfirmationDialog component under the hood.
 * 
 * @component
 */

import React from "react";
import { DeleteConfirmationDialog } from "@/components/file-uploader/DeleteConfirmationDialog";

interface DeleteFileDialogProps {
  /** Whether the dialog is currently open */
  isOpen: boolean;
  /** Function to handle dialog open state changes */
  onOpenChange: (open: boolean) => void;
  /** Function to call when deletion is confirmed */
  onConfirm: () => void;
  /** Custom title for the dialog (optional) */
  title?: string;
  /** Custom description for the dialog (optional) */
  description?: string;
}

/**
 * Dialog component for confirming file deletion
 * 
 * @example
 * ```tsx
 * <DeleteFileDialog
 *   isOpen={isDeleteDialogOpen}
 *   onOpenChange={setIsDeleteDialogOpen}
 *   onConfirm={handleDeleteFile}
 *   title="Delete PDF Document"
 *   description="Are you sure you want to delete this PDF? This action cannot be undone."
 * />
 * ```
 */
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

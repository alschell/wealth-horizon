
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileField } from "@/components/onboarding/common/fields";
import { itemVariants } from "../common/AnimationVariants";
import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog";

interface DocumentUploadFieldProps {
  files: File[];
  onFilesSelected: (files: File[]) => void;
}

const DocumentUploadField = ({ files, onFilesSelected }: DocumentUploadFieldProps) => {
  const [fileToDelete, setFileToDelete] = useState<{index: number, file: File} | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDeleteRequest = (index: number, file: File) => {
    setFileToDelete({ index, file });
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (fileToDelete !== null) {
      const newFiles = [...files];
      newFiles.splice(fileToDelete.index, 1);
      onFilesSelected(newFiles);
    }
    setIsConfirmOpen(false);
    setFileToDelete(null);
  };

  return (
    <motion.div 
      custom={4}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      {files.length === 0 && (
        <div className="text-center py-4 border rounded-lg bg-gray-50">
          <p className="text-gray-500">No legal documents added yet.</p>
          <p className="text-sm text-gray-400 mt-1">Please add at least one document.</p>
        </div>
      )}

      <FileField
        id="legal-documents"
        label="Upload Legal Documents"
        required={true}
        accept="application/pdf,image/*"
        multiple={true}
        hint="Supported formats: PDF, JPG, PNG (max 10MB per file)"
        onFilesChange={onFilesSelected}
        onFileDelete={handleDeleteRequest}
        customDeleteButton={true}
      />

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm File Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {fileToDelete?.file.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default DocumentUploadField;

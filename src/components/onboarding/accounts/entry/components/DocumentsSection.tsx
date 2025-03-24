
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import FileUploader from "@/components/FileUploader";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface DocumentsSectionProps {
  files: File[];
  onStatementsSelected: (files: File[]) => void;
  optional?: boolean;
}

const DocumentsSection = ({
  files,
  onStatementsSelected,
  optional = true
}: DocumentsSectionProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [fileToDeleteIndex, setFileToDeleteIndex] = useState<number | null>(null);

  const handleFileDelete = (index: number) => {
    setFileToDeleteIndex(index);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (fileToDeleteIndex !== null) {
      const newFiles = [...files];
      newFiles.splice(fileToDeleteIndex, 1);
      onStatementsSelected(newFiles);
    }
    setIsDeleteDialogOpen(false);
    setFileToDeleteIndex(null);
  };

  return (
    <div className="space-y-2">
      <Label>Account Statements{!optional && <span className="text-red-500 ml-1">*</span>}</Label>
      <FileUploader
        accept="application/pdf,image/*"
        multiple={true}
        maxSize={5}
        onFilesSelected={onStatementsSelected}
        existingFiles={files}
        label="Upload Account Statements"
        onFileDelete={handleFileDelete}
      />
      {optional && (
        <p className="text-xs text-gray-500 mt-1">This field is optional</p>
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm File Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this file? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete} 
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DocumentsSection;

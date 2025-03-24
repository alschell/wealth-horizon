
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import FileUploader from "@/components/FileUploader";
import { cn } from "@/lib/utils";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface FileFieldProps {
  id: string;
  label: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  onFilesSelected: (files: File[]) => void;
  existingFiles?: File[];
  required?: boolean;
  hint?: string;
  className?: string;
}

const FileField = ({
  id,
  label,
  accept = "application/pdf",
  multiple = false,
  maxSize = 10, // Default 10MB
  onFilesSelected,
  existingFiles = [],
  required = false,
  hint,
  className
}: FileFieldProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [fileToDeleteIndex, setFileToDeleteIndex] = useState<number | null>(null);

  const handleFileDelete = (index: number) => {
    setFileToDeleteIndex(index);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (fileToDeleteIndex !== null) {
      const newFiles = [...existingFiles];
      newFiles.splice(fileToDeleteIndex, 1);
      onFilesSelected(newFiles);
    }
    setIsDeleteDialogOpen(false);
    setFileToDeleteIndex(null);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="block mb-2">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      {hint && <p className="text-sm text-gray-500 mb-2">{hint}</p>}
      
      <FileUploader
        accept={accept}
        multiple={multiple}
        maxSize={maxSize}
        onFilesSelected={onFilesSelected}
        existingFiles={existingFiles}
        label={`Upload ${label}`}
        onFileDelete={handleFileDelete}
      />

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

export default FileField;

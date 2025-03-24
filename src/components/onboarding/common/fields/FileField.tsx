
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import FileUploader from "@/components/FileUploader";
import { cn } from "@/lib/utils";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";

interface FileFieldProps {
  id: string;
  label: string;
  accept?: string;
  multiple?: boolean;
  existingFiles?: File[];
  onFilesSelected: (files: File[]) => void;
  maxSize?: number; // in MB
  required?: boolean;
  className?: string;
}

const FileField = ({
  id,
  label,
  accept = "application/pdf",
  multiple = false,
  existingFiles = [],
  onFilesSelected,
  maxSize = 10, // Default 10MB
  required = false,
  className
}: FileFieldProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // We need to customize the props passed to FileUploader since it doesn't accept the id prop
  const handleFileDelete = () => {
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = (fileToDelete: File) => {
    const newFiles = existingFiles.filter(file => file !== fileToDelete);
    onFilesSelected(newFiles);
    setIsDeleteDialogOpen(false);
  };

  const fileUploaderProps = {
    accept,
    multiple,
    maxSize,
    onFilesSelected,
    existingFiles,
    label: `Upload ${label}`,
    onFileDelete: handleFileDelete
  };
  
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="block mb-2">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      <FileUploader {...fileUploaderProps} />
      
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
              onClick={() => confirmDelete(existingFiles[0])} 
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

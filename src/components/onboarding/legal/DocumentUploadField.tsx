
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import FileUploader from "@/components/FileUploader";
import { itemVariants } from "../common/AnimationVariants";
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

interface DocumentUploadFieldProps {
  files: File[];
  onFilesSelected: (files: File[]) => void;
}

const DocumentUploadField = ({ files, onFilesSelected }: DocumentUploadFieldProps) => {
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
      onFilesSelected(newFiles);
    }
    setIsDeleteDialogOpen(false);
    setFileToDeleteIndex(null);
  };

  return (
    <motion.div 
      custom={4}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      <Label>Document Upload<span className="text-red-500 ml-1">*</span></Label>
      <p className="text-sm text-gray-500 mb-2">
        Please upload scanned copies or PDF files of your legal documents. Include any corporate structure diagrams or ownership charts if available.
      </p>
      <FileUploader
        accept="application/pdf,image/*"
        multiple={true}
        maxSize={10}
        onFilesSelected={onFilesSelected}
        existingFiles={files}
        label="Upload Legal Documents"
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
    </motion.div>
  );
};

export default DocumentUploadField;

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { file } from "@/utils/validation";

interface UseFileUploaderProps {
  accept: string;
  multiple: boolean;
  maxSize: number;
  onFilesSelected: (files: File[]) => void;
  existingFiles?: File[];
  onFileDelete?: (index: number) => void;
  disabled?: boolean;
}

export const useFileUploader = ({
  accept,
  multiple,
  maxSize,
  onFilesSelected,
  existingFiles = [],
  onFileDelete,
  disabled = false,
}: UseFileUploaderProps) => {
  const [files, setFiles] = useState<File[]>(existingFiles);
  const [isDragging, setIsDragging] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [fileToDeleteIndex, setFileToDeleteIndex] = useState<number | null>(null);

  // Validates a single file
  const validateFile = useCallback(
    (file: File): string | null => {
      // Check file size
      const sizeResult = file.size.validate ? file.size.validate(file, maxSize) : null;
      if (sizeResult && !sizeResult.valid) return sizeResult.message || "File size exceeds limit";

      // Convert accept string to an array of file extensions
      const acceptedTypes = accept
        .split(",")
        .map((type) => {
          if (type.startsWith(".")) return type;
          if (type.includes("/*")) return `.${type.split("/")[0]}`;
          return `.${type.split("/").pop()}`;
        })
        .filter(Boolean);

      // Check file type
      const typeResult = file.type.validate ? file.type.validate(file, acceptedTypes) : null;
      return typeResult && !typeResult.valid ? typeResult.message : null;
    },
    [accept, maxSize]
  );

  // Handles file input change
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      
      const selectedFiles = Array.from(e.target.files || []);
      let validFiles: File[] = [];
      let hasErrors = false;

      selectedFiles.forEach((file) => {
        const error = validateFile(file);
        if (error) {
          toast.error(error);
          hasErrors = true;
        } else {
          validFiles.push(file);
        }
      });

      if (validFiles.length > 0) {
        const newFiles = multiple ? [...files, ...validFiles] : validFiles;
        setFiles(newFiles);
        onFilesSelected(newFiles);
        
        // Clear the input value to allow uploading the same file again
        e.target.value = '';
      } else if (!hasErrors && selectedFiles.length > 0) {
        toast.error("No valid files were selected");
      }
    },
    [files, multiple, onFilesSelected, validateFile, disabled]
  );

  // Handles drag over event
  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      if (disabled) return;
      
      e.preventDefault();
      setIsDragging(true);
    },
    [disabled]
  );

  // Handles drag leave event
  const handleDragLeave = useCallback(
    () => {
      if (disabled) return;
      
      setIsDragging(false);
    },
    [disabled]
  );

  // Handles drop event
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      if (disabled) return;
      
      e.preventDefault();
      setIsDragging(false);

      const droppedFiles = Array.from(e.dataTransfer.files);
      let validFiles: File[] = [];
      let hasErrors = false;

      droppedFiles.forEach((file) => {
        const error = validateFile(file);
        if (error) {
          toast.error(error);
          hasErrors = true;
        } else {
          validFiles.push(file);
        }
      });

      if (validFiles.length > 0) {
        const newFiles = multiple ? [...files, ...validFiles] : validFiles;
        setFiles(newFiles);
        onFilesSelected(newFiles);
      } else if (!hasErrors && droppedFiles.length > 0) {
        toast.error("No valid files were dropped");
      }
    },
    [files, multiple, onFilesSelected, validateFile, disabled]
  );

  // Handles delete button click
  const handleDeleteClick = useCallback(
    (index: number) => {
      if (disabled) return;
      
      setFileToDeleteIndex(index);
      setIsDeleteDialogOpen(true);
    },
    [disabled]
  );

  // Confirms file deletion
  const confirmDelete = useCallback(() => {
    if (fileToDeleteIndex === null) return;

    if (onFileDelete) {
      onFileDelete(fileToDeleteIndex);
    } else {
      const newFiles = [...files];
      newFiles.splice(fileToDeleteIndex, 1);
      setFiles(newFiles);
      onFilesSelected(newFiles);
    }

    setIsDeleteDialogOpen(false);
    setFileToDeleteIndex(null);

    toast.success("File removed successfully");
  }, [fileToDeleteIndex, files, onFileDelete, onFilesSelected]);

  return {
    files,
    isDragging,
    isDeleteDialogOpen,
    handleFileChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDeleteClick,
    confirmDelete,
    setIsDeleteDialogOpen,
  };
};

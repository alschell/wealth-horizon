
import { useState, useCallback } from "react";
import { validateFileSize, validateFileType } from "@/utils/validation";
import { toast } from "@/components/ui/use-toast";

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
  disabled = false
}: UseFileUploaderProps) => {
  const [files, setFiles] = useState<File[]>(existingFiles);
  const [isDragging, setIsDragging] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<number | null>(null);

  // Convert accept string to array of file extensions for validation
  const acceptedTypes = accept.split(',').map(type => type.trim());

  // Validate selected files
  const validateFiles = useCallback((selectedFiles: File[]): File[] => {
    const validFiles: File[] = [];
    const maxSizeBytes = maxSize * 1024 * 1024;

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      
      // Check file size
      const sizeError = validateFileSize(file, maxSize);
      if (sizeError) {
        toast({
          title: "File too large",
          description: sizeError,
          variant: "destructive"
        });
        continue;
      }
      
      // Check file type
      const typeError = validateFileType(file, acceptedTypes);
      if (typeError) {
        toast({
          title: "Invalid file type",
          description: typeError,
          variant: "destructive"
        });
        continue;
      }
      
      validFiles.push(file);
    }

    return validFiles;
  }, [maxSize, acceptedTypes]);

  // Handle file input change event
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || !e.target.files || e.target.files.length === 0) return;
    
    const selectedFiles = Array.from(e.target.files);
    const validFiles = validateFiles(selectedFiles);
    
    if (validFiles.length > 0) {
      const newFiles = multiple ? [...files, ...validFiles] : validFiles;
      setFiles(newFiles);
      onFilesSelected(newFiles);
      
      toast({
        title: `${validFiles.length} file${validFiles.length > 1 ? 's' : ''} added`,
        description: "Files have been successfully added."
      });
    }
  }, [files, multiple, onFilesSelected, validateFiles, disabled]);

  // Handle drag events
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback(() => {
    if (disabled) return;
    setIsDragging(false);
  }, [disabled]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragging(false);
    
    if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return;
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = validateFiles(droppedFiles);
    
    if (validFiles.length > 0) {
      const newFiles = multiple ? [...files, ...validFiles] : validFiles;
      setFiles(newFiles);
      onFilesSelected(newFiles);
      
      toast({
        title: `${validFiles.length} file${validFiles.length > 1 ? 's' : ''} added`,
        description: "Files have been successfully added."
      });
    }
  }, [files, multiple, onFilesSelected, validateFiles, disabled]);

  // Handle delete operations
  const handleDeleteClick = useCallback((index: number) => {
    setFileToDelete(index);
    setIsDeleteDialogOpen(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (fileToDelete === null) return;
    
    const newFiles = [...files];
    newFiles.splice(fileToDelete, 1);
    setFiles(newFiles);
    
    if (onFileDelete) {
      onFileDelete(fileToDelete);
    }
    
    onFilesSelected(newFiles);
    setIsDeleteDialogOpen(false);
    setFileToDelete(null);
    
    toast({
      title: "File removed",
      description: "The file has been successfully removed."
    });
  }, [fileToDelete, files, onFileDelete, onFilesSelected]);

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
    setIsDeleteDialogOpen
  };
};

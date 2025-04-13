
import { useState, useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { sanitizeFileName } from "@/utils/security";

// Constants for file validation
const MIME_TYPE_MAP: Record<string, string[]> = {
  // Images
  'image/*': ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
  // Documents
  'application/pdf': ['application/pdf'],
  '.doc': ['application/msword'],
  '.docx': ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  // Excel
  'application/vnd.ms-excel': ['application/vnd.ms-excel'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
};

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
  const [fileToDeleteIndex, setFileToDeleteIndex] = useState<number | null>(null);

  // Validate file type
  const validateFileType = useCallback((file: File): boolean => {
    // Get the file extension
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const fileExtWithDot = fileExt ? `.${fileExt}` : '';
    
    // Check if file type is valid
    const acceptTypes = accept.split(',');
    
    // First check by MIME type
    for (const type of acceptTypes) {
      // Check for direct MIME type match
      if (type === file.type) {
        return true;
      }
      
      // Check for wildcard MIME type match (e.g., image/*)
      if (type.endsWith('*') && file.type.startsWith(type.split('*')[0])) {
        return true;
      }
      
      // Check by extension
      if (type.startsWith('.') && fileExtWithDot === type) {
        return true;
      }
      
      // Check with MIME type mapping
      if (MIME_TYPE_MAP[type] && MIME_TYPE_MAP[type].includes(file.type)) {
        return true;
      }
    }
    
    return false;
  }, [accept]);

  // Process files
  const processFiles = useCallback((selectedFiles: File[]) => {
    if (disabled) return;
    
    const validFiles = selectedFiles.filter(file => {
      const sanitizedName = sanitizeFileName(file.name);
      
      // Validate file size
      const isValidSize = file.size <= maxSize * 1024 * 1024;
      if (!isValidSize) {
        toast({
          title: "File too large",
          description: `${sanitizedName} exceeds the ${maxSize}MB limit.`,
          variant: "destructive"
        });
        return false;
      }
      
      // Validate file type
      const isValidType = validateFileType(file);
      if (!isValidType) {
        toast({
          title: "Invalid file type",
          description: `${sanitizedName} is not a supported file type.`,
          variant: "destructive"
        });
        return false;
      }
      
      return true;
    });

    if (validFiles.length) {
      const newFiles = multiple ? [...files, ...validFiles] : validFiles;
      setFiles(newFiles);
      onFilesSelected(newFiles);
      
      const fileCount = validFiles.length;
      toast({
        title: "Files uploaded",
        description: `${fileCount} ${fileCount === 1 ? 'file' : 'files'} successfully added.`,
      });
    }
  }, [disabled, files, maxSize, multiple, onFilesSelected, validateFileType]);

  // Handle file change
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const selectedFiles = Array.from(event.target.files || []);
    processFiles(selectedFiles);
  }, [disabled, processFiles]);

  // Handle drag events
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (!disabled) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      processFiles(droppedFiles);
    }
  }, [disabled, processFiles]);

  // Handle delete
  const handleDeleteClick = useCallback((index: number) => {
    setFileToDeleteIndex(index);
    setIsDeleteDialogOpen(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (fileToDeleteIndex !== null) {
      const newFiles = [...files];
      newFiles.splice(fileToDeleteIndex, 1);
      setFiles(newFiles);
      onFilesSelected(newFiles);
      
      if (onFileDelete) {
        onFileDelete(fileToDeleteIndex);
      }
    }
    setIsDeleteDialogOpen(false);
    setFileToDeleteIndex(null);
  }, [fileToDeleteIndex, files, onFileDelete, onFilesSelected]);

  return {
    files,
    isDragging,
    isDeleteDialogOpen,
    fileToDeleteIndex,
    handleFileChange,
    handleDragOver,
    handleDragLeave, 
    handleDrop,
    handleDeleteClick,
    confirmDelete,
    setIsDeleteDialogOpen
  };
};

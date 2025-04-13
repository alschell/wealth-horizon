
import { useState, useRef } from "react";
import { toast } from "@/components/ui/use-toast";
import DropZone from "./DropZone";
import FileList from "./FileList";
import DeleteFileDialog from "./DeleteFileDialog";

// Constants for file validation
const DEFAULT_MAX_SIZE = 10; // 10MB
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

interface FileUploaderProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  onFilesSelected: (files: File[]) => void;
  existingFiles?: File[];
  label?: string;
  onFileDelete?: (index: number) => void;
  customFileDeleteButton?: (file: any) => React.ReactNode;
  disabled?: boolean;
}

const FileUploader = ({
  accept = "application/pdf,image/*,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  multiple = true,
  maxSize = DEFAULT_MAX_SIZE,
  onFilesSelected,
  existingFiles = [],
  label = "Upload Documents",
  onFileDelete,
  customFileDeleteButton,
  disabled = false
}: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>(existingFiles);
  const [isDragging, setIsDragging] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [fileToDeleteIndex, setFileToDeleteIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sanitizeFileName = (filename: string): string => {
    return filename.replace(/[^a-zA-Z0-9.-_\s]/g, '');
  };

  const validateFileType = (file: File): boolean => {
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
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const selectedFiles = Array.from(event.target.files || []);
    processFiles(selectedFiles);
  };

  const processFiles = (selectedFiles: File[]) => {
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
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (!disabled) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      processFiles(droppedFiles);
    }
  };

  const handleDeleteClick = (index: number) => {
    setFileToDeleteIndex(index);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
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
  };

  const openFileDialog = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full space-y-4">
      <DropZone
        label={label}
        accept={accept}
        maxSize={maxSize}
        isDragging={isDragging}
        onClick={openFileDialog}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        disabled={disabled}
      />
      
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        multiple={multiple}
        accept={accept}
        onChange={handleFileChange}
        disabled={disabled}
        aria-label="File input"
      />
      
      <FileList 
        files={files} 
        onDeleteClick={handleDeleteClick} 
        customFileDeleteButton={customFileDeleteButton}
      />

      <DeleteFileDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default FileUploader;

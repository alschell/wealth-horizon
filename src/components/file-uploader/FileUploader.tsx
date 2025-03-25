
import { useState, useRef } from "react";
import { toast } from "@/components/ui/use-toast";
import DropZone from "./DropZone";
import FileList from "./FileList";
import DeleteFileDialog from "./DeleteFileDialog";

interface FileUploaderProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  onFilesSelected: (files: File[]) => void;
  existingFiles?: File[];
  label?: string;
  onFileDelete?: (index: number) => void;
}

const FileUploader = ({
  accept = "application/pdf,image/*,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  multiple = true,
  maxSize = 10, // 10MB default max size
  onFilesSelected,
  existingFiles = [],
  label = "Upload Documents",
  onFileDelete
}: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>(existingFiles);
  const [isDragging, setIsDragging] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [fileToDeleteIndex, setFileToDeleteIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    processFiles(selectedFiles);
  };

  const processFiles = (selectedFiles: File[]) => {
    const validFiles = selectedFiles.filter(file => {
      // Check file size
      const isValidSize = file.size <= maxSize * 1024 * 1024;
      if (!isValidSize) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the ${maxSize}MB limit.`,
          variant: "destructive"
        });
        return false;
      }
      
      // Parse the accept string to proper format for validation
      const acceptTypes = accept.split(',').map(type => {
        // Convert file extensions to MIME types
        if (type.startsWith('.')) {
          switch (type.toLowerCase()) {
            case '.pdf': return 'application/pdf';
            case '.doc': return 'application/msword';
            case '.docx': return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            case '.jpg':
            case '.jpeg': return 'image/jpeg';
            case '.png': return 'image/png';
            default: return type;
          }
        }
        return type;
      });
      
      // Check if file type is acceptable
      const fileType = file.type;
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      
      const isValidType = acceptTypes.some(type => {
        // Handle file extensions for cases where browser doesn't provide MIME type
        if (type.includes('*')) {
          return fileType.startsWith(type.split('*')[0]);
        }
        // Check for extension match if no MIME type is available
        if (!fileType && fileExt) {
          if (accept.includes(`.${fileExt}`)) {
            return true;
          }
        }
        return type === fileType;
      });
      
      if (!isValidType) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported file type.`,
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
      
      toast({
        title: "Files uploaded",
        description: `${validFiles.length} ${validFiles.length === 1 ? 'file' : 'files'} successfully added.`,
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
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
      
      // If a custom delete handler was provided, call it as well
      if (onFileDelete) {
        onFileDelete(fileToDeleteIndex);
      }
    }
    setIsDeleteDialogOpen(false);
    setFileToDeleteIndex(null);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
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
      />
      
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        multiple={multiple}
        accept={accept}
        onChange={handleFileChange}
      />
      
      <FileList 
        files={files} 
        onDeleteClick={handleDeleteClick} 
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

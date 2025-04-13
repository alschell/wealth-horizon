
import { useRef, useState } from "react";
import DropZone from "./DropZone";
import FileList from "./FileList";
import DeleteFileDialog from "./DeleteFileDialog";
import { useFileUploader } from "./useFileUploader";
import { Progress } from "@/components/ui/progress";

// Default max size in MB
const DEFAULT_MAX_SIZE = 10;

interface FileUploaderProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; 
  onFilesSelected: (files: File[]) => void;
  existingFiles?: File[];
  label?: string;
  onFileDelete?: (index: number) => void;
  customFileDeleteButton?: (file: any) => React.ReactNode;
  disabled?: boolean;
  showProgress?: boolean;
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
  disabled = false,
  showProgress = false
}: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const uploadId = `file-upload-${Math.random().toString(36).substring(2, 9)}`;
  const progressId = `upload-progress-${Math.random().toString(36).substring(2, 9)}`;
  
  const {
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
  } = useFileUploader({
    accept,
    multiple,
    maxSize,
    onFilesSelected: (selectedFiles) => {
      if (showProgress && selectedFiles.length > 0) {
        // Simulate file upload progress - in a real app this would be based on actual upload progress
        setIsUploading(true);
        setUploadProgress(0);
        
        const interval = setInterval(() => {
          setUploadProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              setTimeout(() => {
                setIsUploading(false);
                onFilesSelected(selectedFiles);
              }, 500);
              return 100;
            }
            return prev + 5;
          });
        }, 100);
      } else {
        onFilesSelected(selectedFiles);
      }
    },
    existingFiles,
    onFileDelete,
    disabled
  });

  const openFileDialog = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full space-y-4" aria-label="File upload area">
      <DropZone
        label={label}
        accept={accept}
        maxSize={maxSize}
        isDragging={isDragging}
        onClick={openFileDialog}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        disabled={disabled || isUploading}
      />
      
      <input
        id={uploadId}
        type="file"
        ref={fileInputRef}
        className="hidden"
        multiple={multiple}
        accept={accept}
        onChange={handleFileChange}
        disabled={disabled || isUploading}
        aria-label="File input"
      />
      
      {isUploading && showProgress && (
        <div className="space-y-2" aria-live="polite" aria-busy="true">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Uploading...</span>
            <span id={progressId}>{uploadProgress}%</span>
          </div>
          <Progress 
            value={uploadProgress} 
            className="h-2" 
            aria-labelledby={progressId}
          />
        </div>
      )}
      
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

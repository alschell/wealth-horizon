
import { useRef } from "react";
import DropZone from "./DropZone";
import FileList from "./FileList";
import DeleteFileDialog from "./DeleteFileDialog";
import { useFileUploader } from "./useFileUploader";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
    onFilesSelected,
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

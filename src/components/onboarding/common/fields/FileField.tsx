
import React, { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { DeleteButton } from "@/components/ui/action-buttons";
import { cn } from "@/lib/utils";
import FileUploader from "@/components/file-uploader";

interface FileFieldProps {
  id?: string;
  label: string;
  value?: File[];
  required?: boolean;
  error?: string;
  accept?: string;
  multiple?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilesChange?: (files: File[]) => void;
  hint?: string;
  className?: string;
  files?: File[];
  onFilesSelected?: (files: File[]) => void;
  customClass?: string;
  disabled?: boolean;
  onFileDelete?: (index: number, file: File) => void;
  customDeleteButton?: boolean;
}

const FileField = ({
  id,
  label,
  required = false,
  error,
  accept = "application/pdf,image/*",
  multiple = false,
  onFilesChange,
  hint,
  className,
  files = [],
  onFilesSelected,
  disabled = false,
  onFileDelete,
  customDeleteButton = false
}: FileFieldProps) => {
  const [localFiles, setLocalFiles] = useState<File[]>(files);

  const handleFilesChange = (updatedFiles: File[]) => {
    setLocalFiles(updatedFiles);
    
    if (onFilesChange) {
      onFilesChange(updatedFiles);
    }
    
    if (onFilesSelected) {
      onFilesSelected(updatedFiles);
    }
  };

  const handleDelete = (index: number) => {
    if (onFileDelete) {
      onFileDelete(index, localFiles[index]);
      return;
    }
    
    const updatedFiles = [...localFiles];
    updatedFiles.splice(index, 1);
    
    handleFilesChange(updatedFiles);
  };

  const customDeleteButtonFn = customDeleteButton 
    ? (file: File, index: number) => (
        <DeleteButton onClick={() => handleDelete(index)} />
      )
    : undefined;

  // Use files prop if provided, otherwise use localFiles
  const displayFiles = files.length > 0 ? files : localFiles;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        <Label htmlFor={id} className="text-black">
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      </div>
      
      <FileUploader
        onFilesSelected={handleFilesChange}
        files={displayFiles}
        multiple={multiple}
        accept={accept}
        label={hint || `${accept.replace(/,/g, ', ')} ${multiple ? '(multiple)' : ''}`}
        maxSizeMB={5}
        disabled={disabled}
      />
      
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default FileField;

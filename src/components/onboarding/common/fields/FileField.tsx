
import React, { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { DeleteButton } from "@/components/ui/action-buttons";
import { cn } from "@/lib/utils";

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
  disabled = false,
  onFileDelete,
  customDeleteButton = false
}: FileFieldProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [localFiles, setLocalFiles] = useState<File[]>(files);

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const updatedFiles = multiple ? [...localFiles, ...selectedFiles] : selectedFiles;
    
    setLocalFiles(updatedFiles);
    
    if (onFilesChange) {
      onFilesChange(updatedFiles);
    }
  };

  const handleDelete = (index: number) => {
    if (onFileDelete && customDeleteButton) {
      onFileDelete(index, localFiles[index]);
      return;
    }
    
    const updatedFiles = [...localFiles];
    updatedFiles.splice(index, 1);
    
    setLocalFiles(updatedFiles);
    
    if (onFilesChange) {
      onFilesChange(updatedFiles);
    }
  };

  // Use files prop if provided, otherwise use localFiles
  const displayFiles = files.length > 0 ? files : localFiles;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        <Label htmlFor={id} className="text-black">
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      </div>
      
      <div 
        className={cn(
          "border-2 border-dashed rounded-lg p-4 transition-colors cursor-pointer",
          error ? "border-red-500" : "border-gray-300 hover:border-gray-400",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onClick={handleClick}
      >
        <div className="flex flex-col items-center justify-center py-4">
          <Upload className="h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm font-medium text-black">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-500 mt-1">{hint || `${accept.replace(/,/g, ', ')} ${multiple ? '(multiple)' : ''}`}</p>
        </div>
        
        <input
          ref={fileInputRef}
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={handleChange}
          disabled={disabled}
        />
      </div>
      
      {displayFiles.length > 0 && (
        <div className="mt-2 space-y-2">
          {displayFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
              <div className="flex items-center space-x-2 flex-1 mr-2 truncate">
                <div className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">
                    {file.name.split('.').pop()?.toUpperCase()}
                  </span>
                </div>
                <div className="truncate flex-1">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <DeleteButton onClick={() => handleDelete(index)} />
            </div>
          ))}
        </div>
      )}
      
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default FileField;

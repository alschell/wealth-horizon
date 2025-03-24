
import React from "react";
import { Label } from "@/components/ui/label";
import FileUploader from "@/components/FileUploader";
import { cn } from "@/lib/utils";

interface FileFieldProps {
  id: string;
  label: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  onFilesSelected: (files: File[]) => void;
  existingFiles?: File[];
  required?: boolean;
  hint?: string;
  className?: string;
}

const FileField = ({
  id,
  label,
  accept = "application/pdf",
  multiple = false,
  maxSize = 10, // Default 10MB
  onFilesSelected,
  existingFiles = [],
  required = false,
  hint,
  className
}: FileFieldProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="block mb-2">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      {hint && <p className="text-sm text-gray-500 mb-2">{hint}</p>}
      
      <FileUploader
        accept={accept}
        multiple={multiple}
        maxSize={maxSize}
        onFilesSelected={onFilesSelected}
        existingFiles={existingFiles}
        label={`Upload ${label}`}
      />
    </div>
  );
};

export default FileField;

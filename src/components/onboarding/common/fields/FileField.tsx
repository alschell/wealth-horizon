
import React from "react";
import { Label } from "@/components/ui/label";
import FileUploader from "@/components/FileUploader";
import { cn } from "@/lib/utils";

interface FileFieldProps {
  id?: string;
  label: string;
  files: File[];
  onFilesSelected: (files: File[]) => void;
  required?: boolean;
  error?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  className?: string;
}

const FileField = ({
  id,
  label,
  files,
  onFilesSelected,
  required = false,
  error,
  accept = "application/pdf,image/*",
  multiple = true,
  maxSize = 5,
  className
}: FileFieldProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={id}>
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <div className={cn(error ? "border border-red-500 rounded-md p-1" : "")}>
        <FileUploader
          accept={accept}
          multiple={multiple}
          maxSize={maxSize}
          onFilesSelected={onFilesSelected}
          existingFiles={files}
          label={`Upload ${label ? label.toLowerCase() : 'documents'}`}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default FileField;


import React from "react";
import { Label } from "@/components/ui/label";
import FileUploader from "@/components/file-uploader";
import { Button } from "@/components/ui/button";
import { Trash2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocumentUploadFieldProps {
  file: File | null;
  onFileSelected: (files: File[]) => void;
  onFileClear?: () => void;
  error?: boolean;
  errorMessage?: string | null;
  documentType?: string;
  onFileDelete?: () => void;
  disabled?: boolean;
  accept?: string;
  maxSize?: number;
  label?: string;
}

const DocumentUploadField: React.FC<DocumentUploadFieldProps> = ({ 
  file, 
  onFileSelected,
  onFileClear,
  error,
  errorMessage,
  documentType,
  onFileDelete,
  disabled = false,
  accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png",
  maxSize = 10,
  label = "Upload Legal Document"
}) => {
  const existingFiles = file ? [file] : [];
  
  const handleCustomFileDelete = () => {
    if (onFileDelete) {
      onFileDelete();
    } else if (onFileClear) {
      onFileClear();
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="documentFile">
        {label}<span className="text-red-500 ml-1" aria-hidden="true">*</span>
      </Label>
      <div 
        className={cn(
          "border rounded-md p-4",
          error ? "border-red-500" : "",
          errorMessage ? "border-red-500" : ""
        )}
      >
        <FileUploader
          accept={accept}
          multiple={false}
          maxSize={maxSize}
          onFilesSelected={onFileSelected}
          existingFiles={existingFiles}
          label={label}
          disabled={disabled}
          customFileDeleteButton={(file) => (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-red-500 p-2 h-auto"
              onClick={handleCustomFileDelete}
              aria-label="Remove document"
              disabled={disabled}
            >
              <Trash2 className="h-5 w-5" />
              <span className="sr-only">Remove document</span>
            </Button>
          )}
        />
      </div>
      
      {error && (
        <p className="text-sm font-medium text-red-500 flex items-center gap-1" aria-live="polite">
          <AlertCircle className="h-4 w-4" />
          Please upload a document
        </p>
      )}
      
      {errorMessage && (
        <p className="text-sm font-medium text-red-500 flex items-center gap-1" aria-live="polite">
          <AlertCircle className="h-4 w-4" />
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default DocumentUploadField;


import React from "react";
import { Label } from "@/components/ui/label";
import FileUploader from "@/components/file-uploader";
import { cn } from "@/lib/utils";

interface DocumentUploadFieldProps {
  file: File | null;
  onFileSelected: (files: File[]) => void;
  error?: boolean;
  documentType?: string;
  onFileDelete?: () => void;
}

const DocumentUploadField: React.FC<DocumentUploadFieldProps> = ({ 
  file, 
  onFileSelected,
  error,
  documentType,
  onFileDelete
}) => {
  const existingFiles = file ? [file] : [];
  
  const handleFileDelete = () => {
    if (onFileDelete) {
      onFileDelete();
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="documentFile">
        Upload Legal Document<span className="text-red-500 ml-1">*</span>
      </Label>
      <div 
        className={cn(
          "border rounded-md p-4",
          error && "border-red-500"
        )}
      >
        <FileUploader
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          multiple={false}
          maxSize={10}
          onFilesSelected={onFileSelected}
          existingFiles={existingFiles}
          label="Upload Legal Document"
          onFileDelete={handleFileDelete}
        />
      </div>
      
      {error && (
        <p className="text-sm font-medium text-red-500">
          Please upload a document
        </p>
      )}
    </div>
  );
};

export default DocumentUploadField;

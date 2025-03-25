
import React from "react";
import { Label } from "@/components/ui/label";
import FileUploader from "@/components/file-uploader";
import { cn } from "@/lib/utils";

interface DocumentUploadFieldProps {
  files: File[];
  onFilesSelected: (files: File[]) => void;
  error?: boolean;
  documentType?: string;
}

const DocumentUploadField: React.FC<DocumentUploadFieldProps> = ({ 
  files, 
  onFilesSelected,
  error,
  documentType
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="documentFiles">
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
          onFilesSelected={onFilesSelected}
          existingFiles={files}
          label="Upload Legal Document"
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

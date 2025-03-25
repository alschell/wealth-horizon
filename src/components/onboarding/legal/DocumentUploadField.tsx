
import React from "react";
import { Label } from "@/components/ui/label";
import { FileUploader } from "@/components/file-uploader";
import { cn } from "@/lib/utils";

interface DocumentUploadFieldProps {
  files: File[];
  onFilesSelected: (files: File[]) => void;
  error?: boolean;
}

const DocumentUploadField: React.FC<DocumentUploadFieldProps> = ({ 
  files, 
  onFilesSelected,
  error 
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="documentFiles">
        Upload Documents<span className="text-red-500 ml-1">*</span>
      </Label>
      <div 
        className={cn(
          "border rounded-md p-4",
          error && "border-red-500"
        )}
      >
        <FileUploader
          id="documentFiles"
          value={files}
          onChange={onFilesSelected}
          accept={[".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"]}
          maxFiles={5}
          maxSize={10}
        />
      </div>
      {error && (
        <p className="text-sm font-medium text-red-500">
          Please upload at least one document
        </p>
      )}
    </div>
  );
};

export default DocumentUploadField;

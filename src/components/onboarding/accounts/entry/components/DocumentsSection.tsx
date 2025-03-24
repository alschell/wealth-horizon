
import React from "react";
import { Label } from "@/components/ui/label";
import FileUploader from "@/components/FileUploader";

interface DocumentsSectionProps {
  files: File[];
  onFilesSelected: (files: File[]) => void;
  optional?: boolean;
}

const DocumentsSection = ({
  files,
  onFilesSelected,
  optional = false
}: DocumentsSectionProps) => {
  return (
    <div className="space-y-3">
      <Label>Account Statements{!optional && <span className="text-red-500 ml-1">*</span>}</Label>
      <FileUploader
        accept="application/pdf,image/*"
        multiple={true}
        maxSize={5}
        onFilesSelected={onFilesSelected}
        existingFiles={files}
        label="Upload Account Statements"
      />
      {optional && (
        <p className="text-xs text-gray-500 mt-1">This field is optional</p>
      )}
    </div>
  );
};

export default DocumentsSection;

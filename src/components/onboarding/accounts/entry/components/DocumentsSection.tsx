
import React from "react";
import { Label } from "@/components/ui/label";
import FileUploader from "@/components/FileUploader";

interface DocumentsSectionProps {
  files: File[];
  onStatementsSelected: (files: File[]) => void;
}

const DocumentsSection = ({
  files,
  onStatementsSelected
}: DocumentsSectionProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="statements" className="flex items-center">
        Account Statements
        <span className="text-red-500 ml-1">*</span>
      </Label>
      
      <FileUploader
        accept="application/pdf,image/*"
        multiple={true}
        maxSize={5}
        onFilesSelected={onStatementsSelected}
        existingFiles={files}
        label="Upload Account Statements"
      />
    </div>
  );
};

export default DocumentsSection;

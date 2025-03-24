
import React from "react";
import { Label } from "@/components/ui/label";
import FileUploader from "@/components/FileUploader";

interface DocumentsSectionProps {
  files: File[];
  onFilesSelected: (files: File[]) => void;
}

const DocumentsSection = ({
  files,
  onFilesSelected
}: DocumentsSectionProps) => {
  return (
    <div className="space-y-3">
      <Label>Account Statements</Label>
      <FileUploader
        accept="application/pdf,image/*"
        multiple={true}
        maxSize={5}
        onFilesSelected={onFilesSelected}
        existingFiles={files}
        label="Upload Account Statements"
      />
    </div>
  );
};

export default DocumentsSection;

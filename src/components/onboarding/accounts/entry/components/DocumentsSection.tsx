
import React from "react";
import { FileField } from "@/components/onboarding/accounts/fields";

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
      <div className="space-y-1">
        <p className="text-sm text-gray-500">
          Upload your most recent account statements to continue.
        </p>
      </div>
      
      <FileField
        label="Account Statements"
        files={files}
        onFilesSelected={onStatementsSelected}
        optional={false}
        hint="Supported formats: PDF, JPG, PNG (max 5MB per file)"
      />
    </div>
  );
};

export default DocumentsSection;

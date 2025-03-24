
import React from "react";
import { FileField } from "@/components/onboarding/accounts/fields";

interface DocumentsSectionProps {
  files: File[];
  onStatementsSelected: (files: File[]) => void;
  optional?: boolean;
}

const DocumentsSection = ({
  files,
  onStatementsSelected,
  optional = true
}: DocumentsSectionProps) => {
  return (
    <div className="space-y-2">
      <FileField
        label="Account Statements"
        files={files}
        onFilesSelected={onStatementsSelected}
        optional={!optional}
        hint="Upload your account statements in PDF or image format"
      />
    </div>
  );
};

export default DocumentsSection;

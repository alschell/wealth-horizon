
import React from "react";
import { FileField } from "@/components/onboarding/common/fields";

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
        id="account-statements"
        label="Account Statements"
        required={!optional}
        accept="application/pdf,image/*"
        multiple={true}
        hint="Upload your account statements in PDF or image format"
        onFilesChange={onStatementsSelected}
      />
    </div>
  );
};

export default DocumentsSection;

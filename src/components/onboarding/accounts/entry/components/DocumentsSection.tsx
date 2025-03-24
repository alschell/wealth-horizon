
import React from "react";
import { Label } from "@/components/ui/label";
import { FileField } from "@/components/onboarding/common/fields";

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
        <Label>Account Statements<span className="text-red-500 ml-1">*</span></Label>
        <p className="text-sm text-gray-500">
          Upload your most recent account statements to continue.
        </p>
      </div>
      
      <FileField
        id="account-statements"
        label="Upload Account Statements"
        required={true}
        accept="application/pdf,image/*"
        multiple={true}
        hint="Supported formats: PDF, JPG, PNG (max 5MB per file)"
        onFilesChange={onStatementsSelected}
      />
    </div>
  );
};

export default DocumentsSection;

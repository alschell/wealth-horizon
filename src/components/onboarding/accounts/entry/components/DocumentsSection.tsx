
import React from "react";
import { FileField } from "@/components/onboarding/accounts/fields";
import { FinancialAccountInfo } from "@/types/onboarding";

interface DocumentsSectionProps {
  account: FinancialAccountInfo;
  onFilesSelected: (files: File[]) => void;
}

const DocumentsSection: React.FC<DocumentsSectionProps> = ({
  account,
  onFilesSelected
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Account Statements</h3>
      
      <div className="space-y-2">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">
            Upload your most recent account statements to continue.
          </p>
        </div>
        
        <FileField
          label="Account Statements"
          files={account.statements || []}
          onFilesSelected={onFilesSelected}
          optional={false}
          hint="Supported formats: PDF, JPG, PNG (max 5MB per file)"
        />
      </div>
    </div>
  );
};

export default DocumentsSection;

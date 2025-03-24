
import React from "react";
import { FileField } from "../fields";

interface DocumentsSectionProps {
  files: File[];
  onStatementsSelected: (files: File[]) => void;
  optional?: boolean;
}

const DocumentsSection = ({
  files,
  onStatementsSelected,
  optional = false
}: DocumentsSectionProps) => {
  return (
    <div className="space-y-2">
      <FileField
        label="Account Statements"
        files={files}
        onFilesSelected={onStatementsSelected}
        optional={optional}
      />
      {optional && (
        <p className="text-xs text-gray-500 mt-1">This field is optional</p>
      )}
    </div>
  );
};

export default DocumentsSection;

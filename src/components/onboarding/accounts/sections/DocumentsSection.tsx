
import React from "react";
import { FileField } from "../fields";

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
      <FileField
        label="Account Statements"
        files={files}
        onFilesSelected={onStatementsSelected}
      />
    </div>
  );
};

export default DocumentsSection;

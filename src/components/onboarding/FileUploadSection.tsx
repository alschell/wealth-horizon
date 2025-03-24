
import React from "react";
import { Label } from "@/components/ui/label";
import { FileField } from "@/components/onboarding/common/fields";

interface FileUploadSectionProps {
  uploadedFiles: File[];
  handleBulkFilesSelected: (files: File[]) => void;
}

const FileUploadSection = ({
  uploadedFiles,
  handleBulkFilesSelected
}: FileUploadSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Upload Financial Statements</Label>
        
        <FileField
          id="financial-statements"
          label="Upload Spreadsheets or PDFs"
          required={false}
          accept=".xlsx,.xls,.csv,.pdf,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          multiple={true}
          hint="You can upload Excel files, CSVs or PDFs (max 10MB per file)"
          onFilesChange={handleBulkFilesSelected}
        />
      </div>

      <div className="mt-4 p-4 bg-white border-2 border-black rounded-md">
        <p className="text-sm text-black">
          <strong>Tip:</strong> You can upload bank statements, portfolio reports, or spreadsheets 
          containing your financial account information. We'll help you organize this data 
          for easy portfolio management.
        </p>
      </div>
    </div>
  );
};

export default FileUploadSection;

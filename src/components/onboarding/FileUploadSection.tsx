
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
        
        {uploadedFiles.length === 0 && (
          <div className="text-center py-4 border rounded-lg bg-gray-50 mb-4">
            <p className="text-gray-500">No files uploaded yet.</p>
            <p className="text-sm text-gray-400 mt-1">Please upload at least one file.</p>
          </div>
        )}
        
        <FileField
          id="financial-statements"
          label=""
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

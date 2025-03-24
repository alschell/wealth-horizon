
import React from "react";
import { Label } from "@/components/ui/label";
import FileUploader from "@/components/FileUploader";

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
        <FileUploader
          accept=".xlsx,.xls,.csv,.pdf,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          multiple={true}
          maxSize={10}
          onFilesSelected={handleBulkFilesSelected}
          existingFiles={uploadedFiles}
          label="Upload Spreadsheets or PDFs"
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

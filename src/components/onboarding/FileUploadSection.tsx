
import { Upload } from "lucide-react";
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
    <div className="space-y-4 mt-4">
      <div className="flex items-center gap-2">
        <Upload className="h-5 w-5 text-gray-500" />
        <h3 className="font-medium">Upload Financial Documents</h3>
      </div>
      
      <p className="text-gray-500 text-sm">
        Upload your financial statements, CSV exports, or other documents containing your account information.
        We'll process these files to extract your financial data.
      </p>
      
      <FileUploader
        accept=".csv,.pdf,.xlsx,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
        multiple={true}
        maxSize={20}
        onFilesSelected={handleBulkFilesSelected}
        existingFiles={uploadedFiles}
        label="Upload Financial Statements (PDF, CSV, Excel)"
      />
      
      <div className="bg-gray-50 p-4 rounded-lg mt-4">
        <h4 className="text-sm font-medium mb-2">Supported File Formats:</h4>
        <ul className="text-sm text-gray-500 space-y-1 pl-5 list-disc">
          <li>CSV exports from your banking or investment platforms</li>
          <li>PDF account statements</li>
          <li>Excel spreadsheets with account details</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUploadSection;

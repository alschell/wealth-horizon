
import React from "react";
import { Button } from "@/components/ui/button";
import { FilePlus } from "lucide-react";
import DocumentTypeField from "./DocumentTypeField";
import DocumentDetailsFields from "./DocumentDetailsFields";
import DocumentUploadField from "./DocumentUploadField";

interface AddDocumentFormProps {
  documentType: string;
  issueDate: string;
  expiryDate: string;
  file: File | null;
  errors: Record<string, boolean>;
  onDocumentTypeChange: (value: string) => void;
  onDateChange: (field: 'issueDate' | 'expiryDate', date?: Date) => void;
  onFileSelected: (files: File[]) => void;
  onFileClear: () => void;
  onAddDocument: () => void;
  isEditing: boolean;
  onCancelEdit: () => void;
}

const AddDocumentForm: React.FC<AddDocumentFormProps> = ({
  documentType,
  issueDate,
  expiryDate,
  file,
  errors,
  onDocumentTypeChange,
  onDateChange,
  onFileSelected,
  onFileClear,
  onAddDocument,
  isEditing,
  onCancelEdit
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DocumentTypeField
          value={documentType}
          onChange={onDocumentTypeChange}
          error={errors.documentType}
        />
        
        <DocumentDetailsFields
          issueDate={issueDate}
          expiryDate={expiryDate}
          onDateChange={onDateChange}
          errors={errors}
        />
      </div>
      
      <DocumentUploadField
        file={file}
        onFileSelected={onFileSelected}
        onFileClear={onFileClear}
        error={errors.selectedFile}
      />
      
      <div className="flex justify-end space-x-2">
        {isEditing && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancelEdit}
          >
            Cancel
          </Button>
        )}
        <Button
          type="button"
          onClick={onAddDocument}
          className="bg-black hover:bg-gray-800 text-white"
        >
          <FilePlus className="mr-2 h-4 w-4" />
          {isEditing ? "Update Document" : "Add Document"}
        </Button>
      </div>
    </div>
  );
};

export default AddDocumentForm;

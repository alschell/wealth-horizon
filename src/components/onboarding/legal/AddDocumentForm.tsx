
import React from "react";
import { Button } from "@/components/ui/button";
import { FilePlus, Plus, Save, X } from "lucide-react";
import DocumentTypeField from "./DocumentTypeField";
import DocumentDetailsFields from "./DocumentDetailsFields";
import DocumentUploadField from "./DocumentUploadField";

interface AddDocumentFormProps {
  documentType: string;
  issueDate: string;
  expiryDate: string;
  file: File | null;
  errors: Record<string, boolean>;
  fileError?: string | null;
  onDocumentTypeChange: (value: string) => void;
  onDateChange: (field: 'issueDate' | 'expiryDate', date?: Date) => void;
  onFileSelected: (files: File[]) => void;
  onFileClear: () => void;
  onAddDocument: () => void;
  isEditing: boolean;
  onCancelEdit: () => void;
  onUpdateDocument?: () => void;
}

const AddDocumentForm: React.FC<AddDocumentFormProps> = ({
  documentType,
  issueDate,
  expiryDate,
  file,
  errors,
  fileError,
  onDocumentTypeChange,
  onDateChange,
  onFileSelected,
  onFileClear,
  onAddDocument,
  isEditing,
  onCancelEdit,
  onUpdateDocument
}) => {
  // Determine if all required fields are filled
  const isDisabled = !documentType || !issueDate || !file;
  
  // Action button handler
  const handleAction = () => {
    if (isEditing && onUpdateDocument) {
      onUpdateDocument();
    } else {
      onAddDocument();
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DocumentTypeField
          value={documentType}
          onChange={onDocumentTypeChange}
          error={errors.documentType}
        />
      </div>
      
      <DocumentDetailsFields
        issueDate={issueDate}
        expiryDate={expiryDate}
        onDateChange={onDateChange}
        error={errors}
      />
      
      <DocumentUploadField
        file={file}
        onFileSelected={onFileSelected}
        onFileClear={onFileClear}
        error={errors.selectedFile}
        errorMessage={fileError}
      />
      
      <div className="flex justify-end space-x-2">
        {isEditing && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancelEdit}
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        )}
        <Button
          type="button"
          onClick={handleAction}
          className={`transition-shadow ${isDisabled ? 'bg-gray-300 text-gray-500' : 'bg-black hover:bg-gray-800 text-white hover:shadow-md'}`}
          disabled={isDisabled}
        >
          {isEditing ? (
            <>
              <Save className="mr-2 h-4 w-4" />
              Update Document
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add Document
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AddDocumentForm;


import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DocumentTypeField from "./DocumentTypeField";
import DocumentDetailsFields from "./DocumentDetailsFields";
import DocumentUploadField from "./DocumentUploadField";

interface AddDocumentFormProps {
  documentType: string;
  issueDate: string;
  expiryDate: string;
  selectedFile: File | null;
  errors: Record<string, boolean>;
  onDocumentTypeChange: (value: string) => void;
  onDateChange: (field: 'issueDate' | 'expiryDate', date?: Date) => void;
  onFileSelected: (files: File[]) => void;
  onAddDocument: () => void;
  isEditing: boolean;
  onCancelEdit: () => void;
}

const AddDocumentForm: React.FC<AddDocumentFormProps> = ({
  documentType,
  issueDate,
  expiryDate,
  selectedFile,
  errors,
  onDocumentTypeChange,
  onDateChange,
  onFileSelected,
  onAddDocument,
  isEditing,
  onCancelEdit
}) => {
  return (
    <div className="space-y-5 border p-5 rounded-md">
      <h3 className="font-medium text-lg">
        {isEditing ? "Edit Document" : "Add a Legal Document"}
      </h3>
      
      <DocumentTypeField
        value={documentType}
        onChange={onDocumentTypeChange}
        error={errors.documentType}
      />
      
      <DocumentDetailsFields
        issueDate={issueDate}
        expiryDate={expiryDate}
        onDateChange={onDateChange}
        error={{
          issueDate: errors.issueDate
        }}
      />
      
      <DocumentUploadField
        file={selectedFile}
        onFileSelected={onFileSelected}
        error={errors.selectedFile}
        documentType={documentType}
      />
      
      <div className="flex justify-end mt-4 space-x-3">
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
          className="flex items-center gap-2"
        >
          {!isEditing && <Plus className="h-4 w-4" />}
          {isEditing ? "Update Document" : "Add Document"}
        </Button>
      </div>
    </div>
  );
};

export default AddDocumentForm;

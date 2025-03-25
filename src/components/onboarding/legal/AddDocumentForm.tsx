
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DocumentTypeField, DocumentDetailsFields, DocumentUploadField } from "./index";

interface AddDocumentFormProps {
  documentType: string;
  issueDate: string;
  expiryDate: string;
  selectedFiles: File[];
  errors: Record<string, boolean>;
  onDocumentTypeChange: (value: string) => void;
  onDateChange: (field: 'issueDate' | 'expiryDate', date?: Date) => void;
  onFilesSelected: (files: File[]) => void;
  onAddDocument: () => void;
  isEditing: boolean;
  onCancelEdit: () => void;
}

const AddDocumentForm: React.FC<AddDocumentFormProps> = ({
  documentType,
  issueDate,
  expiryDate,
  selectedFiles,
  errors,
  onDocumentTypeChange,
  onDateChange,
  onFilesSelected,
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
      />
      
      <DocumentUploadField
        files={selectedFiles}
        onFilesSelected={onFilesSelected}
        error={errors.selectedFiles}
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

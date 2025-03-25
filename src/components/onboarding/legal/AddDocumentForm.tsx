
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DocumentTypeField, DocumentDetailsFields, DocumentUploadField } from "./";

interface AddDocumentFormProps {
  documentType: string;
  issueDate: string;
  expiryDate: string;
  file: File | null;
  onDocumentTypeChange: (value: string) => void;
  onDateChange: (field: 'issueDate' | 'expiryDate', date?: Date) => void;
  onFileSelected: (files: File[]) => void;
  onFileClear: () => void;
  onAddDocument: () => void;
  onCancelEdit: () => void;
  errors: Record<string, boolean>;
  isEditing: boolean;
}

const AddDocumentForm: React.FC<AddDocumentFormProps> = ({
  documentType,
  issueDate,
  expiryDate,
  file,
  onDocumentTypeChange,
  onDateChange,
  onFileSelected,
  onFileClear,
  onAddDocument,
  onCancelEdit,
  errors,
  isEditing
}) => {
  return (
    <Card className="p-5">
      <h3 className="text-lg font-semibold mb-4">
        {isEditing ? "Edit Document" : "Add Document"}
      </h3>
      
      <div className="space-y-4">
        <DocumentTypeField
          value={documentType}
          onChange={onDocumentTypeChange}
          error={errors.documentType}
        />
        
        <DocumentDetailsFields
          issueDate={issueDate}
          expiryDate={expiryDate}
          onDateChange={onDateChange}
          error={{ issueDate: errors.issueDate }}
        />
        
        <DocumentUploadField
          file={file}
          onFileSelected={onFileSelected}
          error={errors.selectedFile}
          documentType={documentType}
          onFileDelete={onFileClear}
        />
        
        <div className="flex justify-end space-x-2 pt-2">
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
          >
            {isEditing ? "Update Document" : "Add Document"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AddDocumentForm;

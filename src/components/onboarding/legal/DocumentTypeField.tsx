
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DOCUMENT_TYPES } from "../constants/documents";
import { cn } from "@/lib/utils";

interface DocumentTypeFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

const DocumentTypeField: React.FC<DocumentTypeFieldProps> = ({ value, onChange, error }) => {
  return (
    <div className="space-y-2 w-full">
      <Label htmlFor="documentType">
        Document Type<span className="text-red-500 ml-1">*</span>
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger 
          className={cn(
            "w-full", 
            error && "border-red-500"
          )}
          id="documentType"
        >
          <SelectValue placeholder="Select document type" />
        </SelectTrigger>
        <SelectContent className="w-full">
          {DOCUMENT_TYPES.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="text-sm font-medium text-red-500">
          Please select a document type
        </p>
      )}
    </div>
  );
};

export default DocumentTypeField;

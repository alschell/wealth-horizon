
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface DocumentTypeFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

const documentTypes = [
  "Articles of Incorporation",
  "Certificate of Formation",
  "Partnership Agreement",
  "Trust Agreement",
  "Operating Agreement",
  "LLC Agreement",
  "Certificate of Organization",
  "Bylaws",
  "Other Legal Document",
];

const DocumentTypeField: React.FC<DocumentTypeFieldProps> = ({ 
  value, 
  onChange,
  error
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="documentType">Document Type<span className="text-red-500 ml-1">*</span></Label>
      <Select
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger 
          id="documentType"
          className={cn(
            "w-full",
            error && "border-red-500 focus:ring-red-500"
          )}
        >
          <SelectValue placeholder="Select document type" />
        </SelectTrigger>
        <SelectContent position="popper" className="max-h-60">
          {documentTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="text-sm font-medium text-red-500">Document type is required</p>
      )}
    </div>
  );
};

export default DocumentTypeField;

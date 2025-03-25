
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface DocumentTypeFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

const DocumentTypeField: React.FC<DocumentTypeFieldProps> = ({ 
  value, 
  onChange,
  error 
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="documentType">
        Document Type<span className="text-red-500 ml-1">*</span>
      </Label>
      <Select
        value={value || ""}
        onValueChange={onChange}
      >
        <SelectTrigger 
          id="documentType"
          className={cn(
            "w-full",
            error && "border-red-500 ring-red-500"
          )}
        >
          <SelectValue placeholder="Select document type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="certificate_of_incorporation">Certificate of Incorporation</SelectItem>
          <SelectItem value="trust_deed">Trust Deed</SelectItem>
          <SelectItem value="operating_agreement">Operating Agreement</SelectItem>
          <SelectItem value="partnership_agreement">Partnership Agreement</SelectItem>
          <SelectItem value="memorandum_of_association">Memorandum of Association</SelectItem>
          <SelectItem value="articles_of_association">Articles of Association</SelectItem>
          <SelectItem value="other">Other Document</SelectItem>
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

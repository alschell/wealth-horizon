
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { itemVariants } from "../../common/AnimationVariants";

interface DocumentTypeSelectProps {
  value: string;
  onChange: (value: "passport" | "drivingLicense" | "nationalId") => void;
}

const DocumentTypeSelect: React.FC<DocumentTypeSelectProps> = ({ value, onChange }) => {
  return (
    <motion.div 
      custom={0}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="space-y-2"
    >
      <Label htmlFor="documentType">Document Type<span className="text-red-500 ml-1">*</span></Label>
      <Select
        value={value}
        onValueChange={(value: "passport" | "drivingLicense" | "nationalId") => onChange(value)}
      >
        <SelectTrigger className="h-11">
          <SelectValue placeholder="Select document type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="passport">Passport</SelectItem>
          <SelectItem value="drivingLicense">Driving License</SelectItem>
          <SelectItem value="nationalId">National ID</SelectItem>
        </SelectContent>
      </Select>
    </motion.div>
  );
};

export default DocumentTypeSelect;

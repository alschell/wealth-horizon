
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { motion } from "framer-motion";
import { itemVariants } from "../common/AnimationVariants";
import { SearchableSelectField, FileField } from "@/components/onboarding/common/fields";
import { NATIONALITIES } from "@/utils/constants/countries";

interface OwnerFormFieldsProps {
  firstName: string;
  lastName: string;
  relationship: string;
  ownershipPercentage: string;
  nationality: string;
  dateOfBirth: string | Date;
  documentFiles: File[];
  errors: Record<string, string>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (field: string, value: string) => void;
  onDateChange: (date?: Date) => void;
  onFilesSelected: (files: File[]) => void;
}

const OwnerFormFields: React.FC<OwnerFormFieldsProps> = ({
  firstName,
  lastName,
  relationship,
  ownershipPercentage,
  nationality,
  dateOfBirth,
  documentFiles,
  errors,
  onInputChange,
  onSelectionChange,
  onDateChange,
  onFilesSelected,
}) => {
  // Parse date string to Date object if it exists
  const dateValue = typeof dateOfBirth === 'string' && dateOfBirth 
    ? new Date(dateOfBirth) 
    : dateOfBirth instanceof Date ? dateOfBirth : undefined;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          custom={1}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          <Label htmlFor="firstName">
            First Name<span className="text-red-500">*</span>
          </Label>
          <Input
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={onInputChange}
            className={`h-11 ${errors.firstName ? "border-red-500" : ""}`}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName}</p>
          )}
        </motion.div>

        <motion.div
          custom={2}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          <Label htmlFor="lastName">
            Last Name<span className="text-red-500">*</span>
          </Label>
          <Input
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={onInputChange}
            className={`h-11 ${errors.lastName ? "border-red-500" : ""}`}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName}</p>
          )}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          custom={3}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          <Label htmlFor="relationship">
            Relationship<span className="text-red-500">*</span>
          </Label>
          <Input
            id="relationship"
            name="relationship"
            value={relationship}
            onChange={onInputChange}
            className={`h-11 ${errors.relationship ? "border-red-500" : ""}`}
          />
          {errors.relationship && (
            <p className="text-sm text-red-500">{errors.relationship}</p>
          )}
        </motion.div>

        <motion.div
          custom={4}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          <Label htmlFor="ownershipPercentage">
            Ownership Percentage<span className="text-red-500">*</span>
          </Label>
          <Input
            id="ownershipPercentage"
            name="ownershipPercentage"
            value={ownershipPercentage}
            onChange={onInputChange}
            className={`h-11 ${errors.ownershipPercentage ? "border-red-500" : ""}`}
          />
          {errors.ownershipPercentage && (
            <p className="text-sm text-red-500">{errors.ownershipPercentage}</p>
          )}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          custom={5}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          <Label htmlFor="nationality">
            Nationality<span className="text-red-500">*</span>
          </Label>
          <SearchableSelectField
            id="nationality"
            label="Nationality"
            value={nationality}
            placeholder="Select nationality"
            options={NATIONALITIES}
            required={true}
            onChange={(value) => onSelectionChange("nationality", value)}
            allowCustomValue={false}
          />
          {errors.nationality && (
            <p className="text-sm text-red-500">{errors.nationality}</p>
          )}
        </motion.div>

        <motion.div
          custom={6}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          <Label htmlFor="dateOfBirth">
            Date of Birth<span className="text-red-500">*</span>
          </Label>
          <DatePicker
            label="Date of Birth"
            value={dateValue}
            onChange={onDateChange}
            className={`w-full ${errors.dateOfBirth ? "border-red-500" : ""}`}
          />
          {errors.dateOfBirth && (
            <p className="text-sm text-red-500">{errors.dateOfBirth}</p>
          )}
        </motion.div>
      </div>

      <motion.div
        custom={7}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        <FileField
          id="owner-documents"
          label="Identity Documents"
          required={true}
          accept="application/pdf,image/*"
          multiple={true}
          hint="Upload identity documents (passport, ID, etc.)"
          onFilesChange={onFilesSelected}
        />
        {errors.documents && (
          <p className="text-sm text-red-500">{errors.documents}</p>
        )}
      </motion.div>
    </div>
  );
};

export default OwnerFormFields;

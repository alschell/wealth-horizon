
import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { PersonalInfo } from "@/context/OnboardingContext";

interface PersonalInfoFormFieldsProps {
  formData: PersonalInfo;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectionChange: (name: keyof PersonalInfo, value: string) => void;
  handleDateChange: (date?: Date) => void;
  itemVariants: any;
  nationalities: string[];
  dateOfBirth?: Date;
}

const PersonalInfoFormFields: React.FC<PersonalInfoFormFieldsProps> = ({
  formData,
  handleInputChange,
  handleSelectionChange,
  handleDateChange,
  itemVariants,
  nationalities,
  dateOfBirth
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div 
        custom={0}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        <Label htmlFor="firstName">First Name*</Label>
        <Input
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="John"
          className="h-11"
        />
      </motion.div>

      <motion.div 
        custom={1}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        <Label htmlFor="lastName">Last Name*</Label>
        <Input
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Smith"
          className="h-11"
        />
      </motion.div>

      <motion.div 
        custom={2}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        <Label htmlFor="email">Email Address*</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="john.smith@example.com"
          className="h-11"
        />
      </motion.div>

      <motion.div 
        custom={3}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        <Label htmlFor="phone">Phone Number*</Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="+1 (555) 123-4567"
          className="h-11"
        />
      </motion.div>

      <motion.div 
        custom={4}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        <DatePicker
          label="Date of Birth*"
          value={dateOfBirth}
          onChange={handleDateChange}
          placeholder="Select date of birth"
          className="w-full"
        />
      </motion.div>

      <motion.div 
        custom={5}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        <Label htmlFor="nationality">Nationality*</Label>
        <Select
          value={formData.nationality}
          onValueChange={(value) => handleSelectionChange("nationality", value)}
        >
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Select nationality" />
          </SelectTrigger>
          <SelectContent>
            {nationalities.map((nationality) => (
              <SelectItem key={nationality} value={nationality}>
                {nationality}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div 
        custom={6}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        <Label htmlFor="taxResidency">Tax Residency</Label>
        <Select
          value={formData.taxResidency || ""}
          onValueChange={(value) => handleSelectionChange("taxResidency", value)}
        >
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Select tax residency" />
          </SelectTrigger>
          <SelectContent>
            {nationalities.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div 
        custom={7}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        <Label htmlFor="taxId">Tax ID Number</Label>
        <Input
          id="taxId"
          name="taxId"
          value={formData.taxId || ""}
          onChange={handleInputChange}
          placeholder="e.g., SSN or TIN"
          className="h-11"
        />
      </motion.div>
    </div>
  );
};

export default PersonalInfoFormFields;

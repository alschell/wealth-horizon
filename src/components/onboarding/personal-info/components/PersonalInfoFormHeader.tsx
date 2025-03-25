
import React from "react";
import { motion } from "framer-motion";

interface PersonalInfoFormHeaderProps {
  itemVariants: any;
}

const PersonalInfoFormHeader: React.FC<PersonalInfoFormHeaderProps> = ({ itemVariants }) => {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold">Personal Information</h2>
      <p className="text-gray-500">
        Please provide your personal details for KYC verification.
      </p>
    </div>
  );
};

export default PersonalInfoFormHeader;

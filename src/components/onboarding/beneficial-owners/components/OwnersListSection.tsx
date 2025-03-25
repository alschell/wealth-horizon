
import React from "react";
import { motion } from "framer-motion";
import { BeneficialOwnerInfo } from "@/types/onboarding";
import OwnersList from "../OwnersList";

interface OwnersListSectionProps {
  owners: BeneficialOwnerInfo[];
  onEditOwner: (index: number) => void;
  onRemoveOwner: (index: number) => void;
}

const OwnersListSection: React.FC<OwnersListSectionProps> = ({
  owners,
  onEditOwner,
  onRemoveOwner
}) => {
  if (owners.length === 0) {
    return null;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <OwnersList
        owners={owners}
        onEditOwner={onEditOwner}
        onRemoveOwner={onRemoveOwner}
      />
    </motion.div>
  );
};

export default OwnersListSection;

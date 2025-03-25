
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface FormNavigationProps {
  hasOwners: boolean;
  onBack: () => void;
  onSubmit: () => void;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  hasOwners,
  onBack,
  onSubmit
}) => {
  return (
    <motion.div className="mt-8 flex justify-between">
      <Button
        type="button"
        variant="outline"
        onClick={onBack}
      >
        Back
      </Button>
      <Button
        type="button"
        onClick={onSubmit}
        disabled={!hasOwners}
      >
        Continue
      </Button>
    </motion.div>
  );
};

export default FormNavigation;

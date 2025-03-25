
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
  const handleBack = () => {
    // Scroll to top before going back
    window.scrollTo(0, 0);
    onBack();
  };

  const handleSubmit = () => {
    // Scroll to top before proceeding
    window.scrollTo(0, 0);
    onSubmit();
  };

  return (
    <motion.div className="mt-8 flex justify-between">
      <Button
        type="button"
        variant="outline"
        onClick={handleBack}
      >
        Back
      </Button>
      <Button
        type="button"
        onClick={handleSubmit}
        disabled={!hasOwners}
      >
        Continue
      </Button>
    </motion.div>
  );
};

export default FormNavigation;

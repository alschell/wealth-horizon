
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface FormNavigationProps {
  hasOwners: boolean;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  hasOwners,
  onBack,
  onSubmit,
  isSubmitting = false
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
    <motion.div className="mt-8 flex justify-between pt-4 border-t">
      <Button
        type="button"
        variant="outline"
        onClick={handleBack}
        disabled={isSubmitting}
      >
        Back
      </Button>
      <Button
        type="button"
        onClick={handleSubmit}
        disabled={!hasOwners || isSubmitting}
        className="bg-black hover:bg-gray-800 text-white"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Continue'
        )}
      </Button>
    </motion.div>
  );
};

export default FormNavigation;

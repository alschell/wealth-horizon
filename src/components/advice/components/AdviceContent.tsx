
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AdviceState, Bank, Asset, MandateType } from "../types";
import MandateSetup from "../sections/MandateSetup";
import AssetSelection from "../sections/AssetSelection";
import AdviceReview from "../sections/AdviceReview";
import BankSelector from "../sections/BankSelector";
import FormNavigation from "@/components/onboarding/common/FormNavigation";
import StepProgress from "./StepProgress";

interface AdviceContentProps {
  activeTab: string;
  adviceState: AdviceState;
  onMandateTypeChange: (type: MandateType) => void;
  onBankSelection: (bank: Bank | null) => void;
  onAssetToggle: (asset: Asset, inScope: boolean) => void;
  onSubmit: () => void;
  setActiveTab: (tab: string) => void;
}

const AdviceContent: React.FC<AdviceContentProps> = ({
  activeTab,
  adviceState,
  onMandateTypeChange,
  onBankSelection,
  onAssetToggle,
  onSubmit,
  setActiveTab
}) => {
  const steps = [
    { id: "assets", label: "Assets" },
    { id: "mandate", label: "Mandate Type" },
    { id: "advisor", label: "Advisor" },
    { id: "review", label: "Review" }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === activeTab);
  
  const handleNext = () => {
    const currentIndex = steps.findIndex(step => step.id === activeTab);
    if (currentIndex < steps.length - 1) {
      // Validation checks before proceeding
      if (activeTab === "assets" && adviceState.assetsInScope.length === 0) {
        return;
      }
      if (activeTab === "advisor" && !adviceState.selectedBank) {
        return;
      }
      setActiveTab(steps[currentIndex + 1].id);
      // Scroll to top when changing steps
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    const currentIndex = steps.findIndex(step => step.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(steps[currentIndex - 1].id);
      // Scroll to top when changing steps
      window.scrollTo(0, 0);
    }
  };

  const variants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="space-y-6">
      <StepProgress steps={steps} currentStepId={activeTab} />
      
      <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "assets" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Select Assets in Scope</h2>
                <p className="text-gray-600 mb-6">
                  Choose which assets will be covered by this advisory mandate
                </p>
                <AssetSelection 
                  assetsInScope={adviceState.assetsInScope}
                  assetsOutOfScope={adviceState.assetsOutOfScope}
                  onAssetToggle={onAssetToggle}
                />
              </div>
            )}

            {activeTab === "mandate" && (
              <MandateSetup 
                mandateType={adviceState.mandateType} 
                onMandateTypeChange={onMandateTypeChange}
              />
            )}
            
            {activeTab === "advisor" && (
              <BankSelector
                selectedBank={adviceState.selectedBank}
                mandateType={adviceState.mandateType}
                onBankSelection={onBankSelection}
              />
            )}

            {activeTab === "review" && (
              <AdviceReview 
                adviceState={adviceState}
                onSubmit={onSubmit}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8">
          <FormNavigation 
            onBack={handleBack}
            showRequiredFieldsNote={false}
            disableBack={currentStepIndex === 0}
            submitText={activeTab === "review" ? "Submit" : "Continue"}
            className={activeTab === "review" ? "mt-6" : ""}
          />
        </div>
      </div>
    </div>
  );
};

export default AdviceContent;

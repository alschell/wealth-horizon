
import React from "react";
import { AdviceState, Bank, Asset } from "../types";
import MandateSetup from "../sections/MandateSetup";
import AssetSelection from "../sections/AssetSelection";
import AdviceReview from "../sections/AdviceReview";
import { Button } from "@/components/ui/button";

interface AdviceContentProps {
  activeTab: string;
  adviceState: AdviceState;
  onMandateTypeChange: (type: "discretionary" | "advisory") => void;
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
  const handleNext = (currentTab: string) => {
    if (currentTab === "assets") {
      if (adviceState.assetsInScope.length === 0) {
        return;
      }
      setActiveTab("mandate");
    } else if (currentTab === "mandate") {
      if (!adviceState.selectedBank) {
        return;
      }
      setActiveTab("review");
    }
  };

  const handleBack = (currentTab: string) => {
    if (currentTab === "mandate") {
      setActiveTab("assets");
    } else if (currentTab === "review") {
      setActiveTab("mandate");
    }
  };

  return (
    <>
      {activeTab === "assets" && (
        <AssetSelection 
          assetsInScope={adviceState.assetsInScope}
          assetsOutOfScope={adviceState.assetsOutOfScope}
          onAssetToggle={onAssetToggle}
          onNext={() => handleNext("assets")}
        />
      )}

      {activeTab === "mandate" && (
        <MandateSetup 
          mandateType={adviceState.mandateType} 
          selectedBank={adviceState.selectedBank}
          onMandateTypeChange={onMandateTypeChange}
          onBankSelection={onBankSelection}
          onNext={() => handleNext("mandate")}
        />
      )}

      {activeTab === "review" && (
        <AdviceReview 
          adviceState={adviceState}
          onSubmit={onSubmit}
        />
      )}

      <div className="flex justify-between mt-8">
        {/* Always show back button, but disable it in the first step */}
        <Button 
          variant="outline" 
          onClick={() => handleBack(activeTab)}
          disabled={activeTab === "assets"}
        >
          Back
        </Button>
        
        <div className="ml-auto">
          {activeTab === "assets" && (
            <Button 
              onClick={() => handleNext("assets")}
              className="bg-black text-white"
              disabled={adviceState.assetsInScope.length === 0}
            >
              Continue
            </Button>
          )}
          
          {activeTab === "mandate" && (
            <Button 
              onClick={() => handleNext("mandate")}
              className="bg-black text-white"
              disabled={!adviceState.selectedBank}
            >
              Continue
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default AdviceContent;


import React from "react";
import { AdviceState, Bank, Asset } from "../types";
import MandateSetup from "../sections/MandateSetup";
import AssetSelection from "../sections/AssetSelection";
import AdviceReview from "../sections/AdviceReview";
import BankSelector from "../sections/BankSelector";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
      setActiveTab("advisor");
    } else if (currentTab === "advisor") {
      if (!adviceState.selectedBank) {
        return;
      }
      setActiveTab("review");
    }
  };

  const handleBack = (currentTab: string) => {
    if (currentTab === "mandate") {
      setActiveTab("assets");
    } else if (currentTab === "advisor") {
      setActiveTab("mandate");
    } else if (currentTab === "review") {
      setActiveTab("advisor");
    }
  };

  return (
    <>
      <div className="rounded-lg shadow-sm p-6 pb-10 bg-white">
        {activeTab === "assets" && (
          <>
            <AssetSelection 
              assetsInScope={adviceState.assetsInScope}
              assetsOutOfScope={adviceState.assetsOutOfScope}
              onAssetToggle={onAssetToggle}
              onNext={() => handleNext("assets")}
            />
            
            <div className="flex justify-between mt-8">
              <div className="flex-1"></div>
              <Button 
                onClick={() => handleNext("assets")}
                disabled={adviceState.assetsInScope.length === 0}
              >
                Continue
              </Button>
            </div>
          </>
        )}

        {activeTab === "mandate" && (
          <>
            <MandateSetup 
              mandateType={adviceState.mandateType} 
              onMandateTypeChange={onMandateTypeChange}
              onNext={() => handleNext("mandate")}
            />
            
            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={() => handleBack(activeTab)}
              >
                Back
              </Button>
              <Button onClick={() => handleNext("mandate")}>
                Continue
              </Button>
            </div>
          </>
        )}
        
        {activeTab === "advisor" && (
          <>
            <BankSelector
              selectedBank={adviceState.selectedBank}
              mandateType={adviceState.mandateType}
              onBankSelection={onBankSelection}
              onNext={() => handleNext("advisor")}
            />
            
            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={() => handleBack(activeTab)}
              >
                Back
              </Button>
              <Button 
                onClick={() => handleNext("advisor")}
                disabled={!adviceState.selectedBank}
              >
                Continue
              </Button>
            </div>
          </>
        )}

        {activeTab === "review" && (
          <AdviceReview 
            adviceState={adviceState}
            onSubmit={onSubmit}
          />
        )}
      </div>
    </>
  );
};

export default AdviceContent;

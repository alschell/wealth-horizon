
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
      <div className="rounded-lg shadow-sm p-6 bg-white">
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
            onMandateTypeChange={onMandateTypeChange}
            onNext={() => handleNext("mandate")}
          />
        )}
        
        {activeTab === "advisor" && (
          <BankSelector
            selectedBank={adviceState.selectedBank}
            mandateType={adviceState.mandateType}
            onBankSelection={onBankSelection}
            onNext={() => handleNext("advisor")}
          />
        )}

        {activeTab === "review" && (
          <AdviceReview 
            adviceState={adviceState}
            onSubmit={onSubmit}
          />
        )}
      </div>

      {activeTab !== "review" && (
        <Card className="p-4 mt-8">
          <div className="flex justify-between">
            {activeTab !== "assets" && (
              <Button 
                variant="outline" 
                onClick={() => handleBack(activeTab)}
              >
                Back
              </Button>
            )}
            
            {activeTab === "assets" && (
              <div className="flex justify-end w-full">
                <Button 
                  onClick={() => handleNext("assets")}
                  disabled={adviceState.assetsInScope.length === 0}
                >
                  Continue
                </Button>
              </div>
            )}

            {activeTab === "mandate" && (
              <div className="flex justify-end flex-1">
                <Button onClick={() => handleNext("mandate")}>
                  Continue
                </Button>
              </div>
            )}
              
            {activeTab === "advisor" && (
              <Button 
                onClick={() => handleNext("advisor")}
                disabled={!adviceState.selectedBank}
              >
                Continue
              </Button>
            )}
          </div>
        </Card>
      )}
    </>
  );
};

export default AdviceContent;

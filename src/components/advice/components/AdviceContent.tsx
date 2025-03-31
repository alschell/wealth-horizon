
import React from "react";
import { AdviceState, Bank, Asset } from "../types";
import MandateSetup from "../sections/MandateSetup";
import AssetSelection from "../sections/AssetSelection";
import AdviceReview from "../sections/AdviceReview";

interface AdviceContentProps {
  activeTab: string;
  adviceState: AdviceState;
  onMandateTypeChange: (type: "discretionary" | "advisory") => void;
  onBankSelection: (bank: Bank | null) => void;
  onAssetToggle: (asset: Asset, inScope: boolean) => void;
  onSubmit: () => void;
}

const AdviceContent: React.FC<AdviceContentProps> = ({
  activeTab,
  adviceState,
  onMandateTypeChange,
  onBankSelection,
  onAssetToggle,
  onSubmit
}) => {
  return (
    <>
      {activeTab === "mandate" && (
        <MandateSetup 
          mandateType={adviceState.mandateType} 
          selectedBank={adviceState.selectedBank}
          onMandateTypeChange={onMandateTypeChange}
          onBankSelection={onBankSelection}
          onNext={() => {}}
        />
      )}

      {activeTab === "assets" && (
        <AssetSelection 
          assetsInScope={adviceState.assetsInScope}
          assetsOutOfScope={adviceState.assetsOutOfScope}
          onAssetToggle={onAssetToggle}
          onNext={() => {}}
        />
      )}

      {activeTab === "review" && (
        <AdviceReview 
          adviceState={adviceState}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
};

export default AdviceContent;

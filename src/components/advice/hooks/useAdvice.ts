
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { Bank, Asset, MandateType, AdviceState } from "../types";
import { mockBanks } from "../data/banks";
import { mockAssets } from "../data/assets";

export const useAdvice = () => {
  const [activeTab, setActiveTab] = useState<string>("assets");
  
  const [adviceState, setAdviceState] = useState<AdviceState>({
    mandateType: "advisory",
    selectedBank: null,
    assetsInScope: [],
    assetsOutOfScope: mockAssets
  });

  const handleMandateTypeChange = useCallback((type: MandateType) => {
    setAdviceState(prev => ({ ...prev, mandateType: type }));
  }, []);

  const handleBankSelection = useCallback((bank: Bank | null) => {
    setAdviceState(prev => ({ ...prev, selectedBank: bank }));
  }, []);

  const handleAssetToggle = useCallback((asset: Asset, inScope: boolean) => {
    setAdviceState(prev => {
      if (inScope) {
        // Add to in-scope, remove from out-of-scope
        return {
          ...prev,
          assetsInScope: [...prev.assetsInScope, asset],
          assetsOutOfScope: prev.assetsOutOfScope.filter(a => a.id !== asset.id)
        };
      } else {
        // Remove from in-scope, add to out-of-scope
        return {
          ...prev,
          assetsInScope: prev.assetsInScope.filter(a => a.id !== asset.id),
          assetsOutOfScope: [...prev.assetsOutOfScope, asset]
        };
      }
    });
  }, []);

  const handleSubmit = useCallback(() => {
    // Validation
    if (!adviceState.selectedBank) {
      toast.error("Please select a bank to provide advice");
      return;
    }

    if (adviceState.assetsInScope.length === 0) {
      toast.error("Please select at least one asset to bring into scope");
      return;
    }

    // Submit advice setup
    toast.success(
      `${adviceState.mandateType === "discretionary" ? "Discretionary" : "Advisory"} mandate with ${adviceState.selectedBank.name} has been set up successfully for ${adviceState.assetsInScope.length} assets`
    );

    // After successful submission, move to the review tab
    setActiveTab("review");
  }, [adviceState]);

  return {
    activeTab,
    setActiveTab,
    adviceState,
    handleMandateTypeChange,
    handleBankSelection,
    handleAssetToggle,
    handleSubmit
  };
};

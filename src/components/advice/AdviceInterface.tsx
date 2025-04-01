
import React from "react";
import AdviceHeader from "./components/AdviceHeader";
import AdviceContent from "./components/AdviceContent";
import { useAdvice } from "./hooks/useAdvice";

const AdviceInterface: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    adviceState,
    handleMandateTypeChange,
    handleBankSelection,
    handleAssetToggle,
    handleSubmit
  } = useAdvice();

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-gray-50/30 to-white">
      <div className="max-w-4xl mx-auto">
        <AdviceHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-6">
          <AdviceContent 
            activeTab={activeTab}
            adviceState={adviceState}
            onMandateTypeChange={handleMandateTypeChange}
            onBankSelection={handleBankSelection}
            onAssetToggle={handleAssetToggle}
            onSubmit={handleSubmit}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>
    </div>
  );
};

export default AdviceInterface;

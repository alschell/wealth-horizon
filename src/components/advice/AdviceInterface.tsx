
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
    <div className="max-w-4xl mx-auto py-6 px-4">
      <AdviceHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
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
  );
};

export default AdviceInterface;

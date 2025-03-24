
import { FinancialAccountInfo } from "@/types/onboarding";
import { LEI_MAPPING } from "../../constants/leiMappings";

export const useLegalEntityHandler = (
  setAccount: React.Dispatch<React.SetStateAction<FinancialAccountInfo>>,
  clearError: (field: string) => void
) => {
  // Handle legal entity change
  const handleLegalEntityChange = (value: string) => {
    // Update legal entity
    setAccount(prev => ({ ...prev, legalEntity: value }));
    
    // If we have an LEI mapping for this entity, auto-populate it
    if (LEI_MAPPING[value]) {
      setAccount(prev => ({ 
        ...prev, 
        legalEntity: value,
        legalEntityIdentifier: LEI_MAPPING[value] 
      }));
    }
    
    // Clear errors
    clearError('legalEntity');
  };

  return {
    handleLegalEntityChange
  };
};

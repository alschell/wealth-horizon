
import { FinancialAccountInfo } from "@/types/onboarding";
import { LEI_MAPPING } from "../../constants/leiMappings";
import { toast } from "@/components/ui/use-toast";

export const useLegalEntityHandler = (
  setAccount: React.Dispatch<React.SetStateAction<FinancialAccountInfo>>,
  clearError: (field: string) => void
) => {
  // Handle legal entity change with improved error handling
  const handleLegalEntityChange = (value: string) => {
    if (!value) {
      toast({
        title: "Validation Error",
        description: "Legal entity cannot be empty",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Update legal entity
      setAccount(prev => ({ ...prev, legalEntity: value }));
      
      // If we have an LEI mapping for this entity, auto-populate it
      if (LEI_MAPPING[value]) {
        setAccount(prev => ({ 
          ...prev, 
          legalEntity: value,
          legalEntityIdentifier: LEI_MAPPING[value] 
        }));
        
        // Notify user of auto-population
        toast({
          title: "Auto-populated LEI",
          description: `LEI was automatically set to ${LEI_MAPPING[value]}`,
        });
      }
      
      // Clear errors
      clearError('legalEntity');
    } catch (error) {
      console.error("Error in handleLegalEntityChange:", error);
      toast({
        title: "Error",
        description: "Failed to update legal entity. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    handleLegalEntityChange
  };
};

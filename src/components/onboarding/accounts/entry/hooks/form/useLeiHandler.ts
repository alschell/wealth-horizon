
import { FinancialAccountInfo } from "@/types/onboarding";
import { LEI_MAPPING } from "../../constants/leiMappings";
import { LEGAL_ENTITIES } from "../../constants/legalEntities";
import { toast } from "@/components/ui/use-toast";
import { useCallback } from "react";
import { validateLei } from "@/utils/validation";

export const useLeiHandler = (setAccount: React.Dispatch<React.SetStateAction<FinancialAccountInfo>>) => {
  // Handle LEI input change with auto-population and improved error handling
  const handleLeiInputChange = useCallback((value: string) => {
    try {
      // First update the LEI in the form
      setAccount(prev => ({ ...prev, legalEntityIdentifier: value }));
      
      // Validate LEI format
      const leiError = validateLei(value);
      if (leiError) {
        // Don't show toast for validation errors during typing
        return;
      }
      
      // Auto-populate institution and legal entity from LEI
      if (value && value.trim().length > 0) {
        // Create a reverse mapping for LEI to entity
        const leiToEntityMap: Record<string, string> = {};
        for (const [entityName, lei] of Object.entries(LEI_MAPPING)) {
          leiToEntityMap[lei] = entityName;
        }
        
        // Check if this LEI exists in our mapping
        const matchedEntity = leiToEntityMap[value];
        
        if (matchedEntity) {
          // Found a match, now find which institution it belongs to
          for (const [institution, entities] of Object.entries(LEGAL_ENTITIES)) {
            if (entities.includes(matchedEntity)) {
              setAccount(prev => ({
                ...prev,
                legalEntityIdentifier: value,
                institution: institution,
                legalEntity: matchedEntity
              }));
              
              // Notify user of auto-population
              toast({
                title: "Fields auto-populated",
                description: `Institution and legal entity were set based on the provided LEI.`,
              });
              return;
            }
          }
        }
      }
    } catch (error) {
      console.error("Error in handleLeiInputChange:", error);
      toast({
        title: "Error",
        description: "Failed to process LEI. Please try again.",
        variant: "destructive"
      });
    }
  }, [setAccount]);

  // Handle LEI change from input event
  const handleLeiChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e || !e.target) {
      console.error("Invalid event in handleLeiChange");
      return;
    }
    handleLeiInputChange(e.target.value);
  }, [handleLeiInputChange]);

  return {
    handleLeiInputChange,
    handleLeiChange
  };
};

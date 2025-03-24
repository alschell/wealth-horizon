
import { FinancialAccountInfo } from "@/types/onboarding";
import { LEI_MAPPING } from "../../constants/leiMappings";
import { LEGAL_ENTITIES } from "../../constants/legalEntities";
import { toast } from "@/components/ui/use-toast";

export const useLeiHandler = (setAccount: React.Dispatch<React.SetStateAction<FinancialAccountInfo>>) => {
  // Handle LEI input change with auto-population
  const handleLeiInputChange = (value: string) => {
    setAccount(prev => ({ ...prev, legalEntityIdentifier: value }));
    
    // Auto-populate institution and legal entity from LEI
    if (value) {
      // Check if this LEI exists in our mapping
      for (const [entityName, lei] of Object.entries(LEI_MAPPING)) {
        if (lei === value) {
          // Found a match, now find which institution it belongs to
          for (const [institution, entities] of Object.entries(LEGAL_ENTITIES)) {
            if (entities.includes(entityName)) {
              setAccount(prev => ({
                ...prev,
                legalEntityIdentifier: value,
                institution: institution,
                legalEntity: entityName
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
    }
  };

  // Handle LEI change
  const handleLeiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleLeiInputChange(e.target.value);
  };

  return {
    handleLeiInputChange,
    handleLeiChange
  };
};

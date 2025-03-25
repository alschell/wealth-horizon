
import { useState, useCallback } from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { LEGAL_ENTITIES, ensureAllInstitutionsHaveLegalEntities } from "../constants";
import { LEI_MAPPING } from "../constants";
import { INSTITUTIONS } from "@/utils/constants/institutions";

export const useLegalEntityMapping = (
  account: FinancialAccountInfo,
  onSelectionChange: (field: keyof FinancialAccountInfo, value: string) => void
) => {
  // Ensure all institutions have legal entities
  const allLegalEntities = ensureAllInstitutionsHaveLegalEntities(INSTITUTIONS);
  
  // Get legal entities for the selected institution
  const getLegalEntities = useCallback(() => {
    if (!account.institution) {
      // Return all legal entities when no institution is selected
      return Object.values(allLegalEntities).flat();
    }
    
    if (allLegalEntities[account.institution]) {
      return allLegalEntities[account.institution];
    }
    
    // Fallback to a default legal entity if the institution doesn't have any
    return [`${account.institution} Default Legal Entity`];
  }, [account.institution, allLegalEntities]);

  // Handle legal entity selection
  const handleLegalEntityChange = useCallback((value: string) => {
    onSelectionChange("legalEntity", value);
    
    // Update the Legal Entity Identifier if available
    if (LEI_MAPPING[value]) {
      onSelectionChange("legalEntityIdentifier", LEI_MAPPING[value]);
    }
  }, [onSelectionChange]);

  // Handle legal entity identifier change (now accepts string directly)
  const handleLeiChange = useCallback((value: string) => {
    onSelectionChange("legalEntityIdentifier", value);
    
    // Try to find and populate institution and legal entity from LEI
    if (value) {
      for (const [entityName, entityLei] of Object.entries(LEI_MAPPING)) {
        if (entityLei === value) {
          // Find the institution this entity belongs to
          for (const [instName, entities] of Object.entries(allLegalEntities)) {
            if (entities.includes(entityName)) {
              onSelectionChange("institution", instName);
              onSelectionChange("legalEntity", entityName);
              break;
            }
          }
          break;
        }
      }
    }
  }, [onSelectionChange, allLegalEntities]);

  return {
    getLegalEntities,
    handleLegalEntityChange,
    handleLeiChange
  };
};

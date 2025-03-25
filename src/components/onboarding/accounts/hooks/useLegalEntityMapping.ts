
import { useState, useCallback } from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { LEGAL_ENTITIES, LEI_MAPPING } from "../constants";

export const useLegalEntityMapping = (
  account: FinancialAccountInfo,
  onSelectionChange: (field: keyof FinancialAccountInfo, value: string) => void
) => {
  // Get legal entities for the selected institution
  const getLegalEntities = useCallback(() => {
    if (!account.institution) {
      // Return all legal entities when no institution is selected
      return Object.values(LEGAL_ENTITIES).flat();
    }
    
    if (LEGAL_ENTITIES[account.institution]) {
      return LEGAL_ENTITIES[account.institution];
    }
    return [];
  }, [account.institution]);

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
          for (const [instName, entities] of Object.entries(LEGAL_ENTITIES)) {
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
  }, [onSelectionChange]);

  return {
    getLegalEntities,
    handleLegalEntityChange,
    handleLeiChange
  };
};

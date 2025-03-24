
import { useState, useCallback } from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { LEGAL_ENTITIES, LEI_MAPPING } from "../constants";

export const useLegalEntityMapping = (
  account: FinancialAccountInfo,
  onSelectionChange: (field: keyof FinancialAccountInfo, value: string) => void
) => {
  // Get legal entities for the selected institution
  const getLegalEntities = useCallback(() => {
    if (account.institution && LEGAL_ENTITIES[account.institution]) {
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

  // Handle legal entity identifier change
  const handleLeiChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
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

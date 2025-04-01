
import { Asset, AssetType } from "../types";

/**
 * Maps a portfolio object to the Asset type structure
 */
export const mapPortfolioToAsset = (portfolio: any): Asset => {
  // Default values for demonstration
  const defaultValue = 250000;
  const defaultCurrency = "USD";
  
  return {
    id: portfolio.id,
    name: portfolio.name,
    type: "fund" as AssetType,
    value: portfolio.value || defaultValue,
    currency: portfolio.currency || defaultCurrency,
    institution: portfolio.institution || "Unknown Institution",
    custodian: portfolio.custodian || "Unknown Custodian",
    lastUpdated: new Date().toISOString()
  };
};

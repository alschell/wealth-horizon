
import { Asset, AssetType } from "../types";

/**
 * Maps a portfolio object to the Asset type structure
 */
export const mapPortfolioToAsset = (portfolio: any): Asset => {
  return {
    id: portfolio.id,
    name: portfolio.name,
    type: "fund" as AssetType,
    value: portfolio.value || 0,
    currency: portfolio.currency || "USD",
    institution: portfolio.institution || "",
    custodian: portfolio.custodian || "",
    lastUpdated: new Date().toISOString()
  };
};

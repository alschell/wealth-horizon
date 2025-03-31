
// Types for banks providing advice
export type Bank = {
  id: string;
  name: string;
  description: string;
  services: string[];
  expertise: string[];
  fee?: string;
  logo?: string;
};

// Types for different mandate options
export type MandateType = "discretionary" | "advisory";

// Types for assets that can be included in advice mandates
export type AssetType = "equity" | "bond" | "fund" | "etf" | "alternative" | "cash" | "other";

export type Asset = {
  id: string;
  name: string;
  type: AssetType;
  value: number;
  currency: string;
  quantity?: number;
  institution: string;
  custodian: string;
  portfolioId?: string;
  lastUpdated: string;
};

// Main advice state
export type AdviceState = {
  mandateType: MandateType;
  selectedBank: Bank | null;
  assetsInScope: Asset[];
  assetsOutOfScope: Asset[];
};

// Tab types
export type AdviceTab = "mandate" | "assets" | "review";

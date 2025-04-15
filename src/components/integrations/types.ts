
export interface IntegrationType {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: CategoryType;
  authMethod: "oauth" | "apiKey" | "credentials";
  popular?: boolean;
  new?: boolean;
}

export type CategoryType = 
  | "all" 
  | "banking" 
  | "wealth" 
  | "market_data" 
  | "accounting" 
  | "crm" 
  | "reporting" 
  | "crypto"
  | "analytics"
  | "tax";

export interface ConnectedIntegrationType {
  id: string;
  name: string;
  logo: string;
  category: CategoryType;
  status: "active" | "error" | "pending";
  lastSync: string;
  accountsConnected?: number;
}

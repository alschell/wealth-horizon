
import React from 'react';

// Update the CategoryType to allow objects with id and name
export type CategoryTypeString = 
  | "all" 
  | "banking" 
  | "wealth" 
  | "market_data" 
  | "accounting" 
  | "crm" 
  | "reporting" 
  | "crypto"
  | "analytics"
  | "tax"
  | "aggregators";

export interface CategoryTypeObject {
  id: string;
  name: string;
}

export type CategoryType = CategoryTypeString | CategoryTypeObject;

// Update IntegrationType to make logo optional and add all required fields
export interface IntegrationType {
  id: string;
  name: string;
  description: string;
  logo?: string;
  icon?: React.ReactNode;
  category: string;
  authMethod: "oauth" | "apiKey" | "credentials" | "both";
  apiKeyName?: string;
  authUrl?: string;
  scopes?: string[];
  popular?: boolean;
  new?: boolean;
  features?: string[];
  status?: "stable" | "beta";
}

// Update ConnectedIntegrationType to align with the real structure
export interface ConnectedIntegrationType {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  icon?: React.ReactNode;
  category: CategoryType | string;
  status: "active" | "error" | "pending" | "stable";
  connectionStatus?: "active" | "needs attention";
  lastSync: string;
  lastSynced?: string;
  accountsConnected?: number;
  features?: string[];
  authMethod?: "oauth" | "apiKey" | "credentials" | "both";
  authUrl?: string;
  apiKeyName?: string;
  scopes?: string[];
}

// Add ApiKeyFormData interface
export interface ApiKeyFormData {
  apiKey: string;
  apiSecret?: string;
  accountId?: string;
  service?: string;
}

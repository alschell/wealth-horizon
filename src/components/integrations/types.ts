
import React from 'react';

export interface IntegrationType {
  id: string;
  name: string;
  description: string;
  logo: string;
  icon?: React.ReactNode; // Add icon for JSX element rendering
  category: CategoryType;
  authMethod: "oauth" | "apiKey" | "credentials";
  popular?: boolean;
  new?: boolean;
  features?: string[]; // Add features array
  status?: "stable" | "beta"; // Add status field
  authUrl?: string; // Add OAuth URL
  apiKeyName?: string; // Add API key name
  scopes?: string[]; // Add OAuth scopes
}

export interface CategoryTypeObject {
  id: string;
  name: string;
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
  | "tax"
  | "aggregators" // Add missing category
  | CategoryTypeObject; // Allow object form with id and name

export interface ConnectedIntegrationType {
  id: string;
  name: string;
  logo: string;
  description?: string; // Add description
  icon?: React.ReactNode; // Add icon for JSX element rendering
  category: CategoryType;
  status: "active" | "error" | "pending";
  connectionStatus?: "active" | "needs attention"; // Add connectionStatus
  lastSync: string;
  lastSynced?: string; // Add lastSynced for compatibility
  accountsConnected?: number;
  features?: string[]; // Add features array
  authMethod?: "oauth" | "apiKey" | "credentials"; // Add authMethod
  authUrl?: string; // Add OAuth URL
  apiKeyName?: string; // Add API key name
  scopes?: string[]; // Add OAuth scopes
}

// Add ApiKeyFormData interface for authentication
export interface ApiKeyFormData {
  apiKey: string;
  apiSecret?: string;
  accountId?: string;
}

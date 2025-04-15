
import { ReactNode } from "react";

export type CategoryType = string | { id: string; name: string };

export type IntegrationStatus = "stable" | "beta" | "alpha";
export type ConnectionStatus = "active" | "pending" | "error" | "needs attention";
export type AuthMethod = "oauth" | "apiKey" | "credentials" | "both";

export interface IntegrationType {
  id: string;
  name: string;
  logo?: string;
  description: string;
  icon: ReactNode;
  category: string;
  features: string[];
  status: IntegrationStatus;
  authMethod: AuthMethod;
  authUrl?: string;
  apiKeyName?: string;
  scopes?: string[];
}

export interface ConnectedIntegrationType {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  category: string;
  features: string[];
  status: IntegrationStatus;
  connectionStatus: ConnectionStatus;
  lastSync: string;
  lastSynced?: string; // For backward compatibility
  authMethod: AuthMethod;
  authUrl?: string;
  apiKeyName?: string;
  scopes?: string[];
}

export interface ApiKeyFormData {
  apiKey: string;
  service?: string;
}

export interface AuthenticationDialogProps {
  integration: IntegrationType;
  isOpen: boolean;
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
}

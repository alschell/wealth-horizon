
import React from "react";
import { ConnectedIntegrationType } from "../types";
import { Coins, ReceiptText, CreditCard, Database } from "lucide-react";

export const connectedIntegrations: ConnectedIntegrationType[] = [
  {
    id: "coinbase",
    name: "Coinbase",
    description: "Connect your Coinbase accounts for crypto asset tracking",
    icon: <Coins className="h-6 w-6" />,
    category: "crypto",
    features: [
      "Auto-sync crypto holdings",
      "Track performance in real time",
      "Consolidated reporting with other assets"
    ],
    status: "stable" as const,
    connectionStatus: "active",
    lastSynced: "Today at 09:45 AM",
    authMethod: "oauth" as const,
    authUrl: "https://www.coinbase.com/oauth/authorize",
    scopes: ["wallet:accounts:read", "wallet:transactions:read"]
  },
  {
    id: "quickbooks",
    name: "QuickBooks",
    description: "Connect your accounting software for seamless reporting",
    icon: <ReceiptText className="h-6 w-6" />,
    category: "accounting",
    features: [
      "Sync financial data",
      "Automated bookkeeping",
      "Consolidated financial statements"
    ],
    status: "stable" as const,
    connectionStatus: "needs attention",
    lastSynced: "Apr 02, 2025",
    authMethod: "oauth" as const,
    authUrl: "https://appcenter.intuit.com/connect/oauth2"
  },
  {
    id: "plaid",
    name: "Plaid",
    description: "Connect bank accounts securely",
    icon: <CreditCard className="h-6 w-6" />,
    category: "banking",
    features: [
      "Secure bank connections",
      "Transaction history",
      "Account balance monitoring"
    ],
    status: "stable" as const,
    connectionStatus: "active",
    lastSynced: "Today at 10:30 AM",
    authMethod: "apiKey" as const,
    apiKeyName: "Plaid Client ID and Secret"
  },
  // This is a placeholder that will be replaced dynamically from onboarding data
  {
    id: "aggregator-placeholder",
    name: "Connected Aggregator",
    description: "Your financial data aggregator",
    icon: <Database className="h-6 w-6" />,
    category: "aggregators",
    features: [
      "Automatic data import",
      "Financial data consolidation",
      "Reporting integration"
    ],
    status: "stable" as const,
    connectionStatus: "active", 
    lastSynced: "Today at 11:00 AM",
    authMethod: "apiKey" as const,
    apiKeyName: "Aggregator API Key"
  }
];

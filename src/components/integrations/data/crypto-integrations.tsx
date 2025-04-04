
import React from "react";
import { IntegrationType } from "../types";
import { Coins, Key } from "lucide-react";

export const cryptoIntegrations: IntegrationType[] = [
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
    authMethod: "oauth",
    authUrl: "https://www.coinbase.com/oauth/authorize",
    scopes: ["wallet:accounts:read", "wallet:transactions:read"]
  },
  {
    id: "kraken",
    name: "Kraken",
    description: "Import your Kraken cryptocurrency holdings",
    icon: <Coins className="h-6 w-6" />,
    category: "crypto",
    features: [
      "Import transaction history",
      "Track portfolio performance",
      "Automated tax reporting"
    ],
    status: "beta" as const,
    authMethod: "both",
    authUrl: "https://www.kraken.com/oauth2/authorize",
    apiKeyName: "Kraken API Key",
    scopes: ["read"]
  },
  {
    id: "ledger",
    name: "Ledger",
    description: "Connect with your hardware wallets for secure tracking",
    icon: <Key className="h-6 w-6" />,
    category: "crypto",
    features: [
      "Secure read-only connection",
      "Track hardware wallet balances",
      "Multi-wallet support"
    ],
    status: "beta" as const,
    authMethod: "apiKey",
    apiKeyName: "Ledger API Key"
  }
].sort((a, b) => a.name.localeCompare(b.name));

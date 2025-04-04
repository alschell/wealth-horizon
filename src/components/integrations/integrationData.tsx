
import React from "react";
import { IntegrationType, CategoryType, ConnectedIntegrationType } from "./types";
import { CreditCard, BarChart, Calculator, ReceiptText, Coins, FileText, Key, LineChart } from "lucide-react";

export const integrationCategories: CategoryType[] = [
  { id: "crypto", name: "Crypto Services" },
  { id: "tax", name: "Tax Services" },
  { id: "accounting", name: "Accounting" },
  { id: "banking", name: "Banking" },
  { id: "reporting", name: "Reporting" }
];

export const availableIntegrations: IntegrationType[] = [
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
    status: "stable",
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
    status: "beta",
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
    status: "beta",
    authMethod: "apiKey",
    apiKeyName: "Ledger API Key"
  },
  {
    id: "taxbit",
    name: "TaxBit",
    description: "Automated cryptocurrency tax reporting and compliance",
    icon: <Calculator className="h-6 w-6" />,
    category: "tax",
    features: [
      "Crypto tax calculations",
      "Automated tax forms",
      "Year-round tax optimization"
    ],
    status: "stable",
    authMethod: "oauth",
    authUrl: "https://taxbit.com/app/oauth/authorize"
  },
  {
    id: "koinly",
    name: "Koinly",
    description: "Crypto tax software for investors and accountants",
    icon: <Calculator className="h-6 w-6" />,
    category: "tax",
    features: [
      "Import from 350+ exchanges",
      "Tax loss harvesting",
      "Capital gains reports"
    ],
    status: "stable",
    authMethod: "apiKey",
    apiKeyName: "Koinly API Key"
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
    status: "stable",
    authMethod: "oauth",
    authUrl: "https://appcenter.intuit.com/connect/oauth2"
  },
  {
    id: "xero",
    name: "Xero",
    description: "Cloud-based accounting software connection",
    icon: <ReceiptText className="h-6 w-6" />,
    category: "accounting",
    features: [
      "Real-time financial data",
      "Automated reconciliation",
      "Custom financial reports"
    ],
    status: "stable",
    authMethod: "oauth",
    authUrl: "https://login.xero.com/identity/connect/authorize"
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
    status: "stable",
    authMethod: "apiKey",
    apiKeyName: "Plaid Client ID and Secret"
  },
  {
    id: "tableau",
    name: "Tableau",
    description: "Advanced data visualization and reporting",
    icon: <BarChart className="h-6 w-6" />,
    category: "reporting",
    features: [
      "Custom wealth dashboards",
      "Interactive visualizations",
      "Data-driven insights"
    ],
    status: "stable",
    authMethod: "apiKey",
    apiKeyName: "Tableau API Token"
  },
  {
    id: "power-bi",
    name: "Power BI",
    description: "Microsoft's business analytics service",
    icon: <LineChart className="h-6 w-6" />,
    category: "reporting",
    features: [
      "Custom wealth reports",
      "Interactive data exploration",
      "Scheduled report delivery"
    ],
    status: "beta",
    authMethod: "oauth",
    authUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize"
  },
  {
    id: "turbotax",
    name: "TurboTax",
    description: "Import financial data directly to TurboTax",
    icon: <FileText className="h-6 w-6" />,
    category: "tax",
    features: [
      "Investment data import",
      "Tax document organization",
      "Capital gains reporting"
    ],
    status: "beta",
    authMethod: "oauth",
    authUrl: "https://accounts.intuit.com/oauth2/v2/authorize"
  }
];

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
    status: "stable",
    connectionStatus: "active",
    lastSynced: "Today at 09:45 AM",
    authMethod: "oauth",
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
    status: "stable",
    connectionStatus: "needs attention",
    lastSynced: "Apr 02, 2025",
    authMethod: "oauth",
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
    status: "stable",
    connectionStatus: "active",
    lastSynced: "Today at 10:30 AM",
    authMethod: "apiKey",
    apiKeyName: "Plaid Client ID and Secret"
  }
];

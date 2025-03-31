
import { Asset } from "../types";

export const mockAssets: Asset[] = [
  {
    id: "asset-1",
    name: "US Large Cap Equity Portfolio",
    type: "equity",
    value: 12500000,
    currency: "USD",
    institution: "JP Morgan",
    custodian: "State Street",
    portfolioId: "port-001",
    lastUpdated: "2023-10-15"
  },
  {
    id: "asset-2",
    name: "European Growth Fund",
    type: "fund",
    value: 8750000,
    currency: "EUR",
    institution: "UBS",
    custodian: "Northern Trust",
    portfolioId: "port-002",
    lastUpdated: "2023-10-14"
  },
  {
    id: "asset-3",
    name: "Global Technology ETF",
    type: "etf",
    value: 5300000,
    currency: "USD",
    quantity: 45000,
    institution: "Morgan Stanley",
    custodian: "BNY Mellon",
    portfolioId: "port-001",
    lastUpdated: "2023-10-15"
  },
  {
    id: "asset-4",
    name: "US Treasury Bonds",
    type: "bond",
    value: 7200000,
    currency: "USD",
    institution: "Goldman Sachs",
    custodian: "State Street",
    portfolioId: "port-003",
    lastUpdated: "2023-10-13"
  },
  {
    id: "asset-5",
    name: "Private Equity Fund III",
    type: "alternative",
    value: 4500000,
    currency: "USD",
    institution: "Blackstone",
    custodian: "JP Morgan",
    portfolioId: "port-004",
    lastUpdated: "2023-09-30"
  },
  {
    id: "asset-6",
    name: "Real Estate Investment Trust",
    type: "alternative",
    value: 3800000,
    currency: "USD",
    institution: "BlackRock",
    custodian: "Northern Trust",
    portfolioId: "port-004",
    lastUpdated: "2023-10-10"
  },
  {
    id: "asset-7",
    name: "Asian High Yield Bond Fund",
    type: "bond",
    value: 2900000,
    currency: "USD",
    institution: "PIMCO",
    custodian: "State Street",
    portfolioId: "port-003",
    lastUpdated: "2023-10-12"
  },
  {
    id: "asset-8",
    name: "Cash Reserves",
    type: "cash",
    value: 6500000,
    currency: "USD",
    institution: "JP Morgan",
    custodian: "JP Morgan",
    portfolioId: "port-005",
    lastUpdated: "2023-10-16"
  },
  {
    id: "asset-9",
    name: "Healthcare Innovation Fund",
    type: "fund",
    value: 4200000,
    currency: "USD",
    institution: "Wellington",
    custodian: "BNY Mellon",
    portfolioId: "port-002",
    lastUpdated: "2023-10-11"
  },
  {
    id: "asset-10",
    name: "Sustainable Energy ETF",
    type: "etf",
    value: 3100000,
    currency: "USD",
    quantity: 28000,
    institution: "iShares",
    custodian: "State Street",
    portfolioId: "port-001",
    lastUpdated: "2023-10-15"
  }
];

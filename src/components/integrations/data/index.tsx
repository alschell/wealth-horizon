
import { integrationCategories } from "./categories";
import { cryptoIntegrations } from "./crypto-integrations";
import { taxIntegrations } from "./tax-integrations";
import { accountingIntegrations } from "./accounting-integrations";
import { bankingIntegrations } from "./banking-integrations";
import { reportingIntegrations } from "./reporting-integrations";
import { aggregatorIntegrations } from "./aggregator-integrations";
import { connectedIntegrations } from "./connected-integrations";
import { IntegrationType } from "../types";

// Combine all integrations into a single array for the available integrations
export const availableIntegrations: IntegrationType[] = [
  ...accountingIntegrations,
  ...aggregatorIntegrations,
  ...bankingIntegrations,
  ...cryptoIntegrations,
  ...reportingIntegrations,
  ...taxIntegrations
];

export {
  integrationCategories,
  cryptoIntegrations,
  taxIntegrations,
  accountingIntegrations,
  bankingIntegrations,
  reportingIntegrations,
  aggregatorIntegrations,
  connectedIntegrations
};


import { integrationCategories } from "./categories";
import { cryptoIntegrations } from "./crypto-integrations";
import { taxIntegrations } from "./tax-integrations";
import { accountingIntegrations } from "./accounting-integrations";
import { bankingIntegrations } from "./banking-integrations";
import { reportingIntegrations } from "./reporting-integrations";
import { aggregatorIntegrations } from "./aggregator-integrations";
import { storageIntegrations } from "./storage-integrations";
import { legalIntegrations } from "./legal-integrations";
import { documentIntegrations } from "./document-integrations";
import { esgIntegrations } from "./esg-integrations";
import { connectedIntegrations } from "./connected-integrations";
import { IntegrationType } from "../types";

// Combine all integrations into a single array for the available integrations
export const availableIntegrations: IntegrationType[] = [
  ...accountingIntegrations,
  ...aggregatorIntegrations,
  ...bankingIntegrations,
  ...cryptoIntegrations,
  ...documentIntegrations,
  ...esgIntegrations,
  ...legalIntegrations,
  ...reportingIntegrations,
  ...storageIntegrations,
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
  storageIntegrations,
  legalIntegrations,
  documentIntegrations,
  esgIntegrations,
  connectedIntegrations
};


import { CashAccount } from "../types";

export const mockCashAccountsFlat: CashAccount[] = [
  {
    id: "cash-1",
    name: "USD Primary Account",
    institutionId: "inst-1",
    legalEntityId: "le-1",
    currency: "USD",
    balance: 2500000
  },
  {
    id: "cash-2",
    name: "EUR Primary Account",
    institutionId: "inst-1",
    legalEntityId: "le-1",
    currency: "EUR",
    balance: 1500000
  },
  {
    id: "cash-3",
    name: "USD Trading Account",
    institutionId: "inst-2",
    legalEntityId: "le-2",
    currency: "USD",
    balance: 750000
  },
  {
    id: "cash-4",
    name: "GBP Trading Account",
    institutionId: "inst-2",
    legalEntityId: "le-2",
    currency: "GBP",
    balance: 650000
  },
  {
    id: "cash-5",
    name: "USD Investment Account",
    institutionId: "inst-2",
    legalEntityId: "le-3",
    currency: "USD",
    balance: 1200000
  },
  {
    id: "cash-6",
    name: "CHF Primary Account",
    institutionId: "inst-1",
    legalEntityId: "le-1",
    currency: "CHF",
    balance: 900000
  },
  {
    id: "cash-7",
    name: "JPY Trading Account",
    institutionId: "inst-2",
    legalEntityId: "le-2",
    currency: "JPY",
    balance: 85000000
  }
];

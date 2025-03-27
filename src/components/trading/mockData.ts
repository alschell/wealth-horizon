
import { 
  Institution, 
  Portfolio, 
  CashAccount, 
  CreditFacility, 
  Instrument,
  Broker
} from "./types";

export const mockInstruments: Instrument[] = [
  {
    id: "instr-1",
    symbol: "AAPL",
    name: "Apple Inc.",
    type: "Equity",
    currentPrice: 178.72,
    currency: "USD",
    exchange: "NASDAQ"
  },
  {
    id: "instr-2",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    type: "Equity",
    currentPrice: 328.79,
    currency: "USD",
    exchange: "NASDAQ"
  },
  {
    id: "instr-3",
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    type: "Equity",
    currentPrice: 137.14,
    currency: "USD",
    exchange: "NASDAQ"
  },
  {
    id: "instr-4",
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    type: "Equity",
    currentPrice: 178.22,
    currency: "USD",
    exchange: "NASDAQ"
  },
  {
    id: "instr-5",
    symbol: "TSLA",
    name: "Tesla, Inc.",
    type: "Equity",
    currentPrice: 177.71,
    currency: "USD",
    exchange: "NASDAQ"
  },
  {
    id: "instr-6",
    symbol: "VOD",
    name: "Vodafone Group Plc",
    type: "Equity",
    currentPrice: 69.54,
    currency: "GBP",
    exchange: "LSE"
  },
  {
    id: "instr-7",
    symbol: "BMW",
    name: "Bayerische Motoren Werke AG",
    type: "Equity",
    currentPrice: 95.72,
    currency: "EUR",
    exchange: "XETRA"
  }
];

export const mockBrokers: Broker[] = [
  {
    id: "broker-1",
    name: "Goldman Sachs"
  },
  {
    id: "broker-2",
    name: "JP Morgan"
  },
  {
    id: "broker-3",
    name: "Morgan Stanley"
  },
  {
    id: "broker-4",
    name: "UBS"
  },
  {
    id: "broker-5",
    name: "Credit Suisse"
  }
];

// Individual portfolios, cash accounts, and credit facilities
export const mockPortfoliosFlat: Portfolio[] = [
  {
    id: "port-1",
    name: "Global Equities Portfolio",
    institutionId: "inst-1",
    legalEntityId: "le-1",
    holdings: [
      { instrumentId: "instr-1", quantity: 1000, averagePurchasePrice: 150.25 },
      { instrumentId: "instr-2", quantity: 500, averagePurchasePrice: 290.15 },
      { instrumentId: "instr-3", quantity: 200, averagePurchasePrice: 120.50 }
    ]
  },
  {
    id: "port-2",
    name: "Tech Growth Portfolio",
    institutionId: "inst-1",
    legalEntityId: "le-1",
    holdings: [
      { instrumentId: "instr-1", quantity: 2000, averagePurchasePrice: 145.30 },
      { instrumentId: "instr-4", quantity: 300, averagePurchasePrice: 160.75 },
      { instrumentId: "instr-5", quantity: 500, averagePurchasePrice: 190.20 }
    ]
  },
  {
    id: "port-3",
    name: "European Equities",
    institutionId: "inst-2",
    legalEntityId: "le-2",
    holdings: [
      { instrumentId: "instr-6", quantity: 1500, averagePurchasePrice: 65.80 },
      { instrumentId: "instr-7", quantity: 800, averagePurchasePrice: 92.60 }
    ]
  },
  {
    id: "port-4",
    name: "US Tech Portfolio",
    institutionId: "inst-2",
    legalEntityId: "le-3",
    holdings: [
      { instrumentId: "instr-1", quantity: 750, averagePurchasePrice: 155.50 },
      { instrumentId: "instr-2", quantity: 300, averagePurchasePrice: 310.25 },
      { instrumentId: "instr-4", quantity: 450, averagePurchasePrice: 170.30 }
    ]
  }
];

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
  }
];

export const mockCreditFacilitiesFlat: CreditFacility[] = [
  {
    id: "credit-1",
    name: "Corporate Credit Line",
    institutionId: "inst-1",
    legalEntityId: "le-1",
    currency: "USD",
    limit: 10000000,
    used: 2500000,
    available: 7500000
  },
  {
    id: "credit-2",
    name: "Euro Credit Facility",
    institutionId: "inst-1",
    legalEntityId: "le-1",
    currency: "EUR",
    limit: 5000000,
    used: 1000000,
    available: 4000000
  },
  {
    id: "credit-3",
    name: "USD Credit Line",
    institutionId: "inst-2",
    legalEntityId: "le-2",
    currency: "USD",
    limit: 3000000,
    used: 1500000,
    available: 1500000
  },
  {
    id: "credit-4",
    name: "Multicurrency Facility",
    institutionId: "inst-2",
    legalEntityId: "le-3",
    currency: "USD",
    limit: 7500000,
    used: 3000000,
    available: 4500000
  }
];

// Hierarchical structure for institutions view
export const mockPortfoliosByInstitution: Institution[] = [
  {
    id: "inst-1",
    name: "HSBC",
    legalEntities: [
      {
        id: "le-1",
        name: "HSBC Holdings plc",
        portfolios: [
          mockPortfoliosFlat[0],
          mockPortfoliosFlat[1]
        ],
        cashAccounts: [
          mockCashAccountsFlat[0],
          mockCashAccountsFlat[1]
        ],
        creditFacilities: [
          mockCreditFacilitiesFlat[0],
          mockCreditFacilitiesFlat[1]
        ]
      }
    ]
  },
  {
    id: "inst-2",
    name: "Citibank",
    legalEntities: [
      {
        id: "le-2",
        name: "Citigroup Global Markets Ltd",
        portfolios: [
          mockPortfoliosFlat[2]
        ],
        cashAccounts: [
          mockCashAccountsFlat[2],
          mockCashAccountsFlat[3]
        ],
        creditFacilities: [
          mockCreditFacilitiesFlat[2]
        ]
      },
      {
        id: "le-3",
        name: "Citibank NA",
        portfolios: [
          mockPortfoliosFlat[3]
        ],
        cashAccounts: [
          mockCashAccountsFlat[4]
        ],
        creditFacilities: [
          mockCreditFacilitiesFlat[3]
        ]
      }
    ]
  }
];

// Structured cash accounts for institutions view
export const mockCashAccountsByInstitution: Institution[] = mockPortfoliosByInstitution;

// Structured credit facilities for institutions view
export const mockCreditFacilitiesByInstitution: Institution[] = mockPortfoliosByInstitution;

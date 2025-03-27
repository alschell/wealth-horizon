
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
  },
  // Add S&P 500 stocks
  {
    id: "instr-8",
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    type: "Equity",
    currentPrice: 189.82,
    currency: "USD",
    exchange: "NYSE"
  },
  {
    id: "instr-9",
    symbol: "V",
    name: "Visa Inc.",
    type: "Equity",
    currentPrice: 275.36,
    currency: "USD",
    exchange: "NYSE"
  },
  {
    id: "instr-10",
    symbol: "PG",
    name: "Procter & Gamble Co.",
    type: "Equity",
    currentPrice: 166.43,
    currency: "USD",
    exchange: "NYSE"
  },
  {
    id: "instr-11",
    symbol: "UNH",
    name: "UnitedHealth Group Inc.",
    type: "Equity",
    currentPrice: 524.61,
    currency: "USD",
    exchange: "NYSE"
  },
  {
    id: "instr-12",
    symbol: "HD",
    name: "Home Depot Inc.",
    type: "Equity",
    currentPrice: 343.22,
    currency: "USD",
    exchange: "NYSE"
  },
  {
    id: "instr-13",
    symbol: "BAC",
    name: "Bank of America Corp.",
    type: "Equity",
    currentPrice: 38.46,
    currency: "USD",
    exchange: "NYSE"
  },
  {
    id: "instr-14",
    symbol: "XOM",
    name: "Exxon Mobil Corp.",
    type: "Equity",
    currentPrice: 114.96,
    currency: "USD",
    exchange: "NYSE"
  },
  {
    id: "instr-15",
    symbol: "PFE",
    name: "Pfizer Inc.",
    type: "Equity",
    currentPrice: 28.35,
    currency: "USD",
    exchange: "NYSE"
  },
  {
    id: "instr-16",
    symbol: "CSCO",
    name: "Cisco Systems Inc.",
    type: "Equity",
    currentPrice: 47.71,
    currency: "USD",
    exchange: "NASDAQ"
  },
  {
    id: "instr-17",
    symbol: "CVX",
    name: "Chevron Corp.",
    type: "Equity",
    currentPrice: 152.32,
    currency: "USD",
    exchange: "NYSE"
  },
  {
    id: "instr-18",
    symbol: "ADBE",
    name: "Adobe Inc.",
    type: "Equity",
    currentPrice: 521.07,
    currency: "USD",
    exchange: "NASDAQ"
  },
  {
    id: "instr-19",
    symbol: "WMT",
    name: "Walmart Inc.",
    type: "Equity",
    currentPrice: 69.89,
    currency: "USD",
    exchange: "NYSE"
  },
  {
    id: "instr-20",
    symbol: "DIS",
    name: "Walt Disney Co.",
    type: "Equity",
    currentPrice: 111.21,
    currency: "USD",
    exchange: "NYSE"
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
  },
  {
    id: "broker-6",
    name: "Citigroup"
  },
  {
    id: "broker-7",
    name: "Bank of America Merrill Lynch"
  },
  {
    id: "broker-8",
    name: "Deutsche Bank"
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
      { instrumentId: "instr-3", quantity: 200, averagePurchasePrice: 120.50 },
      { instrumentId: "instr-8", quantity: 300, averagePurchasePrice: 160.50 },
      { instrumentId: "instr-11", quantity: 150, averagePurchasePrice: 495.75 },
      { instrumentId: "instr-14", quantity: 400, averagePurchasePrice: 105.80 }
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
      { instrumentId: "instr-5", quantity: 500, averagePurchasePrice: 190.20 },
      { instrumentId: "instr-16", quantity: 800, averagePurchasePrice: 45.60 },
      { instrumentId: "instr-18", quantity: 200, averagePurchasePrice: 490.30 }
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
      { instrumentId: "instr-4", quantity: 450, averagePurchasePrice: 170.30 },
      { instrumentId: "instr-3", quantity: 350, averagePurchasePrice: 125.40 },
      { instrumentId: "instr-5", quantity: 650, averagePurchasePrice: 185.50 }
    ]
  },
  {
    id: "port-5",
    name: "Dividend Income Portfolio",
    institutionId: "inst-1",
    legalEntityId: "le-1",
    holdings: [
      { instrumentId: "instr-10", quantity: 600, averagePurchasePrice: 155.20 },
      { instrumentId: "instr-13", quantity: 1200, averagePurchasePrice: 35.40 },
      { instrumentId: "instr-15", quantity: 900, averagePurchasePrice: 26.80 },
      { instrumentId: "instr-17", quantity: 400, averagePurchasePrice: 145.60 },
      { instrumentId: "instr-19", quantity: 750, averagePurchasePrice: 65.30 }
    ]
  },
  {
    id: "port-6",
    name: "Financial Services Portfolio",
    institutionId: "inst-2",
    legalEntityId: "le-2",
    holdings: [
      { instrumentId: "instr-8", quantity: 800, averagePurchasePrice: 175.40 },
      { instrumentId: "instr-9", quantity: 400, averagePurchasePrice: 260.75 },
      { instrumentId: "instr-13", quantity: 2000, averagePurchasePrice: 36.20 }
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
  },
  {
    id: "credit-5",
    name: "GBP Credit Line",
    institutionId: "inst-1",
    legalEntityId: "le-1",
    currency: "GBP",
    limit: 4000000,
    used: 1200000,
    available: 2800000
  },
  {
    id: "credit-6",
    name: "Investment Credit Facility",
    institutionId: "inst-2",
    legalEntityId: "le-3",
    currency: "EUR",
    limit: 6000000,
    used: 2000000,
    available: 4000000
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
          mockPortfoliosFlat[1],
          mockPortfoliosFlat[4]
        ],
        cashAccounts: [
          mockCashAccountsFlat[0],
          mockCashAccountsFlat[1],
          mockCashAccountsFlat[5]
        ],
        creditFacilities: [
          mockCreditFacilitiesFlat[0],
          mockCreditFacilitiesFlat[1],
          mockCreditFacilitiesFlat[4]
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
          mockPortfoliosFlat[2],
          mockPortfoliosFlat[5]
        ],
        cashAccounts: [
          mockCashAccountsFlat[2],
          mockCashAccountsFlat[3],
          mockCashAccountsFlat[6]
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
          mockCreditFacilitiesFlat[3],
          mockCreditFacilitiesFlat[5]
        ]
      }
    ]
  }
];

// Structured cash accounts for institutions view
export const mockCashAccountsByInstitution: Institution[] = mockPortfoliosByInstitution;

// Structured credit facilities for institutions view
export const mockCreditFacilitiesByInstitution: Institution[] = mockPortfoliosByInstitution;

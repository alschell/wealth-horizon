
export type OrderType = "buy" | "sell" | "sell_short" | "exchange";

export type ViewMode = "portfolios" | "institutions";

export type OrderExecutionType = "market" | "limit" | "stop";

export type TimeInForce = "day" | "gtc" | "fok" | "ioc";

export type Institution = {
  id: string;
  name: string;
  legalEntities: LegalEntity[];
};

export type LegalEntity = {
  id: string;
  name: string;
  portfolios: Portfolio[];
  cashAccounts: CashAccount[];
  creditFacilities: CreditFacility[];
};

export type Portfolio = {
  id: string;
  name: string;
  institutionId: string;
  legalEntityId: string;
  holdings: Holding[];
};

export type Holding = {
  instrumentId: string;
  quantity: number;
  averagePurchasePrice: number;
};

export type CashAccount = {
  id: string;
  name: string;
  institutionId: string;
  legalEntityId: string;
  currency: string;
  balance: number;
  accountNumber?: string; // Add this property as optional
};

export type CreditFacility = {
  id: string;
  name: string;
  institutionId: string;
  legalEntityId: string;
  currency: string;
  limit: number;
  used: number;
  available: number;
  type?: string; // Add this property as optional
  interestRate?: number; // Added this property as optional
};

export type Instrument = {
  id: string;
  symbol: string;
  name: string;
  type: string;
  currentPrice: number;
  currency: string;
  exchange: string;
  isin?: string; // Added ISIN property as optional
};

export type Broker = {
  id: string;
  name: string;
  description?: string; // Added description as optional
  fee?: string; // Added fee as optional
};

export type AllocationItem = {
  id: string;
  name: string;
  institutionName: string;
  legalEntityName: string;
  quantity?: number;
  amount?: number;
  currency?: string;
  available?: number;
};

export type InstrumentAllocation = {
  portfolioId: string;
  quantity: number;
};

export type FundingAllocation = {
  sourceId: string;
  sourceType: "cash" | "credit";
  amount: number;
  currency: string;
};

export type DepositAllocation = {
  destinationId: string;
  destinationType: "portfolio" | "cash";
  quantity?: number;
  amount?: number;
  currency?: string;
};

export type TradeOrder = {
  orderType: OrderType;
  instrumentId: string;
  quantity: number;
  price: number;
  totalAmount: number;
  brokerId: string | "best";
  instrumentAllocations: InstrumentAllocation[];
  fundingAllocations: FundingAllocation[];
  depositAllocations: DepositAllocation[];
  executionType?: OrderExecutionType | string;
  timeInForce?: TimeInForce | string;
  leverage: number; // Added leverage property
};

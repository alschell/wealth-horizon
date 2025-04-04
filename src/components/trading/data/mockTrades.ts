
interface Trade {
  id: string;
  instrumentId: string;
  instrumentSymbol: string;
  instrumentName: string;
  orderType: 'buy' | 'sell' | 'sell_short' | 'exchange';
  executionType: 'market' | 'limit' | 'stop';
  quantity: number;
  price: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  createdAt: string;
  executedAt?: string;
  brokerId: string;
  brokerName: string;
}

// Mock pending trades
export const mockPendingTrades: Trade[] = [
  {
    id: "PT-2025-0001",
    instrumentId: "AAPL",
    instrumentSymbol: "AAPL",
    instrumentName: "Apple Inc.",
    orderType: "buy",
    executionType: "limit",
    quantity: 10,
    price: 178.25,
    status: "pending",
    createdAt: "2025-04-03T14:30:00Z",
    brokerId: "broker-1",
    brokerName: "Alpha Securities"
  },
  {
    id: "PT-2025-0002",
    instrumentId: "MSFT",
    instrumentSymbol: "MSFT",
    instrumentName: "Microsoft Corporation",
    orderType: "sell",
    executionType: "market",
    quantity: 5,
    price: 415.75,
    status: "pending",
    createdAt: "2025-04-03T15:20:00Z",
    brokerId: "broker-2",
    brokerName: "Beta Investments"
  },
  {
    id: "PT-2025-0003",
    instrumentId: "AMZN",
    instrumentSymbol: "AMZN",
    instrumentName: "Amazon.com Inc.",
    orderType: "buy",
    executionType: "stop",
    quantity: 8,
    price: 182.50,
    status: "pending",
    createdAt: "2025-04-03T16:15:00Z",
    brokerId: "broker-1",
    brokerName: "Alpha Securities"
  }
];

// Mock completed trades
export const mockCompletedTrades: Trade[] = [
  {
    id: "TR-2025-0001",
    instrumentId: "AAPL",
    instrumentSymbol: "AAPL",
    instrumentName: "Apple Inc.",
    orderType: "buy",
    executionType: "market",
    quantity: 15,
    price: 175.30,
    status: "completed",
    createdAt: "2025-04-01T10:15:00Z",
    executedAt: "2025-04-01T10:15:05Z",
    brokerId: "broker-1",
    brokerName: "Alpha Securities"
  },
  {
    id: "TR-2025-0002",
    instrumentId: "NVDA",
    instrumentSymbol: "NVDA",
    instrumentName: "NVIDIA Corporation",
    orderType: "sell",
    executionType: "limit",
    quantity: 7,
    price: 912.45,
    status: "completed",
    createdAt: "2025-04-01T11:30:00Z",
    executedAt: "2025-04-01T13:45:30Z",
    brokerId: "broker-2",
    brokerName: "Beta Investments"
  },
  {
    id: "TR-2025-0003",
    instrumentId: "TSLA",
    instrumentSymbol: "TSLA",
    instrumentName: "Tesla, Inc.",
    orderType: "buy",
    executionType: "market",
    quantity: 12,
    price: 168.70,
    status: "completed",
    createdAt: "2025-04-02T09:20:00Z",
    executedAt: "2025-04-02T09:20:05Z",
    brokerId: "broker-3",
    brokerName: "Gamma Trading"
  },
  {
    id: "TR-2025-0004",
    instrumentId: "GOOG",
    instrumentSymbol: "GOOG",
    instrumentName: "Alphabet Inc.",
    orderType: "sell_short",
    executionType: "limit",
    quantity: 3,
    price: 148.25,
    status: "completed",
    createdAt: "2025-04-02T14:35:00Z",
    executedAt: "2025-04-02T15:10:22Z",
    brokerId: "broker-1",
    brokerName: "Alpha Securities"
  },
  {
    id: "TR-2025-0005",
    instrumentId: "META",
    instrumentSymbol: "META",
    instrumentName: "Meta Platforms, Inc.",
    orderType: "buy",
    executionType: "stop",
    quantity: 20,
    price: 485.90,
    status: "failed",
    createdAt: "2025-04-02T16:15:00Z",
    brokerId: "broker-2",
    brokerName: "Beta Investments"
  },
  {
    id: "TR-2025-0006",
    instrumentId: "AMD",
    instrumentSymbol: "AMD",
    instrumentName: "Advanced Micro Devices, Inc.",
    orderType: "exchange",
    executionType: "market",
    quantity: 25,
    price: 168.30,
    status: "completed",
    createdAt: "2025-04-03T10:05:00Z",
    executedAt: "2025-04-03T10:05:10Z",
    brokerId: "broker-3",
    brokerName: "Gamma Trading"
  },
  {
    id: "TR-2025-0007",
    instrumentId: "INTC",
    instrumentSymbol: "INTC",
    instrumentName: "Intel Corporation",
    orderType: "sell",
    executionType: "limit",
    quantity: 30,
    price: 42.15,
    status: "cancelled",
    createdAt: "2025-04-03T11:20:00Z",
    brokerId: "broker-1",
    brokerName: "Alpha Securities"
  }
];

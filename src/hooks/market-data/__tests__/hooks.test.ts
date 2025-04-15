
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { 
  useQuote, 
  useMarketNews, 
  useCompanyNews,
  useSymbolSearch,
  useIndices,
  useCandleData
} from '../hooks';

// Mock the API functions
jest.mock('@/utils/market-data/api', () => ({
  getQuote: jest.fn().mockResolvedValue({ price: 150.0, symbol: 'AAPL' }),
  getMarketNews: jest.fn().mockResolvedValue([{ id: 1, title: 'Test News' }]),
  getCompanyNews: jest.fn().mockResolvedValue([{ id: 2, title: 'Company News' }]),
  searchSymbols: jest.fn().mockResolvedValue({ result: [{ symbol: 'AAPL', name: 'Apple Inc.' }] }),
  getIndices: jest.fn().mockResolvedValue([{ symbol: '^GSPC', name: 'S&P 500', price: 4000 }]),
  getCandleData: jest.fn().mockResolvedValue({ t: [1617235200], c: [150.0] }),
  formatQuote: jest.fn().mockReturnValue({ formattedPrice: '$150.00' }),
  refreshMarketData: jest.fn().mockResolvedValue(true)
}));

// Create a wrapper for the react-query provider
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('Market Data Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useQuote', () => {
    it('should fetch and return quote data', async () => {
      const { result } = renderHook(() => useQuote('AAPL'), {
        wrapper: createWrapper(),
      });

      // Initially loading
      expect(result.current.isLoading).toBe(true);

      // Wait for the query to resolve
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      // Check the data
      expect(result.current.data).toBeDefined();
      expect(result.current.data?.raw.symbol).toBe('AAPL');
      expect(result.current.data?.formatted).toBeDefined();
    });
  });

  describe('useMarketNews', () => {
    it('should fetch and return market news', async () => {
      const { result } = renderHook(() => useMarketNews('general', 5), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.data).toHaveLength(1);
      expect(result.current.data?.[0].title).toBe('Test News');
    });
  });

  // Add more tests for other hooks...
});

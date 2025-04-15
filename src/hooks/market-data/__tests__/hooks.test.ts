
import { renderHook, act } from '@testing-library/react-hooks';
import { useQuote, useMarketNews, useCompanyNews, useSymbolSearch, useIndices, useCandleData } from '../index';
import * as api from '@/utils/market-data/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

// Mock the API functions
jest.mock('@/utils/market-data/api', () => ({
  getQuote: jest.fn(),
  getMarketNews: jest.fn(),
  getCompanyNews: jest.fn(),
  searchSymbols: jest.fn(),
  getIndices: jest.fn(),
  getCandleData: jest.fn(),
  formatQuote: jest.fn((data) => ({ 
    raw: data, 
    formatted: { price: '100.00' } 
  })),
  refreshMarketData: jest.fn(),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// Wrapper for testing hooks with react-query
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('Market Data Hooks', () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  describe('useQuote', () => {
    it('fetches quote data for a symbol', async () => {
      const mockQuote = { c: 100, d: 5, dp: 5, h: 105, l: 95, o: 98, pc: 95, t: 1234567890 };
      (api.getQuote as jest.Mock).mockResolvedValue(mockQuote);
      (api.formatQuote as jest.Mock).mockReturnValue({
        price: '100.00',
        change: '5.00',
        percentChange: '5.00',
        high: '105.00',
        low: '95.00',
        open: '98.00',
        previousClose: '95.00',
        timestamp: new Date(1234567890 * 1000).toLocaleDateString()
      });

      const { result, waitFor } = renderHook(() => useQuote('AAPL'), { wrapper });

      // Initial state
      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeUndefined();

      await waitFor(() => result.current.isSuccess);

      // After data load
      expect(api.getQuote).toHaveBeenCalledWith('AAPL', expect.any(Object));
      expect(result.current.data).toBeDefined();
      expect(result.current.data?.formatted.price).toBe('100.00');
    });
  });

  // Additional tests can be added for other hooks
});

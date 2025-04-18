
import { renderHook, act, waitFor } from '@testing-library/react';
import { useMarketData } from '../useMarketData';
import { useSymbolSearch } from '../useSymbolSearch';
import { mockMarketData, mockSearchResults } from './mockData';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the API calls
jest.mock('../utils', () => ({
  marketLogger: {
    info: jest.fn(),
    debug: jest.fn(),
    error: jest.fn()
  },
  DEFAULT_QUERY_CONFIG: {
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 1,
  },
}));

// Mock the API functions (these would be in different files in a real app)
jest.mock('@/utils/market-data/api', () => ({
  getQuote: jest.fn(() => Promise.resolve(mockMarketData)),
  searchSymbols: jest.fn(() => Promise.resolve(mockSearchResults)),
}));

describe('Market Data Hooks', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  it('useMarketData should fetch and return market data', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useMarketData('AAPL'), { wrapper });

    // Wait for the query to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockMarketData);
  });

  it('useSymbolSearch should search and return symbols', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useSymbolSearch(), { wrapper });

    // Using act to trigger the search
    await act(async () => {
      await result.current.search('AA');
    });

    // Wait for the query to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.results).toEqual(mockSearchResults);
  });
});

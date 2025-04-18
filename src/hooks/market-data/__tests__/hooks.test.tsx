import { renderHook, act } from '@testing-library/react';
import { useMarketData } from '../useMarketData';
import { useSymbolSearch } from '../useSymbolSearch';
import { mockMarketData, mockSearchResults } from './mockData';
import { QueryClient, QueryClientProvider } from '@tanstack/query-core';

// Mock the API calls
jest.mock('../utils', () => ({
  fetchMarketData: jest.fn(() => Promise.resolve(mockMarketData)),
  searchSymbols: jest.fn(() => Promise.resolve(mockSearchResults)),
}));

describe('Market Data Hooks', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  it('useMarketData should fetch and return market data', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useMarketData('AAPL'), { wrapper });

    await waitForNextUpdate();

    expect(result.current.data).toEqual(mockMarketData);
    expect(result.current.isLoading).toBe(false);
  });

  it('useSymbolSearch should search and return symbols', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useSymbolSearch(), { wrapper });

    act(() => {
      result.current.setSearchTerm('AA');
    });

    await waitForNextUpdate();

    expect(result.current.results).toEqual(mockSearchResults);
    expect(result.current.isLoading).toBe(false);
  });
});

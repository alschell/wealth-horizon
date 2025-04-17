import { useQuery } from "@tanstack/react-query";
import { getIndices } from "@/utils/market-data/api";
import { marketLogger, DEFAULT_QUERY_CONFIG, MOCK_INDICES_DATA } from "./utils";
import { toast } from "sonner";

/**
 * Hook for fetching major market indices
 * 
 * @example
 * const { data, isLoading, error, refetch } = useIndices();
 */
export function useIndices(customSymbols?: string[]) {
  return useQuery({
    queryKey: ['indices', customSymbols?.join(',')],
    queryFn: async () => {
      const symbols = customSymbols ? `custom: ${customSymbols.join(',')}` : 'default indices';
      marketLogger.info(`Fetching indices data: ${symbols}`);
      const startTime = performance.now();
      
      try {
        // Explicitly list major indices to ensure they are always fetched
        const majorIndices = [
          "^GSPC",   // S&P 500
          "^DJI",    // Dow Jones
          "^IXIC",   // NASDAQ Composite
          "^FTSE",   // FTSE 100
          "^N225",   // Nikkei 225
          "^FCHI",   // CAC 40
          "^GDAXI",  // DAX
          "^HSI",    // Hang Seng
          "^BSESN",  // SENSEX
          "^AXJO",   // ASX 200
          "^STOXX50E", // Euro Stoxx 50
          "^RUT",    // Russell 2000
          "^IBEX",   // IBEX 35
          "^SSMI",   // SMI
          "^AEX",    // AEX
          "^KS11",   // KOSPI
          "^NSEI",   // Nifty 50
          "^TWII",   // TAIEX
          "^BVSP",   // Ibovespa
          "^MERV",   // MERVAL
          "^MXX",    // IPC Mexico
          "^J203.JO" // JSE Top 40
        ];
        
        // Use the provided custom symbols or fall back to major indices
        const symbolsToFetch = customSymbols || majorIndices;
        
        marketLogger.debug(`About to fetch indices data for symbols: ${symbolsToFetch.join(', ')}`);
        
        // Add extra debugging to identify API issues
        console.log("Fetching indices with config:", {
          symbols: symbolsToFetch,
          timestamp: new Date().toISOString()
        });
        
        // Try to fetch from API first
        try {
          const data = await getIndices(symbolsToFetch, {
            skipCache: true, // Force fresh data
            retries: 3,
            showErrorToast: false // Don't show error toast here, we'll handle it below
          });
          
          // If we have valid data, process it
          if (data && Array.isArray(data) && data.length > 0) {
            const endTime = performance.now();
            marketLogger.debug(`Indices data fetched in ${(endTime - startTime).toFixed(2)}ms`, 
              { count: data.length, symbols: symbolsToFetch });
            
            // Transform the data for consistent format
            const transformedData = data.map(indexItem => {
              // If the API returned valid data, use it
              if (indexItem.data && typeof indexItem.data.c === 'number') {
                return {
                  ...indexItem,
                  data: {
                    ...indexItem.data,
                    // Ensure all values are numbers, not null or undefined
                    c: indexItem.data.c || 0,
                    d: indexItem.data.d || 0,
                    dp: indexItem.data.dp || 0,
                    h: indexItem.data.h || 0,
                    l: indexItem.data.l || 0,
                    o: indexItem.data.o || 0,
                    pc: indexItem.data.pc || 0,
                    t: indexItem.data.t || Math.floor(Date.now() / 1000)
                  }
                };
              }
              
              // Log if we received problematic data
              console.warn(`Incomplete data for index: ${indexItem.symbol}`, indexItem);
              
              // If we have incomplete data, provide fallback values
              return {
                symbol: indexItem.symbol,
                data: {
                  c: 0,  // Current price
                  d: 0,  // Change
                  dp: 0, // Percent change
                  h: 0,  // High price of the day
                  l: 0,  // Low price of the day
                  o: 0,  // Open price of the day
                  pc: 0, // Previous close price
                  t: Math.floor(Date.now() / 1000)  // Timestamp
                }
              };
            });
            
            return transformedData;
          } else {
            // API returned invalid data, fall back to mock data
            console.warn("API returned invalid data, using mock data instead");
            throw new Error("API returned invalid or empty data");
          }
        } catch (fetchError) {
          // If the API call fails, fall back to mock data
          console.warn("Error fetching indices, using mock data instead:", fetchError);
          
          // Convert the mock data to the format expected by the component
          const mockData = MOCK_INDICES_DATA.map(mockIndex => ({
            symbol: mockIndex.symbol,
            data: {
              c: mockIndex.value,  // Current price
              d: mockIndex.change * mockIndex.value / 100,  // Change
              dp: mockIndex.change, // Percent change
              h: mockIndex.value * 1.01,  // High price of the day
              l: mockIndex.value * 0.99,  // Low price of the day
              o: mockIndex.value * 0.995, // Open price of the day
              pc: mockIndex.value - (mockIndex.change * mockIndex.value / 100), // Previous close price
              t: Math.floor(Date.now() / 1000)  // Timestamp
            }
          }));
          
          toast.warning("Using sample market data - API connection issue", {
            description: "We're temporarily using sample data while resolving a connection issue."
          });
          
          return mockData;
        }
      } catch (error) {
        marketLogger.error(`Failed to fetch indices data`, error);
        console.error("Indices API error details:", error);
        
        // Provide more context about the error
        if (error instanceof Error) {
          console.error(`Error fetching indices data: ${error.message}`, {
            stack: error.stack,
            timestamp: new Date().toISOString()
          });
        } else {
          console.error("Unknown error type when fetching indices data:", error);
        }
        
        // Convert the mock data to the format expected by the component
        const mockData = MOCK_INDICES_DATA.map(mockIndex => ({
          symbol: mockIndex.symbol,
          data: {
            c: mockIndex.value,  // Current price
            d: mockIndex.change * mockIndex.value / 100,  // Change
            dp: mockIndex.change, // Percent change
            h: mockIndex.value * 1.01,  // High price of the day
            l: mockIndex.value * 0.99,  // Low price of the day
            o: mockIndex.value * 0.995, // Open price of the day
            pc: mockIndex.value - (mockIndex.change * mockIndex.value / 100), // Previous close price
            t: Math.floor(Date.now() / 1000)  // Timestamp
          }
        }));
        
        toast.warning("Using sample market data - API connection issue", {
          description: "We're temporarily using sample data while resolving a connection issue."
        });
        
        return mockData;
      }
    },
    ...DEFAULT_QUERY_CONFIG,
    // Increase retries for better resilience
    retry: 3,
    // Keep data fresher with more frequent refetching
    refetchInterval: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: true,
    staleTime: 60 * 1000, // 1 minute
  });
}

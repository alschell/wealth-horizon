
import { useQuery } from "@tanstack/react-query";
import { getIndices } from "@/utils/market-data/api";
import { marketLogger, DEFAULT_QUERY_CONFIG } from "./utils";

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
        const data = await getIndices(symbolsToFetch, {
          skipCache: false,
          retries: 3,
          showErrorToast: true
        });
        
        const endTime = performance.now();
        marketLogger.debug(`Indices data fetched in ${(endTime - startTime).toFixed(2)}ms`, 
          { count: data.length, symbols: symbolsToFetch });
        
        if (!data || data.length === 0) {
          throw new Error("No indices data returned from API");
        }
        
        // Log the actual received data for debugging
        console.log("Received indices data:", data);
        
        // Transform the data to ensure we have proper values even if API returns incomplete data
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
        
        marketLogger.debug(`Transformed indices data: ${transformedData.length} items`);
        return transformedData;
      } catch (error) {
        marketLogger.error(`Failed to fetch indices data`, error);
        console.error("Indices API error details:", error);
        throw error;
      }
    },
    ...DEFAULT_QUERY_CONFIG,
    // Increase retries for better resilience
    retry: 3,
    // Keep data fresher
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

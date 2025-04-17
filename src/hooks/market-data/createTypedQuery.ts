
/**
 * Helper utility to create properly typed query functions for React Query
 */
import { QueryFunction, QueryKey } from "@tanstack/react-query";

/**
 * Creates a properly typed query function to avoid TypeScript errors
 * @param fetchFn The API fetch function to call
 * @returns A properly typed query function for React Query
 */
export function createTypedQuery<TData, TParams extends any[]>(
  fetchFn: (...args: TParams) => Promise<TData>
): (...args: TParams) => () => Promise<TData> {
  return (...args: TParams) => {
    // Return a function that react-query can use as queryFn
    return async (): Promise<TData> => {
      return fetchFn(...args);
    };
  };
}

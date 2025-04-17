
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
): (...args: TParams) => QueryFunction<TData, QueryKey> {
  return (...args: TParams) => {
    return () => fetchFn(...args);
  };
}


/**
 * Utility type definitions to enhance type safety throughout the application
 */

/**
 * Makes specific properties of T optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Makes specific properties of T required
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Makes all properties in T nullable
 */
export type Nullable<T> = { [P in keyof T]: T[P] | null };

/**
 * Makes all properties in T optional
 */
export type Optional<T> = { [P in keyof T]?: T[P] };

/**
 * Deeply converts all properties to Partial<T>
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Type for representing API response with data and metadata
 */
export type ApiResponse<T> = {
  data: T;
  metadata?: {
    total?: number;
    page?: number;
    pageSize?: number;
    nextPage?: number;
    prevPage?: number;
  };
  status: 'success' | 'error';
  message?: string;
};

/**
 * Type for handling asynchronous operation results with loading and error states
 */
export type AsyncResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  timestamp?: number;
};

/**
 * Enhanced result type for operations that can fail
 */
export type Result<T, E = Error> = 
  | { success: true; value: T; meta?: Record<string, unknown> }
  | { success: false; error: E; meta?: Record<string, unknown> };

/**
 * Type for defining field validation rules
 */
export type ValidationRule<T = any> = (value: T) => string | null;

/**
 * Type for mapping field names to validation rules
 */
export type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T[K]>;
};

/**
 * Type for defining a function that can be memoized
 */
export type MemoizableFunction<T extends (...args: any[]) => any> = {
  (...args: Parameters<T>): ReturnType<T>;
  clear: () => void;
  cache: Map<string, ReturnType<T>>;
};

/**
 * Type for JSON serializable data
 */
export type JsonValue = 
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

/**
 * Type for record with string keys and any type of values
 */
export type RecordAny = Record<string, any>;

/**
 * Type for creating non-empty arrays
 */
export type NonEmptyArray<T> = [T, ...T[]];

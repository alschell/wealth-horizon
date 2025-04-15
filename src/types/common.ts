
/**
 * Common types used throughout the application
 */

import { ReactNode } from 'react';

// Toast types
export interface Toast {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: "default" | "destructive";
  duration?: number;
  className?: string;
}

// Error response types
export interface ErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, any>;
}

export interface ErrorHandlerOptions {
  componentName?: string;
  showToast?: boolean;
  logError?: boolean;
  rethrow?: boolean;
  fallbackMessage?: string;
}

// Common UI types
export interface WithChildren {
  children: ReactNode;
}

export interface WithClassName {
  className?: string;
}

export interface BaseComponentProps extends WithChildren, WithClassName {}

// Status types
export type Status = 'idle' | 'loading' | 'success' | 'error';

// Pagination types
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

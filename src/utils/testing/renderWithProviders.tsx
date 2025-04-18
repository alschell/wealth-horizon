
/**
 * Test utilities for rendering components with all necessary providers
 */

import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a custom render method that includes providers
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  routerProps?: {
    initialEntries?: string[];
  };
  queryClient?: QueryClient;
}

/**
 * Custom render function that wraps the component with necessary providers
 * 
 * @param ui Component to render
 * @param options Render options including router and query client configuration
 * @returns Result of render with additional helper methods
 */
export function renderWithProviders(
  ui: ReactElement,
  {
    routerProps = {},
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          cacheTime: 0,
        },
      },
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </QueryClientProvider>
    );
  };

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    queryClient,
  };
}

/**
 * Mock implementation of window.matchMedia for tests
 */
export function mockMatchMedia() {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

/**
 * Helper to create mock IntersectionObserver for tests
 */
export function mockIntersectionObserver() {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  });
  window.IntersectionObserver = mockIntersectionObserver;
}

/**
 * Mock ResizeObserver for tests
 */
export function mockResizeObserver() {
  const mockResizeObserver = jest.fn();
  mockResizeObserver.mockReturnValue({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  });
  window.ResizeObserver = mockResizeObserver;
}

/**
 * Setup all common browser API mocks for tests
 */
export function setupTestEnvironment() {
  mockMatchMedia();
  mockIntersectionObserver();
  mockResizeObserver();
}


/**
 * Setup file for Jest tests
 * This file is run before each test file
 */

// Add testing library extensions
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { toast } from '@/hooks/use-toast';

// Configure testing library
configure({
  testIdAttribute: 'data-testid',
  asyncUtilTimeout: 2000,
});

// Mock implementations
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
    dismiss: jest.fn()
  }),
  toast: jest.fn()
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  root: null,
  rootMargin: '',
  thresholds: [0],
}));

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock window.matchMedia
global.matchMedia = jest.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

// Mock window.scrollTo
global.scrollTo = jest.fn();

// Reset mocks between tests
afterEach(() => {
  jest.clearAllMocks();
});

// Console error override to catch React warnings
const originalConsoleError = console.error;
console.error = (...args) => {
  // Check if this is a React-specific warning that should fail tests
  const message = args.join(' ');
  if (
    message.includes('Warning: An update to') &&
    message.includes('inside a test was not wrapped in act')
  ) {
    throw new Error(message);
  }
  originalConsoleError(...args);
};

// Add custom matchers if needed
expect.extend({
  // Example custom matcher
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () => `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

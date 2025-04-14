
/**
 * Setup file for Jest tests
 * This file is run before each test file
 */

// Add testing library extensions
import '@testing-library/jest-dom';

// Mock implementations
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
    dismiss: jest.fn()
  }),
  toast: jest.fn()
}));

// Add global test helpers
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Test environment cleanup
afterEach(() => {
  jest.clearAllMocks();
});


/**
 * Common mock utilities for testing hooks
 */

import { FinancialAccountInfo } from "@/types/onboarding";

export const createMockAccount = (overrides = {}): FinancialAccountInfo => ({
  accountName: "Test Account",
  institution: "JP Morgan Chase",
  accountType: "cash",
  legalEntity: "JPMORGAN CHASE BANK, N.A. NEW YORK",
  legalEntityIdentifier: "7H6GLXDRUGQFU57RNE97",
  accountSubtype: "Regular",
  currency: "USD",
  approximateValue: "10000",
  statements: [],
  accountNumber: "", // Add missing field
  swiftCode: "", // Add missing field
  ...overrides
});

export const mockReactEvent = (name: string, value: string) => ({
  target: {
    name,
    value
  },
  preventDefault: jest.fn()
} as unknown as React.ChangeEvent<HTMLInputElement>);

export const validateMockToasts = (toastMock: jest.Mock, expectedTitle: string) => {
  expect(toastMock).toHaveBeenCalled();
  const toastArgs = toastMock.mock.calls[0][0];
  expect(toastArgs.title).toContain(expectedTitle);
  return toastArgs;
};

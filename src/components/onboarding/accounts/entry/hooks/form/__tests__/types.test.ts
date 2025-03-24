
import { 
  DEFAULT_ACCOUNT, 
  createPlaceholderAccount 
} from '../types';
import { FinancialAccountInfo } from "@/types/onboarding";

describe('Form types and utilities', () => {
  it('should have DEFAULT_ACCOUNT with correct structure', () => {
    expect(DEFAULT_ACCOUNT).toHaveProperty('accountName', '');
    expect(DEFAULT_ACCOUNT).toHaveProperty('institution', '');
    expect(DEFAULT_ACCOUNT).toHaveProperty('accountType', 'other');
    expect(DEFAULT_ACCOUNT).toHaveProperty('legalEntity', '');
    expect(DEFAULT_ACCOUNT).toHaveProperty('legalEntityIdentifier', '');
    expect(DEFAULT_ACCOUNT).toHaveProperty('accountSubtype', '');
    expect(DEFAULT_ACCOUNT).toHaveProperty('currency', '');
    expect(DEFAULT_ACCOUNT).toHaveProperty('approximateValue', '');
    expect(DEFAULT_ACCOUNT).toHaveProperty('statements');
    expect(Array.isArray(DEFAULT_ACCOUNT.statements)).toBe(true);
  });

  it('should create a placeholder account with correct structure', () => {
    const placeholderAccount = createPlaceholderAccount();
    
    // Make sure it's a new object, not a reference to DEFAULT_ACCOUNT
    expect(placeholderAccount).not.toBe(DEFAULT_ACCOUNT);
    
    // Check properties are the same
    expect(placeholderAccount).toEqual(DEFAULT_ACCOUNT);
  });

  it('should create a proper placeholder with all required FinancialAccountInfo fields', () => {
    const placeholderAccount = createPlaceholderAccount();
    
    // Check all fields in the FinancialAccountInfo type are present
    const requiredFields: (keyof FinancialAccountInfo)[] = [
      'accountName',
      'institution',
      'accountType',
      'legalEntity',
      'legalEntityIdentifier',
      'accountSubtype',
      'currency',
      'approximateValue',
      'statements'
    ];
    
    for (const field of requiredFields) {
      expect(placeholderAccount).toHaveProperty(field);
    }
  });
});

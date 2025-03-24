
import { 
  validateRequiredFields,
  isValidEmail,
  isValidPhone,
  isValidPercentage,
  isValidUrl
} from '../validation';

describe('Validation utilities', () => {
  describe('validateRequiredFields', () => {
    it('should return errors for missing fields', () => {
      const data = {
        name: '',
        email: 'test@example.com',
        age: 0,
        items: [] as string[],
      };
      
      const requiredFields = ['name', 'email', 'age', 'items'] as const;
      const errors = validateRequiredFields(data, requiredFields);
      
      expect(errors).toHaveProperty('name');
      expect(errors).toHaveProperty('items');
      expect(errors).not.toHaveProperty('email');
      expect(errors).toHaveProperty('age'); // Zero should be treated as empty
    });
    
    it('should not return errors for filled fields', () => {
      const data = {
        name: 'John Doe',
        email: 'test@example.com',
        age: 30,
        items: ['item1', 'item2'],
      };
      
      const requiredFields = ['name', 'email', 'age', 'items'] as const;
      const errors = validateRequiredFields(data, requiredFields);
      
      expect(Object.keys(errors).length).toBe(0);
    });
  });
  
  describe('isValidEmail', () => {
    it('should validate email addresses correctly', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('test.name@example.co.uk')).toBe(true);
      expect(isValidEmail('test+filter@example.com')).toBe(true);
      
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('test@example')).toBe(false);
      expect(isValidEmail('test.example.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });
  
  describe('isValidPhone', () => {
    it('should validate phone numbers correctly', () => {
      expect(isValidPhone('+1 555-123-4567')).toBe(true);
      expect(isValidPhone('555-123-4567')).toBe(true);
      expect(isValidPhone('(555) 123-4567')).toBe(true);
      
      expect(isValidPhone('abc')).toBe(false);
      expect(isValidPhone('123')).toBe(false); // Too short
      expect(isValidPhone('')).toBe(false);
    });
  });
  
  describe('isValidPercentage', () => {
    it('should validate percentage values correctly', () => {
      expect(isValidPercentage('0')).toBe(true);
      expect(isValidPercentage('50')).toBe(true);
      expect(isValidPercentage('100')).toBe(true);
      
      expect(isValidPercentage('-10')).toBe(false);
      expect(isValidPercentage('110')).toBe(false);
      expect(isValidPercentage('abc')).toBe(false);
      expect(isValidPercentage('')).toBe(false);
    });
  });
  
  describe('isValidUrl', () => {
    it('should validate URLs correctly', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://example.com/path?query=param')).toBe(true);
      expect(isValidUrl('https://sub.domain.example.co.uk')).toBe(true);
      
      expect(isValidUrl('example.com')).toBe(false); // Missing protocol
      expect(isValidUrl('http:/example.com')).toBe(false); // Invalid format
      expect(isValidUrl('')).toBe(false);
    });
  });
});


import { getErrorMessage, parseError, logError, createContextualError } from '../errorUtils';

describe('errorUtils', () => {
  describe('getErrorMessage', () => {
    it('should extract message from Error objects', () => {
      const error = new Error('Test error message');
      expect(getErrorMessage(error)).toBe('Test error message');
    });
    
    it('should return string errors as-is', () => {
      expect(getErrorMessage('String error message')).toBe('String error message');
    });
    
    it('should extract message from objects with message property', () => {
      const errorObject = { message: 'Object error message' };
      expect(getErrorMessage(errorObject)).toBe('Object error message');
    });
    
    it('should return fallback message for other error types', () => {
      expect(getErrorMessage(null)).toBe('An unexpected error occurred');
      expect(getErrorMessage(undefined)).toBe('An unexpected error occurred');
      expect(getErrorMessage(123)).toBe('An unexpected error occurred');
    });
    
    it('should use custom fallback message when provided', () => {
      expect(getErrorMessage(null, 'Custom fallback')).toBe('Custom fallback');
    });
  });
  
  describe('parseError', () => {
    it('should parse Error objects correctly', () => {
      const error = new Error('Test error');
      error.name = 'TypeError';
      
      const result = parseError(error);
      
      expect(result.message).toBe('Test error');
      expect(result.code).toBe('TypeError');
    });
    
    it('should parse string errors correctly', () => {
      const result = parseError('String error');
      
      expect(result.message).toBe('String error');
      expect(result.code).toBe('STRING_ERROR');
    });
    
    it('should parse objects with message property correctly', () => {
      const result = parseError({
        message: 'Object error',
        code: 'CUSTOM_CODE',
        details: { field: 'value' }
      });
      
      expect(result.message).toBe('Object error');
      expect(result.code).toBe('CUSTOM_CODE');
      expect(result.details).toEqual({
        message: 'Object error',
        code: 'CUSTOM_CODE',
        details: { field: 'value' }
      });
    });
    
    it('should handle unknown error types', () => {
      const result = parseError(null);
      
      expect(result.message).toBe('An unexpected error occurred');
      expect(result.code).toBe('UNKNOWN_ERROR');
    });
  });
  
  describe('logError', () => {
    let consoleErrorSpy: jest.SpyInstance;
    
    beforeEach(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });
    
    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });
    
    it('should log errors to console', () => {
      const error = new Error('Test error');
      logError(error);
      
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error:', error);
    });
    
    it('should log component name when provided', () => {
      const error = new Error('Test error');
      logError(error, 'TestComponent');
      
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error in TestComponent:', error);
    });
    
    it('should log stack trace for Error objects', () => {
      const error = new Error('Test error');
      logError(error);
      
      expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
      expect(consoleErrorSpy).toHaveBeenNthCalledWith(2, 'Stack trace:', error.stack);
    });
  });
  
  describe('createContextualError', () => {
    it('should create an error with component context', () => {
      const error = createContextualError('Something went wrong', 'TestComponent');
      
      expect(error.message).toBe('[TestComponent] Something went wrong');
      expect(error instanceof Error).toBe(true);
    });
    
    it('should create an error with object context', () => {
      const contextData = { componentId: 'test-123', userId: 'user-456' };
      const error = createContextualError('Something went wrong', contextData);
      
      expect(error.message).toBe('Something went wrong');
      expect(error instanceof Error).toBe(true);
      expect((error as any).context).toEqual(contextData);
    });
  });
});

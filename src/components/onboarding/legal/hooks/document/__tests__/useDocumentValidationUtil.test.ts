
import DocumentValidationUtil from '../useDocumentValidationUtil';
import { mockFile } from './mockData';

describe('DocumentValidationUtil', () => {
  describe('validateFile', () => {
    it('should return null for valid files', () => {
      const validFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      const result = DocumentValidationUtil.validateFile(validFile);
      expect(result).toBeNull();
    });
    
    it('should return error for oversized files', () => {
      // Mock a file that exceeds the size limit
      Object.defineProperty(mockFile, 'size', { value: 6 * 1024 * 1024 }); // 6MB
      
      const result = DocumentValidationUtil.validateFile(mockFile);
      expect(result).toContain('File size exceeds 5MB limit');
    });
    
    it('should return error for invalid file types', () => {
      const invalidFile = new File(['test'], 'test.txt', { type: 'text/plain' });
      const result = DocumentValidationUtil.validateFile(invalidFile);
      expect(result).toContain('File type text/plain is not supported');
    });
  });
  
  describe('validateDocumentFields', () => {
    it('should return no errors for valid document fields', () => {
      const result = DocumentValidationUtil.validateDocumentFields(
        'passport', 
        '2023-01-01', 
        mockFile
      );
      
      expect(Object.keys(result).length).toBe(0);
    });
    
    it('should return errors for missing document type', () => {
      const result = DocumentValidationUtil.validateDocumentFields(
        '', 
        '2023-01-01', 
        mockFile
      );
      
      expect(result.documentType).toBe(true);
    });
    
    it('should return errors for missing issue date', () => {
      const result = DocumentValidationUtil.validateDocumentFields(
        'passport', 
        '', 
        mockFile
      );
      
      expect(result.issueDate).toBe(true);
    });
    
    it('should return errors for missing file', () => {
      const result = DocumentValidationUtil.validateDocumentFields(
        'passport', 
        '2023-01-01', 
        null
      );
      
      expect(result.selectedFile).toBe(true);
    });
    
    it('should return multiple errors when multiple fields are missing', () => {
      const result = DocumentValidationUtil.validateDocumentFields(
        '', 
        '', 
        null
      );
      
      expect(result.documentType).toBe(true);
      expect(result.issueDate).toBe(true);
      expect(result.selectedFile).toBe(true);
    });
  });
});

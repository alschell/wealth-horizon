
import { DocumentValidationUtil } from '../useDocumentValidationUtil';
import { mockFile } from './mockData';

describe('DocumentValidationUtil', () => {
  describe('validateFile', () => {
    it('should accept valid files', () => {
      const result = DocumentValidationUtil.validateFile(mockFile);
      expect(result).toBeNull();
    });

    it('should reject files that are too large', () => {
      const largeFile = new File(['content'.repeat(1000000)], 'large-file.pdf', { type: 'application/pdf' });
      Object.defineProperty(largeFile, 'size', { value: 6 * 1024 * 1024 }); // 6MB
      
      const result = DocumentValidationUtil.validateFile(largeFile);
      expect(result).toContain('File size exceeds 5MB limit');
    });

    it('should reject files with invalid types', () => {
      const invalidFile = new File(['content'], 'invalid.exe', { type: 'application/exe' });
      
      const result = DocumentValidationUtil.validateFile(invalidFile);
      expect(result).toContain('File type application/exe is not supported');
    });
  });

  describe('validateDocumentFields', () => {
    it('should validate all required fields are present', () => {
      const result = DocumentValidationUtil.validateDocumentFields('passport', '2023-01-01', mockFile);
      expect(result).toEqual({});
    });

    it('should report missing document type', () => {
      const result = DocumentValidationUtil.validateDocumentFields('', '2023-01-01', mockFile);
      expect(result).toHaveProperty('documentType', true);
    });

    it('should report missing issue date', () => {
      const result = DocumentValidationUtil.validateDocumentFields('passport', '', mockFile);
      expect(result).toHaveProperty('issueDate', true);
    });

    it('should report missing file', () => {
      const result = DocumentValidationUtil.validateDocumentFields('passport', '2023-01-01', null);
      expect(result).toHaveProperty('selectedFile', true);
    });

    it('should report all missing fields', () => {
      const result = DocumentValidationUtil.validateDocumentFields('', '', null);
      expect(result).toEqual({
        documentType: true,
        issueDate: true,
        selectedFile: true
      });
    });
  });
});


import { DocumentFileWithMetadata } from '../../../types';

// Create a mock File object
export const mockFile = new File(['dummy content'], 'test-document.pdf', { type: 'application/pdf' });

// Create mock document files with metadata
export const mockDocuments: DocumentFileWithMetadata[] = [
  {
    id: 'doc-1',
    documentType: 'passport',
    issueDate: '2023-01-01',
    expiryDate: '2028-01-01',
    file: mockFile
  },
  {
    id: 'doc-2',
    documentType: 'drivingLicense',
    issueDate: '2022-05-15',
    expiryDate: '2027-05-15',
    file: mockFile
  }
];

// Mock form state
export const mockFormState = {
  documentType: 'passport',
  issueDate: '2023-01-01',
  expiryDate: '2028-01-01',
  selectedFile: mockFile,
  errors: {},
  fileError: null,
  isEditing: false,
  editingDocumentId: null
};

// Create validation test cases
export const validationTestCases = [
  {
    name: 'valid document',
    document: {
      documentType: 'passport',
      issueDate: '2023-01-01',
      selectedFile: mockFile
    },
    expectedErrors: {}
  },
  {
    name: 'missing document type',
    document: {
      documentType: '',
      issueDate: '2023-01-01',
      selectedFile: mockFile
    },
    expectedErrors: { documentType: true }
  },
  {
    name: 'missing issue date',
    document: {
      documentType: 'passport',
      issueDate: '',
      selectedFile: mockFile
    },
    expectedErrors: { issueDate: true }
  },
  {
    name: 'missing file',
    document: {
      documentType: 'passport',
      issueDate: '2023-01-01',
      selectedFile: null
    },
    expectedErrors: { selectedFile: true }
  }
];


export const mockFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });

export const mockDocuments = [
  {
    id: 'doc-1',
    file: mockFile,
    documentType: 'passport',
    issueDate: '2023-01-01',
    expiryDate: '2028-01-01'
  },
  {
    id: 'doc-2',
    file: mockFile,
    documentType: 'drivingLicense',
    issueDate: '2023-02-01',
    expiryDate: '2028-02-01'
  }
];

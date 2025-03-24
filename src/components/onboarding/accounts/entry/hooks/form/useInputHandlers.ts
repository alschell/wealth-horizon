
import { FinancialAccountInfo } from "@/types/onboarding";

export const useInputHandlers = (
  setAccount: React.Dispatch<React.SetStateAction<FinancialAccountInfo>>,
  handleLeiInputChange: (value: string) => void,
  clearError: (field: string) => void
) => {
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Special handling for LEI field
    if (name === 'legalEntityIdentifier') {
      handleLeiInputChange(value);
    } else {
      setAccount(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for the field
    clearError(name);
  };

  // Handle selection changes
  const handleSelectionChange = (field: keyof FinancialAccountInfo, value: string) => {
    setAccount(prev => ({ ...prev, [field]: value }));
    
    // Clear error for the field
    clearError(field);

    // If institution changes, we might want to reset the legal entity
    if (field === 'institution') {
      setAccount(prev => ({ ...prev, legalEntity: '' }));
    }
  };

  // Handle file selection
  const handleFilesSelected = (files: File[]) => {
    setAccount(prev => ({ ...prev, statements: files }));
  };

  return {
    handleInputChange,
    handleSelectionChange,
    handleFilesSelected
  };
};

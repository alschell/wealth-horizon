
import { FinancialAccountInfo } from "@/types/onboarding";
import { toast } from "@/components/ui/use-toast";
import { useCallback } from "react";

export const useInputHandlers = (
  setAccount: React.Dispatch<React.SetStateAction<FinancialAccountInfo>>,
  handleLeiInputChange: (value: string) => void,
  clearError: (field: string) => void
) => {
  // Handle input changes with improved error handling
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e || !e.target) {
        throw new Error("Invalid event object");
      }
      
      const { name, value } = e.target;
      
      if (!name) {
        throw new Error("Input name is required");
      }
      
      // Special handling for LEI field
      if (name === 'legalEntityIdentifier') {
        handleLeiInputChange(value);
      } else {
        setAccount(prev => ({ ...prev, [name]: value }));
      }
      
      // Clear error for the field
      clearError(name);
    } catch (error) {
      console.error("Error in handleInputChange:", error instanceof Error ? error.message : String(error));
      toast({
        title: "Error",
        description: "Failed to update field. Please try again.",
        variant: "destructive"
      });
    }
  }, [handleLeiInputChange, setAccount, clearError]);

  // Handle selection changes with improved error handling
  const handleSelectionChange = useCallback((field: keyof FinancialAccountInfo, value: string) => {
    try {
      if (!field) {
        throw new Error("Field name is required");
      }
      
      setAccount(prev => ({ ...prev, [field]: value }));
      
      // Clear error for the field
      clearError(field);

      // If institution changes, we want to reset the legal entity
      if (field === 'institution') {
        setAccount(prev => ({ 
          ...prev, 
          legalEntity: '',
          // Only reset LEI if we're changing institution
          legalEntityIdentifier: ''
        }));
      }
      
      // If account type changes to something that doesn't need a subtype, clear it
      if (field === 'accountType' && ['cash', 'checking', 'savings'].includes(value)) {
        setAccount(prev => ({ ...prev, accountSubtype: '' }));
      }
    } catch (error) {
      console.error("Error in handleSelectionChange:", error instanceof Error ? error.message : String(error));
      toast({
        title: "Error",
        description: "Failed to update selection. Please try again.",
        variant: "destructive"
      });
    }
  }, [setAccount, clearError]);

  // Handle file selection with improved error handling
  const handleFilesSelected = useCallback((files: File[]) => {
    try {
      if (!Array.isArray(files)) {
        throw new Error("Files must be an array");
      }
      
      setAccount(prev => ({ ...prev, statements: files }));
      
      // Notify about successful file upload
      if (files.length > 0) {
        toast({
          title: "Files selected",
          description: `${files.length} file(s) successfully selected.`,
        });
      }
    } catch (error) {
      console.error("Error in handleFilesSelected:", error instanceof Error ? error.message : String(error));
      toast({
        title: "Error",
        description: "Failed to process selected files. Please try again.",
        variant: "destructive"
      });
    }
  }, [setAccount]);

  return {
    handleInputChange,
    handleSelectionChange,
    handleFilesSelected
  };
};

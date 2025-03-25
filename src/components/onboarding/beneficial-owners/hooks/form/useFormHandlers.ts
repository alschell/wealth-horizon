
import { useToast } from "@/components/ui/use-toast";
import { BeneficialOwnerInfo } from "@/types/onboarding";

interface UseFormHandlersProps {
  formData: BeneficialOwnerInfo;
  setFormData: React.Dispatch<React.SetStateAction<BeneficialOwnerInfo>>;
  owners: BeneficialOwnerInfo[];
  onAddOwner: (owner: BeneficialOwnerInfo) => void;
  editIndex: number | null;
  setEditIndex: React.Dispatch<React.SetStateAction<number | null>>;
  resetForm: () => void;
  isFormValid: boolean;
}

export const useFormHandlers = ({
  formData,
  setFormData,
  owners,
  onAddOwner,
  editIndex,
  setEditIndex,
  resetForm,
  isFormValid
}: UseFormHandlersProps) => {
  const { toast } = useToast();
  
  // Handle form input/selection changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectionChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleDateChange = (date?: Date) => {
    if (date) {
      setFormData((prev) => ({ ...prev, dateOfBirth: date.toISOString() }));
    }
  };
  
  const handleFilesSelected = (files: File[]) => {
    setFormData((prev) => ({ ...prev, documents: files }));
  };
  
  // Function to add a new beneficial owner
  const handleAddOwner = () => {
    // Validate form data
    if (!isFormValid) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and upload at least one document.",
        variant: "destructive"
      });
      return;
    }
    
    // Add or update owner
    if (editIndex !== null) {
      // Update existing owner
      const updatedOwnersList = [...owners];
      updatedOwnersList[editIndex] = formData;
      
      // Use the onAddOwner callback to update the owner in the context
      onAddOwner(formData);
      
      toast({
        title: "Owner Updated",
        description: `${formData.firstName} ${formData.lastName} has been updated.`,
      });
      
      // Reset edit index
      setEditIndex(null);
    } else {
      // Add new owner
      onAddOwner(formData);
      
      toast({
        title: "Owner Added",
        description: `${formData.firstName} ${formData.lastName} has been added as a beneficial owner.`,
      });
    }
    
    // Reset form
    resetForm();
  };
  
  // Function to edit an existing owner
  const handleEditOwner = (index: number) => {
    setEditIndex(index);
    setFormData(owners[index]);
  };
  
  // Function to cancel editing
  const handleCancelEdit = () => {
    setEditIndex(null);
    resetForm();
  };

  return {
    handleInputChange,
    handleSelectionChange,
    handleDateChange,
    handleFilesSelected,
    handleAddOwner,
    handleEditOwner,
    handleCancelEdit
  };
};

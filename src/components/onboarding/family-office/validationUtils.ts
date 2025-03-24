
import { FamilyOfficeInfo } from "@/context/OnboardingContext";
import { toast } from "@/components/ui/use-toast";

export const validateFamilyOfficeInfo = (formData: FamilyOfficeInfo): boolean => {
  // Check required fields
  const requiredFields: (keyof FamilyOfficeInfo)[] = [
    'officeName', 
    'legalEntityType', 
    'taxId', 
    'jurisdiction', 
    'email'
  ];
  
  const missingFields = requiredFields.filter(field => !formData[field]);
  
  if (missingFields.length > 0) {
    toast({
      title: "Missing information",
      description: `Please complete all required fields.`,
      variant: "destructive",
    });
    return false;
  }
  
  // Email validation
  if (formData.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }
  }
  
  return true;
};

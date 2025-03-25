
import { useState, useEffect } from "react";
import { useOnboarding, PersonalInfo } from "@/context/OnboardingContext";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { 
  PersonalInfoFormHeader, 
  PersonalInfoFormFields, 
  PersonalInfoFormFooter 
} from "./components";

// Nationality options
const NATIONALITIES = [
  "United States", "United Kingdom", "Canada", "Germany", "France", 
  "Switzerland", "Italy", "Spain", "Netherlands", "Sweden", "Norway", 
  "Denmark", "Australia", "New Zealand", "Japan", "China", "India", 
  "Brazil", "Mexico", "South Africa"
];

const PersonalInfoForm = () => {
  const { onboardingData, updatePersonalInfo, setCurrentStep } = useOnboarding();
  const [formData, setFormData] = useState<PersonalInfo>(onboardingData.personalInfo);
  const [isValid, setIsValid] = useState(false);

  // Define animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectionChange = (name: keyof PersonalInfo, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date?: Date) => {
    if (date) {
      setFormData({ ...formData, dateOfBirth: date.toISOString() });
    }
  };

  // Validate form data whenever it changes
  useEffect(() => {
    const requiredFields: (keyof PersonalInfo)[] = [
      'firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'nationality'
    ];
    
    const valid = requiredFields.every(field => Boolean(formData[field]));
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = !formData.email || emailRegex.test(formData.email);
    
    setIsValid(valid && isEmailValid);
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const requiredFields: (keyof PersonalInfo)[] = [
      'firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'nationality'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing information",
        description: `Please complete all required fields.`,
        variant: "destructive",
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    updatePersonalInfo(formData);
    toast({
      title: "Information saved",
      description: "Personal information has been saved successfully.",
    });
    setCurrentStep(1); // Move to address step
  };

  // Parse the ISO string to Date object for the DatePicker
  const dateOfBirth = formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <Card className="p-6 md:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <PersonalInfoFormHeader itemVariants={itemVariants} />

          <PersonalInfoFormFields 
            formData={formData}
            handleInputChange={handleInputChange}
            handleSelectionChange={handleSelectionChange}
            handleDateChange={handleDateChange}
            itemVariants={itemVariants}
            nationalities={NATIONALITIES}
            dateOfBirth={dateOfBirth}
          />

          <PersonalInfoFormFooter 
            onSubmit={handleSubmit}
            isValid={isValid}
          />
        </form>
      </Card>
    </motion.div>
  );
};

export default PersonalInfoForm;


import { useState } from "react";
import { useOnboarding, PersonalInfo } from "@/context/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";

const NATIONALITIES = ["United States", "United Kingdom", "Canada", "Germany", "France", "Switzerland", "Italy", "Spain", "Netherlands", "Sweden", "Norway", "Denmark", "Australia", "New Zealand", "Japan", "China", "India", "Brazil", "Mexico", "South Africa"];

const PersonalInfoForm = () => {
  const { onboardingData, updatePersonalInfo, setCurrentStep } = useOnboarding();
  const [formData, setFormData] = useState<PersonalInfo>(onboardingData.personalInfo);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const requiredFields: (keyof PersonalInfo)[] = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'nationality'];
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
    setCurrentStep(1); // Move to address step
  };

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
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Personal Information</h2>
            <p className="text-gray-500">
              Please provide your personal details for KYC verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              custom={0}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <Label htmlFor="firstName">First Name*</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="John"
                className="h-11"
              />
            </motion.div>

            <motion.div 
              custom={1}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <Label htmlFor="lastName">Last Name*</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Smith"
                className="h-11"
              />
            </motion.div>

            <motion.div 
              custom={2}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <Label htmlFor="email">Email Address*</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john.smith@example.com"
                className="h-11"
              />
            </motion.div>

            <motion.div 
              custom={3}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <Label htmlFor="phone">Phone Number*</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                className="h-11"
              />
            </motion.div>

            <motion.div 
              custom={4}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <DatePicker
                label="Date of Birth*"
                value={dateOfBirth}
                onChange={handleDateChange}
                placeholder="Select date of birth"
                className="w-full"
              />
            </motion.div>

            <motion.div 
              custom={5}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <Label htmlFor="nationality">Nationality*</Label>
              <Select
                value={formData.nationality}
                onValueChange={(value) => handleSelectionChange("nationality", value)}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select nationality" />
                </SelectTrigger>
                <SelectContent>
                  {NATIONALITIES.map((nationality) => (
                    <SelectItem key={nationality} value={nationality}>
                      {nationality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div 
              custom={6}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <Label htmlFor="taxResidency">Tax Residency</Label>
              <Select
                value={formData.taxResidency}
                onValueChange={(value) => handleSelectionChange("taxResidency", value)}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select tax residency" />
                </SelectTrigger>
                <SelectContent>
                  {NATIONALITIES.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div 
              custom={7}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <Label htmlFor="taxId">Tax ID Number</Label>
              <Input
                id="taxId"
                name="taxId"
                value={formData.taxId}
                onChange={handleInputChange}
                placeholder="e.g., SSN or TIN"
                className="h-11"
              />
            </motion.div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500 mb-6">
              Fields marked with * are required.
            </p>
            <div className="flex justify-end">
              <Button 
                type="submit" 
                size="lg" 
                className="rounded-lg hover:shadow-md transition-shadow"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default PersonalInfoForm;

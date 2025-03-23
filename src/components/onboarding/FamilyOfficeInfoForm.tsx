
import { useState } from "react";
import { useOnboarding, FamilyOfficeInfo } from "@/context/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";

const LEGAL_ENTITY_TYPES = [
  "Limited Liability Company (LLC)",
  "Corporation",
  "Limited Partnership (LP)",
  "Private Trust Company",
  "Foundation",
  "Family Limited Partnership",
  "Private Investment Company",
  "Family Trust",
  "Other"
];

const JURISDICTIONS = [
  "United States", "United Kingdom", "Switzerland", "Singapore", "Luxembourg",
  "Hong Kong", "Cayman Islands", "British Virgin Islands", "Jersey", "Guernsey",
  "Liechtenstein", "Ireland", "Monaco", "Dubai", "Bahamas", "Bermuda", "Canada"
];

const FamilyOfficeInfoForm = () => {
  const { onboardingData, updateFamilyOfficeInfo, setCurrentStep } = useOnboarding();
  const [formData, setFormData] = useState<FamilyOfficeInfo>(onboardingData.familyOfficeInfo);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectionChange = (name: keyof FamilyOfficeInfo, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const requiredFields: (keyof FamilyOfficeInfo)[] = ['officeName', 'legalEntityType', 'taxId', 'jurisdiction', 'email'];
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
    
    updateFamilyOfficeInfo(formData);
    setCurrentStep(1); // Move to primary contact step
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <Card className="p-6 md:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="h-7 w-7 text-blue-500" />
            <h2 className="text-2xl font-bold">Family Office Information</h2>
          </div>
          <p className="text-gray-500">
            Please provide the details of your family office entity for KYC verification.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              custom={0}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2 col-span-full"
            >
              <Label htmlFor="officeName">Family Office Name*</Label>
              <Input
                id="officeName"
                name="officeName"
                value={formData.officeName}
                onChange={handleInputChange}
                placeholder="Smith Family Office LLC"
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
              <Label htmlFor="legalEntityType">Legal Entity Type*</Label>
              <Select
                value={formData.legalEntityType}
                onValueChange={(value) => handleSelectionChange("legalEntityType", value)}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select entity type" />
                </SelectTrigger>
                <SelectContent>
                  {LEGAL_ENTITY_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div 
              custom={2}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <Label htmlFor="jurisdiction">Jurisdiction*</Label>
              <Select
                value={formData.jurisdiction}
                onValueChange={(value) => handleSelectionChange("jurisdiction", value)}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select jurisdiction" />
                </SelectTrigger>
                <SelectContent>
                  {JURISDICTIONS.map((jurisdiction) => (
                    <SelectItem key={jurisdiction} value={jurisdiction}>
                      {jurisdiction}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div 
              custom={3}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <Label htmlFor="registrationNumber">Registration Number</Label>
              <Input
                id="registrationNumber"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleInputChange}
                placeholder="e.g., LLC-12345678"
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
              <Label htmlFor="taxId">Tax ID Number*</Label>
              <Input
                id="taxId"
                name="taxId"
                value={formData.taxId}
                onChange={handleInputChange}
                placeholder="e.g., 12-3456789"
                className="h-11"
              />
            </motion.div>

            <motion.div 
              custom={5}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <Label htmlFor="yearEstablished">Year Established</Label>
              <Input
                id="yearEstablished"
                name="yearEstablished"
                value={formData.yearEstablished}
                onChange={handleInputChange}
                placeholder="e.g., 2015"
                className="h-11"
                type="number"
                min="1900"
                max={new Date().getFullYear()}
              />
            </motion.div>

            <motion.div 
              custom={6}
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
                placeholder="office@smithfamilyoffice.com"
                className="h-11"
              />
            </motion.div>

            <motion.div 
              custom={7}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <Label htmlFor="phone">Phone Number</Label>
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
              custom={8}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://smithfamilyoffice.com"
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
                variant="blue"
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

export default FamilyOfficeInfoForm;

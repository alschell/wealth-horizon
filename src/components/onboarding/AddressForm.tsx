
import { useState } from "react";
import { useOnboarding, AddressInfo } from "@/context/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, MapPin } from "lucide-react";

// Sort the arrays alphabetically
const COUNTRIES = [
  "Australia", "Brazil", "Canada", "China", "Denmark", "France", 
  "Germany", "India", "Italy", "Japan", "Mexico", "Netherlands", 
  "New Zealand", "Norway", "South Africa", "Spain", "Sweden", 
  "Switzerland", "United Kingdom", "United States"
].sort();

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", 
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", 
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", 
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", 
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", 
  "New Hampshire", "New Jersey", "New Mexico", "New York", 
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", 
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", 
  "West Virginia", "Wisconsin", "Wyoming"
].sort();

const AddressForm = () => {
  const { onboardingData, updateAddressInfo, setCurrentStep } = useOnboarding();
  const [formData, setFormData] = useState<AddressInfo>(onboardingData.addressInfo);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectionChange = (name: keyof AddressInfo, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const requiredFields: (keyof AddressInfo)[] = ['streetAddress', 'city', 'postalCode', 'country'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing information",
        description: `Please complete all required fields.`,
        variant: "destructive",
      });
      return;
    }
    
    updateAddressInfo(formData);
    setCurrentStep(3); // Move to legal documents step
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
            <MapPin className="h-7 w-7 text-blue-600" />
            <h2 className="text-2xl font-bold">Address Information</h2>
          </div>
          <p className="text-gray-500">
            Please provide the current address for your family office.
          </p>

          <div className="space-y-6">
            <motion.div 
              custom={0}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <Label htmlFor="streetAddress">Street Address*</Label>
              <Input
                id="streetAddress"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                placeholder="123 Main Street, Apt 4B"
                className="h-11"
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div 
                custom={1}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="space-y-2"
              >
                <Label htmlFor="city">City*</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="New York"
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
                <Label htmlFor="state">State/Province</Label>
                <Select
                  value={formData.state || ""}
                  onValueChange={(value) => handleSelectionChange("state", value)}
                >
                  <SelectTrigger id="state" className="h-11 bg-white">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent 
                    className="max-h-[300px] overflow-y-auto z-50 bg-white"
                    sideOffset={4}
                    avoidCollisions={true}
                  >
                    {US_STATES.map((state) => (
                      <SelectItem key={state} value={state} className="cursor-pointer">
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div 
                custom={3}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="space-y-2"
              >
                <Label htmlFor="postalCode">Postal Code*</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="10001"
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
                <Label htmlFor="country">Country*</Label>
                <Select
                  value={formData.country || ""}
                  onValueChange={(value) => handleSelectionChange("country", value)}
                >
                  <SelectTrigger id="country" className="h-11 bg-white">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent 
                    className="max-h-[300px] overflow-y-auto z-50 bg-white"
                    sideOffset={4}
                    avoidCollisions={true}
                  >
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country} value={country} className="cursor-pointer">
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500 mb-6">
              Fields marked with * are required.
            </p>
            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline"
                size="lg" 
                className="rounded-lg"
                onClick={() => setCurrentStep(1)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
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

export default AddressForm;

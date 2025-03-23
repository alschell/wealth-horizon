import { useState } from "react";
import { useOnboarding, BeneficialOwnerInfo } from "@/context/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Plus, Trash2, Users } from "lucide-react";
import FileUploader from "@/components/FileUploader";

const NATIONALITIES = [
  "Australia", 
  "Brazil", 
  "Canada", 
  "China", 
  "Denmark", 
  "France", 
  "Germany", 
  "India", 
  "Italy", 
  "Japan", 
  "Mexico", 
  "Netherlands", 
  "New Zealand", 
  "Norway", 
  "South Africa", 
  "Spain", 
  "Sweden", 
  "Switzerland", 
  "United Kingdom", 
  "United States"
].sort();

const RELATIONSHIPS = [
  "Beneficiary",
  "Director", 
  "Family Member", 
  "General Partner",
  "Investment Advisor",
  "Limited Partner",
  "Other",
  "Protector",
  "Settlor",
  "Shareholder", 
  "Trustee"
].sort();

const BeneficialOwnersForm = () => {
  const { 
    onboardingData, 
    addBeneficialOwner,
    removeBeneficialOwner,
    setCurrentStep 
  } = useOnboarding();
  
  const [beneficialOwners, setBeneficialOwners] = useState<BeneficialOwnerInfo[]>(onboardingData.beneficialOwners);
  
  const [newOwner, setNewOwner] = useState<BeneficialOwnerInfo>({
    firstName: "",
    lastName: "",
    relationship: "",
    ownershipPercentage: "",
    nationality: "",
    dateOfBirth: "",
    documents: []
  });

  const handleNewOwnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewOwner({
      ...newOwner,
      [name]: value
    });
  };

  const handleOwnerSelectionChange = (field: keyof BeneficialOwnerInfo, value: string) => {
    setNewOwner({
      ...newOwner,
      [field]: value
    });
  };

  const handleDocumentsSelected = (files: File[]) => {
    setNewOwner({
      ...newOwner,
      documents: files
    });
  };

  const handleAddOwner = () => {
    if (!newOwner.firstName || !newOwner.lastName || !newOwner.relationship) {
      toast({
        title: "Missing information",
        description: "Please fill in all required owner fields.",
        variant: "destructive"
      });
      return;
    }

    const updatedOwners = [...beneficialOwners, newOwner];
    setBeneficialOwners(updatedOwners);
    addBeneficialOwner(newOwner);

    setNewOwner({
      firstName: "",
      lastName: "",
      relationship: "",
      ownershipPercentage: "",
      nationality: "",
      dateOfBirth: "",
      documents: []
    });

    toast({
      title: "Owner added",
      description: `${newOwner.firstName} ${newOwner.lastName} has been added successfully.`
    });
  };

  const handleRemoveOwner = (index: number) => {
    const updatedOwners = beneficialOwners.filter((_, i) => i !== index);
    setBeneficialOwners(updatedOwners);
    removeBeneficialOwner(index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(6);
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
            <Users className="h-7 w-7 text-blue-600" />
            <h2 className="text-2xl font-bold">Beneficial Owners</h2>
          </div>
          <p className="text-gray-500">
            Please add details of all beneficial owners with significant control or ownership interest (typically 25% or more).
          </p>

          {beneficialOwners.length > 0 && (
            <motion.div 
              custom={0}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <h3 className="font-medium mb-3">Added Beneficial Owners</h3>
              <div className="space-y-2">
                {beneficialOwners.map((owner, index) => (
                  <Card key={index} className="p-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{owner.firstName} {owner.lastName}</p>
                      <p className="text-sm text-gray-500">
                        {owner.relationship}
                        {owner.ownershipPercentage ? ` • ${owner.ownershipPercentage}% ownership` : ''}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveOwner(index)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}
          
          <motion.div 
            custom={1}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <h3 className="font-medium">Add a Beneficial Owner</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name*</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={newOwner.firstName}
                  onChange={handleNewOwnerChange}
                  placeholder="John"
                  className="h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name*</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={newOwner.lastName}
                  onChange={handleNewOwnerChange}
                  placeholder="Smith"
                  className="h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="relationship">Relationship*</Label>
                <Select
                  value={newOwner.relationship}
                  onValueChange={(value) => handleOwnerSelectionChange("relationship", value)}
                >
                  <SelectTrigger id="relationship" className="h-11 bg-white">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent 
                    className="z-50 bg-white"
                    sideOffset={4}
                    avoidCollisions={true}
                  >
                    {RELATIONSHIPS.map((relationship) => (
                      <SelectItem key={relationship} value={relationship} className="cursor-pointer">
                        {relationship}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ownershipPercentage">Ownership Percentage</Label>
                <Input
                  id="ownershipPercentage"
                  name="ownershipPercentage"
                  value={newOwner.ownershipPercentage}
                  onChange={handleNewOwnerChange}
                  placeholder="e.g., 51"
                  type="number"
                  min="0"
                  max="100"
                  className="h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Select
                  value={newOwner.nationality}
                  onValueChange={(value) => handleOwnerSelectionChange("nationality", value)}
                >
                  <SelectTrigger id="nationality" className="h-11 bg-white">
                    <SelectValue placeholder="Select nationality" />
                  </SelectTrigger>
                  <SelectContent 
                    className="z-50 bg-white"
                    sideOffset={4}
                    avoidCollisions={true}
                  >
                    {NATIONALITIES.map((nationality) => (
                      <SelectItem key={nationality} value={nationality} className="cursor-pointer">
                        {nationality}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={newOwner.dateOfBirth}
                  onChange={handleNewOwnerChange}
                  className="h-11"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Identity Documents</Label>
              <FileUploader
                accept="application/pdf,image/*"
                multiple={true}
                maxSize={5}
                onFilesSelected={handleDocumentsSelected}
                existingFiles={newOwner.documents}
                label="Upload Identity Documents (Passport, ID)"
              />
            </div>
            
            <Button
              type="button"
              variant="outline"
              onClick={handleAddOwner}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Beneficial Owner
            </Button>
          </motion.div>

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500 mb-6">
              You must add all significant beneficial owners. If none apply, you can proceed without adding any.
            </p>
            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline"
                size="lg" 
                className="rounded-lg"
                onClick={() => setCurrentStep(4)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                type="submit" 
                size="lg" 
                className="rounded-lg hover:shadow-md transition-shadow"
              >
                Review
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default BeneficialOwnersForm;


import React, { useState } from "react";
import { useOnboarding, BeneficialOwnerInfo } from "@/context/OnboardingContext";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Users, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import OwnersList from "./OwnersList";
import AddOwnerForm from "./AddOwnerForm";

const BeneficialOwnersForm = () => {
  const { onboardingData, addBeneficialOwner, removeBeneficialOwner, setCurrentStep } = useOnboarding();
  const [owners, setOwners] = useState<BeneficialOwnerInfo[]>(onboardingData.beneficialOwners);
  
  const handleAddOwner = (newOwner: BeneficialOwnerInfo) => {
    const updatedOwners = [...owners, newOwner];
    setOwners(updatedOwners);
    addBeneficialOwner(newOwner);
    
    toast({
      title: "Owner added",
      description: `${newOwner.firstName} ${newOwner.lastName} has been added as a beneficial owner.`,
    });
  };

  const handleRemoveOwner = (index: number) => {
    const updatedOwners = owners.filter((_, i) => i !== index);
    setOwners(updatedOwners);
    removeBeneficialOwner(index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setCurrentStep(6);
    
    toast({
      title: "Information saved",
      description: "Beneficial owner information has been saved successfully.",
    });
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
            <Users className="h-7 w-7 text-black" />
            <h2 className="text-2xl font-bold text-black">Beneficial Owners</h2>
          </div>
          <p className="text-gray-500">
            Please provide information about individuals who own or control 25% or more of your entity.
          </p>

          {/* List of current beneficial owners */}
          <OwnersList 
            owners={owners}
            onRemoveOwner={handleRemoveOwner}
          />

          {/* Form to add a new beneficial owner */}
          <AddOwnerForm onAddOwner={handleAddOwner} />

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500 mb-6">
              Fields marked with <span className="text-red-500">*</span> are required.
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
                className="rounded-lg hover:shadow-md transition-shadow bg-black hover:bg-gray-800 text-white"
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

export default BeneficialOwnersForm;

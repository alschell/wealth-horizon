import React from "react";
import { useOnboarding } from "@/context/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReviewStep = () => {
  const { onboardingData, setOnboardingCompleted, setCurrentStep } = useOnboarding();
  const navigate = useNavigate();

  const handleSubmit = () => {
    setOnboardingCompleted();
    
    toast({
      title: "Onboarding completed",
      description: "Thank you for completing the onboarding process.",
    });
    
    navigate("/");
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not provided";
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (error) {
      return dateString;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <Card className="p-6 md:p-8 shadow-sm">
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="h-7 w-7 text-black" />
            <h2 className="text-2xl font-bold text-black">Review & Submit</h2>
          </div>
          <p className="text-black">
            Please review your information before submitting your onboarding application.
          </p>

          <section className="space-y-3 border-b pb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-black">Family Office Details</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-black hover:text-gray-800"
                onClick={() => setCurrentStep(0)}
              >
                <Edit2 className="h-4 w-4 mr-1 text-black" />
                Edit
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm">
              <div>
                <span className="font-medium text-black">Office Name:</span>
                <span className="ml-2 text-black">{onboardingData.familyOfficeInfo.officeName || "Not provided"}</span>
              </div>
              <div>
                <span className="font-medium text-black">Legal Entity Type:</span>
                <span className="ml-2 text-black">{onboardingData.familyOfficeInfo.legalEntityType || "Not provided"}</span>
              </div>
              <div>
                <span className="font-medium text-black">Jurisdiction:</span>
                <span className="ml-2 text-black">{onboardingData.familyOfficeInfo.jurisdiction || "Not provided"}</span>
              </div>
              <div>
                <span className="font-medium text-black">Tax ID:</span>
                <span className="ml-2 text-black">{onboardingData.familyOfficeInfo.taxId || "Not provided"}</span>
              </div>
            </div>
          </section>

          <section className="space-y-3 border-b pb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-black">Primary Contact</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-black hover:text-gray-800"
                onClick={() => setCurrentStep(1)}
              >
                <Edit2 className="h-4 w-4 mr-1 text-black" />
                Edit
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Name:</span>
                <span className="ml-2">
                  {onboardingData.primaryContactInfo.firstName} {onboardingData.primaryContactInfo.lastName}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Position:</span>
                <span className="ml-2">{onboardingData.primaryContactInfo.position || "Not provided"}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Email:</span>
                <span className="ml-2">{onboardingData.primaryContactInfo.email || "Not provided"}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Phone:</span>
                <span className="ml-2">{onboardingData.primaryContactInfo.phone || "Not provided"}</span>
              </div>
            </div>
          </section>

          <section className="space-y-3 border-b pb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-black">Address</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-black hover:text-gray-800"
                onClick={() => setCurrentStep(2)}
              >
                <Edit2 className="h-4 w-4 mr-1 text-black" />
                Edit
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-700">Street Address:</span>
                <span className="ml-2">{onboardingData.addressInfo.streetAddress || "Not provided"}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">City, State, Postal Code:</span>
                <span className="ml-2">
                  {onboardingData.addressInfo.city}{onboardingData.addressInfo.state ? `, ${onboardingData.addressInfo.state}` : ""} {onboardingData.addressInfo.postalCode}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Country:</span>
                <span className="ml-2">{onboardingData.addressInfo.country || "Not provided"}</span>
              </div>
            </div>
          </section>

          <section className="space-y-3 border-b pb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-black">Legal Documents</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-black hover:text-gray-800"
                onClick={() => setCurrentStep(3)}
              >
                <Edit2 className="h-4 w-4 mr-1 text-black" />
                Edit
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Document Type:</span>
                <span className="ml-2">{onboardingData.legalDocuments.documentType || "Not provided"}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Document Number:</span>
                <span className="ml-2">{onboardingData.legalDocuments.documentNumber || "Not provided"}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Issue Date:</span>
                <span className="ml-2">{formatDate(onboardingData.legalDocuments.issueDate)}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Uploaded Documents:</span>
                <span className="ml-2">{onboardingData.legalDocuments.documentFiles.length} files</span>
              </div>
            </div>
          </section>

          <section className="space-y-3 border-b pb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-black">Financial Accounts</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-black hover:text-gray-800"
                onClick={() => setCurrentStep(4)}
              >
                <Edit2 className="h-4 w-4 mr-1 text-black" />
                Edit
              </Button>
            </div>
            {onboardingData.financialAccounts.length > 0 ? (
              <div className="space-y-2">
                {onboardingData.financialAccounts.map((account, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-md text-sm">
                    <div className="font-medium">{account.accountName}</div>
                    <div className="text-gray-600">
                      {account.institution} · {account.accountType}
                      {account.currency && ` · ${account.currency}`}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-600">
                {onboardingData.aggregatorInfo.usesAggregator 
                  ? `Using aggregator: ${onboardingData.aggregatorInfo.aggregatorName}`
                  : "No financial accounts added"
                }
              </div>
            )}
          </section>

          <section className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-black">Beneficial Owners</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-black hover:text-gray-800"
                onClick={() => setCurrentStep(5)}
              >
                <Edit2 className="h-4 w-4 mr-1 text-black" />
                Edit
              </Button>
            </div>
            {onboardingData.beneficialOwners.length > 0 ? (
              <div className="space-y-2">
                {onboardingData.beneficialOwners.map((owner, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-md text-sm">
                    <div className="font-medium">{owner.firstName} {owner.lastName}</div>
                    <div className="text-gray-600">
                      {owner.relationship} · {owner.ownershipPercentage}% ownership · {owner.nationality}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-600">No beneficial owners added</div>
            )}
          </section>

          <div className="pt-4 border-t flex justify-between">
            <Button 
              type="button" 
              variant="outline"
              size="lg" 
              className="rounded-lg"
              onClick={() => setCurrentStep(5)}
            >
              <ArrowLeft className="mr-2 h-4 w-4 text-black" />
              Back
            </Button>
            <Button 
              onClick={handleSubmit}
              size="lg" 
              className="rounded-lg hover:shadow-md transition-shadow bg-black hover:bg-gray-800 text-white"
            >
              Submit Application
              <CheckCircle className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ReviewStep;

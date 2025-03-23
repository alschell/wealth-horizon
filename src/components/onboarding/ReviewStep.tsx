
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "@/context/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Edit, ArrowRight, FileText } from "lucide-react";

const ReviewStep = () => {
  const navigate = useNavigate();
  const { onboardingData, setCurrentStep, setOnboardingCompleted } = useOnboarding();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEdit = (step: number) => {
    setCurrentStep(step);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Complete onboarding
      setOnboardingCompleted();
      
      toast({
        title: "Onboarding completed",
        description: "Your information has been successfully submitted.",
      });
      
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting onboarding data:", error);
      toast({
        title: "Submission error",
        description: "There was an error submitting your information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
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
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Review Your Information</h2>
            <p className="text-gray-500">
              Please review your information before final submission.
            </p>
          </div>

          <div className="space-y-6">
            {/* Personal Information */}
            <motion.div 
              custom={0}
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Personal Information</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-blue-600"
                  onClick={() => handleEdit(0)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
              <Card>
                <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{onboardingData.personalInfo.firstName} {onboardingData.personalInfo.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{onboardingData.personalInfo.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{onboardingData.personalInfo.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">{onboardingData.personalInfo.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Nationality</p>
                    <p className="font-medium">{onboardingData.personalInfo.nationality}</p>
                  </div>
                  {onboardingData.personalInfo.taxResidency && (
                    <div>
                      <p className="text-sm text-gray-500">Tax Residency</p>
                      <p className="font-medium">{onboardingData.personalInfo.taxResidency}</p>
                    </div>
                  )}
                  {onboardingData.personalInfo.taxId && (
                    <div>
                      <p className="text-sm text-gray-500">Tax ID</p>
                      <p className="font-medium">{onboardingData.personalInfo.taxId}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Address Information */}
            <motion.div 
              custom={1}
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Address Information</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-blue-600"
                  onClick={() => handleEdit(1)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
              <Card>
                <CardContent className="p-4">
                  <p className="font-medium">
                    {onboardingData.addressInfo.streetAddress}<br />
                    {onboardingData.addressInfo.city}, {onboardingData.addressInfo.state} {onboardingData.addressInfo.postalCode}<br />
                    {onboardingData.addressInfo.country}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Identity Verification */}
            <motion.div 
              custom={2}
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Identity Verification</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-blue-600"
                  onClick={() => handleEdit(2)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Document Type</p>
                      <p className="font-medium capitalize">
                        {onboardingData.identityVerification.documentType.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Document Number</p>
                      <p className="font-medium">{onboardingData.identityVerification.documentNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Issue Date</p>
                      <p className="font-medium">{onboardingData.identityVerification.issueDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Expiry Date</p>
                      <p className="font-medium">{onboardingData.identityVerification.expiryDate}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Uploaded Documents</p>
                    <div className="flex flex-wrap gap-2">
                      {onboardingData.identityVerification.documentFiles.map((file, index) => (
                        <div key={index} className="flex items-center bg-gray-100 rounded-lg px-3 py-1.5">
                          <FileText className="h-3.5 w-3.5 text-blue-600 mr-1.5" />
                          <span className="text-sm truncate max-w-[150px]">{file.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Data Source */}
            <motion.div 
              custom={3}
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Financial Data Source</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-blue-600"
                  onClick={() => handleEdit(3)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
              <Card>
                <CardContent className="p-4 space-y-4">
                  {onboardingData.aggregatorInfo.usesAggregator ? (
                    <div className="space-y-3">
                      <p className="font-medium">Using Financial Data Aggregator</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Aggregator</p>
                          <p className="font-medium">{onboardingData.aggregatorInfo.aggregatorName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Username/API Key ID</p>
                          <p className="font-medium">
                            {onboardingData.aggregatorInfo.aggregatorCredentials?.username ? '●●●●●●●●●●' : 'Not provided'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="font-medium">Manual Financial Information</p>
                      
                      {onboardingData.manualAccounts.length > 0 && (
                        <div>
                          <p className="text-sm text-gray-500 mb-2">Added Accounts ({onboardingData.manualAccounts.length})</p>
                          <div className="space-y-2">
                            {onboardingData.manualAccounts.map((account, index) => (
                              <div key={index} className="border rounded-lg p-3">
                                <p className="font-medium">{account.accountName}</p>
                                <p className="text-sm text-gray-500">
                                  {account.institution} • {account.accountType}
                                  {account.balance ? ` • ${account.balance} ${account.currency}` : ''}
                                </p>
                                {account.statements.length > 0 && (
                                  <div className="mt-1.5 flex items-center gap-1.5">
                                    <FileText className="h-3.5 w-3.5 text-blue-600" />
                                    <span className="text-xs text-gray-500">
                                      {account.statements.length} statement{account.statements.length !== 1 ? 's' : ''} uploaded
                                    </span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {onboardingData.entities.length > 0 && (
                        <div>
                          <p className="text-sm text-gray-500 mb-2">Added Legal Entities ({onboardingData.entities.length})</p>
                          <div className="space-y-2">
                            {onboardingData.entities.map((entity, index) => (
                              <div key={index} className="border rounded-lg p-3">
                                <p className="font-medium">{entity.entityName}</p>
                                <p className="text-sm text-gray-500">
                                  {entity.entityType}
                                  {entity.jurisdiction ? ` • ${entity.jurisdiction}` : ''}
                                  {entity.registrationNumber ? ` • ${entity.registrationNumber}` : ''}
                                </p>
                                {entity.documents.length > 0 && (
                                  <div className="mt-1.5 flex items-center gap-1.5">
                                    <FileText className="h-3.5 w-3.5 text-blue-600" />
                                    <span className="text-xs text-gray-500">
                                      {entity.documents.length} document{entity.documents.length !== 1 ? 's' : ''} uploaded
                                    </span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {onboardingData.manualAccounts.length === 0 && onboardingData.entities.length === 0 && (
                        <p className="text-sm text-gray-500">No accounts or entities added yet.</p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="p-1 mt-1 rounded-full bg-blue-50">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Data Privacy & Sharing Consent</p>
                <p className="text-sm text-gray-500">
                  By submitting, you consent to our processing of your information according to our privacy policy.
                  Your data will be securely stored and only shared with third-parties with your explicit permission.
                </p>
              </div>
            </div>
            
            <div className="flex justify-between pt-2">
              <Button 
                type="button" 
                variant="outline"
                size="lg" 
                className="rounded-lg"
                onClick={() => setCurrentStep(3)}
                disabled={isSubmitting}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                type="button" 
                size="lg" 
                className="rounded-lg hover:shadow-md transition-shadow"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    Submit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ReviewStep;

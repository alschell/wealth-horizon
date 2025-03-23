
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "@/context/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Edit, ArrowRight, FileText, Building2, UserRound, MapPin, ScrollText, BarChart4, Users } from "lucide-react";

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
        description: "Your family office information has been successfully submitted.",
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
              Please review your family office information before final submission.
            </p>
          </div>

          <div className="space-y-6">
            {/* Family Office Information */}
            <motion.div 
              custom={0}
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-medium">Family Office Information</h3>
                </div>
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
                  <div className="col-span-full">
                    <p className="text-sm text-gray-500">Family Office Name</p>
                    <p className="font-medium">{onboardingData.familyOfficeInfo.officeName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Legal Entity Type</p>
                    <p className="font-medium">{onboardingData.familyOfficeInfo.legalEntityType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Jurisdiction</p>
                    <p className="font-medium">{onboardingData.familyOfficeInfo.jurisdiction}</p>
                  </div>
                  {onboardingData.familyOfficeInfo.registrationNumber && (
                    <div>
                      <p className="text-sm text-gray-500">Registration Number</p>
                      <p className="font-medium">{onboardingData.familyOfficeInfo.registrationNumber}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Tax ID</p>
                    <p className="font-medium">{onboardingData.familyOfficeInfo.taxId}</p>
                  </div>
                  {onboardingData.familyOfficeInfo.yearEstablished && (
                    <div>
                      <p className="text-sm text-gray-500">Year Established</p>
                      <p className="font-medium">{onboardingData.familyOfficeInfo.yearEstablished}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{onboardingData.familyOfficeInfo.email}</p>
                  </div>
                  {onboardingData.familyOfficeInfo.phone && (
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{onboardingData.familyOfficeInfo.phone}</p>
                    </div>
                  )}
                  {onboardingData.familyOfficeInfo.website && (
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <p className="font-medium">{onboardingData.familyOfficeInfo.website}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Primary Contact */}
            <motion.div 
              custom={1}
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserRound className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-medium">Primary Contact</h3>
                </div>
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
                <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-full">
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{onboardingData.primaryContactInfo.firstName} {onboardingData.primaryContactInfo.lastName}</p>
                  </div>
                  <div className="col-span-full">
                    <p className="text-sm text-gray-500">Position</p>
                    <p className="font-medium">{onboardingData.primaryContactInfo.position}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{onboardingData.primaryContactInfo.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{onboardingData.primaryContactInfo.phone}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Address Information */}
            <motion.div 
              custom={2}
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-medium">Address Information</h3>
                </div>
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
                <CardContent className="p-4">
                  <p className="font-medium">
                    {onboardingData.addressInfo.streetAddress}<br />
                    {onboardingData.addressInfo.city}, {onboardingData.addressInfo.state} {onboardingData.addressInfo.postalCode}<br />
                    {onboardingData.addressInfo.country}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Legal Documents */}
            <motion.div 
              custom={3}
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ScrollText className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-medium">Legal Documents</h3>
                </div>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Document Type</p>
                      <p className="font-medium capitalize">
                        {onboardingData.legalDocuments.documentType === "incorporation" 
                          ? "Certificate of Incorporation" 
                          : onboardingData.legalDocuments.documentType === "registration"
                          ? "Business Registration"
                          : onboardingData.legalDocuments.documentType === "taxCertificate"
                          ? "Tax Certificate"
                          : onboardingData.legalDocuments.documentType === "ownership"
                          ? "Ownership Structure"
                          : "Other Legal Document"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Document Number</p>
                      <p className="font-medium">{onboardingData.legalDocuments.documentNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Issue Date</p>
                      <p className="font-medium">{onboardingData.legalDocuments.issueDate}</p>
                    </div>
                    {onboardingData.legalDocuments.expiryDate && (
                      <div>
                        <p className="text-sm text-gray-500">Expiry Date</p>
                        <p className="font-medium">{onboardingData.legalDocuments.expiryDate}</p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Uploaded Documents</p>
                    <div className="flex flex-wrap gap-2">
                      {onboardingData.legalDocuments.documentFiles.map((file, index) => (
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

            {/* Financial Data Source */}
            <motion.div 
              custom={4}
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart4 className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-medium">Financial Data Source</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-blue-600"
                  onClick={() => handleEdit(4)}
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
                      
                      {onboardingData.financialAccounts.length > 0 && (
                        <div>
                          <p className="text-sm text-gray-500 mb-2">Added Financial Accounts ({onboardingData.financialAccounts.length})</p>
                          <div className="space-y-2">
                            {onboardingData.financialAccounts.map((account, index) => (
                              <div key={index} className="border rounded-lg p-3">
                                <p className="font-medium">{account.accountName}</p>
                                <p className="text-sm text-gray-500">
                                  {account.institution} • {account.accountType.charAt(0).toUpperCase() + account.accountType.slice(1)}
                                  {account.approximateValue ? ` • ~${account.approximateValue} ${account.currency}` : ''}
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
                      
                      {onboardingData.financialAccounts.length === 0 && (
                        <p className="text-sm text-gray-500">No financial accounts added yet.</p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Beneficial Owners */}
            <motion.div 
              custom={5}
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-medium">Beneficial Owners</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-blue-600"
                  onClick={() => handleEdit(5)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
              <Card>
                <CardContent className="p-4 space-y-4">
                  {onboardingData.beneficialOwners.length > 0 ? (
                    <div className="space-y-3">
                      <div className="space-y-3">
                        {onboardingData.beneficialOwners.map((owner, index) => (
                          <div key={index} className="border rounded-lg p-3">
                            <p className="font-medium">{owner.firstName} {owner.lastName}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                              <p className="text-sm text-gray-500">
                                <span className="text-gray-600 font-medium">Relationship:</span> {owner.relationship}
                              </p>
                              {owner.ownershipPercentage && (
                                <p className="text-sm text-gray-500">
                                  <span className="text-gray-600 font-medium">Ownership:</span> {owner.ownershipPercentage}%
                                </p>
                              )}
                              {owner.nationality && (
                                <p className="text-sm text-gray-500">
                                  <span className="text-gray-600 font-medium">Nationality:</span> {owner.nationality}
                                </p>
                              )}
                              {owner.dateOfBirth && (
                                <p className="text-sm text-gray-500">
                                  <span className="text-gray-600 font-medium">Date of Birth:</span> {owner.dateOfBirth}
                                </p>
                              )}
                            </div>
                            {owner.documents.length > 0 && (
                              <div className="mt-1.5 flex items-center gap-1.5">
                                <FileText className="h-3.5 w-3.5 text-blue-600" />
                                <span className="text-xs text-gray-500">
                                  {owner.documents.length} document{owner.documents.length !== 1 ? 's' : ''} uploaded
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No beneficial owners added.</p>
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
                  By submitting, you consent to our processing of your family office information according to our privacy policy.
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
                onClick={() => setCurrentStep(5)}
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

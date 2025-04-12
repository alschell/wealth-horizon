
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PageTemplate from "@/components/shared/PageTemplate";
import { Code, Shield, Server, Cpu, Users, Key, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type DeveloperPortalSection = "join" | "dashboard" | "apps" | "keys" | "docs";

const DeveloperPortal = () => {
  const { section } = useParams<{ section: DeveloperPortalSection }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // If no section is specified, redirect to join
  if (!section) {
    navigate("/developer-portal/join");
    return null;
  }
  
  return (
    <PageTemplate
      title="Developer Portal"
      description="Join the WealthHorizon developer program to access our APIs, SDKs, and developer resources."
      icon={Code}
    >
      {section === "join" && <JoinProgramSection />}
      {section === "dashboard" && <DeveloperDashboard />}
    </PageTemplate>
  );
};

const JoinProgramSection = () => {
  const [formState, setFormState] = useState({
    companyName: "",
    name: "",
    email: "",
    phone: "",
    website: "",
    useCase: "",
    developerType: "company",
    usageVolume: "low",
    agreeTerms: false,
    agreeDataPolicy: false,
    isSubmitting: false,
    isSubmitted: false
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormState(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleRadioChange = (name: string, value: string) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formState.agreeTerms || !formState.agreeDataPolicy) {
      toast({
        title: "Please agree to the terms",
        description: "You must agree to the terms of service and data policy to continue.",
        variant: "destructive"
      });
      return;
    }
    
    setFormState(prev => ({ ...prev, isSubmitting: true }));
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Application Submitted",
        description: "Your developer program application has been submitted successfully.",
      });
      
      setFormState(prev => ({ 
        ...prev, 
        isSubmitting: false,
        isSubmitted: true
      }));
    }, 1500);
  };
  
  if (formState.isSubmitted) {
    return <SuccessView />;
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Join Developer Program</h2>
        
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Key className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="font-medium text-gray-800 mb-1">API Access</h3>
              <p className="text-sm text-gray-600">Get access to our comprehensive API suite</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Server className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="font-medium text-gray-800 mb-1">Developer Tools</h3>
              <p className="text-sm text-gray-600">SDKs, documentation, and sample code</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="font-medium text-gray-800 mb-1">Support</h3>
              <p className="text-sm text-gray-600">Technical support and developer community</p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Organization Information</h3>
              
              <div className="space-y-4">
                <RadioGroup 
                  value={formState.developerType}
                  onValueChange={(value) => handleRadioChange("developerType", value)} 
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="company" id="company" />
                    <Label htmlFor="company">Company or Organization</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="individual" id="individual" />
                    <Label htmlFor="individual">Individual Developer</Label>
                  </div>
                </RadioGroup>
                
                {formState.developerType === "company" && (
                  <div className="pt-2">
                    <Label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formState.companyName}
                      onChange={handleChange}
                      placeholder="Your company name"
                      required
                    />
                  </div>
                )}
                
                <div>
                  <Label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </Label>
                  <Input
                    id="website"
                    name="website"
                    value={formState.website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Integration Details</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="useCase" className="block text-sm font-medium text-gray-700 mb-1">
                    Describe Your Use Case
                  </Label>
                  <Textarea
                    id="useCase"
                    name="useCase"
                    value={formState.useCase}
                    onChange={handleChange}
                    placeholder="Tell us how you plan to use the WealthHorizon API..."
                    rows={4}
                    required
                  />
                </div>
                
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected API Usage Volume
                  </Label>
                  <RadioGroup 
                    value={formState.usageVolume}
                    onValueChange={(value) => handleRadioChange("usageVolume", value)} 
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="low" />
                      <Label htmlFor="low">Low (< 1,000 requests/day)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium">Medium (1,000 - 10,000 requests/day)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="high" />
                      <Label htmlFor="high">High (> 10,000 requests/day)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Checkbox 
                  id="agreeTerms" 
                  checked={formState.agreeTerms}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange("agreeTerms", checked as boolean)
                  }
                  className="mt-0.5 mr-2"
                />
                <Label htmlFor="agreeTerms" className="text-sm text-gray-700">
                  I agree to the <Link to="/terms-of-service" className="text-indigo-600 hover:text-indigo-800">Terms of Service</Link> for developers
                </Label>
              </div>
              
              <div className="flex items-start">
                <Checkbox 
                  id="agreeDataPolicy" 
                  checked={formState.agreeDataPolicy}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange("agreeDataPolicy", checked as boolean)
                  }
                  className="mt-0.5 mr-2"
                />
                <Label htmlFor="agreeDataPolicy" className="text-sm text-gray-700">
                  I agree to the <Link to="/privacy-policy" className="text-indigo-600 hover:text-indigo-800">Data Processing Policy</Link>
                </Label>
              </div>
            </div>
            
            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
                {formState.isSubmitting ? (
                  <>Processing... <span className="animate-spin ml-2">⟳</span></>
                ) : (
                  "Submit Application"
                )}
              </Button>
              
              <p className="text-sm text-gray-500 mt-4 text-center">
                Applications are typically reviewed within 2-3 business days.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const SuccessView = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-green-100">
        <CardHeader className="pb-4">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Application Submitted</CardTitle>
          <CardDescription className="text-center">Your developer program application has been received</CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-6">
          <p className="mb-4 text-gray-700">
            Thank you for your interest in the WealthHorizon Developer Program. Our team will review your application and get back to you within 2-3 business days.
          </p>
          
          <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-6 text-left">
            <div className="flex">
              <Info className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-800 mb-1">What's Next?</h4>
                <p className="text-sm text-blue-700">
                  Once your application is approved, you'll receive an email with instructions on how to access
                  your API credentials and developer resources.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-md">
              <Server className="h-8 w-8 text-gray-500 mb-2" />
              <h4 className="font-medium text-gray-800 mb-1">API Access</h4>
              <p className="text-sm text-gray-600 text-center">Access to our full API suite and sandbox environment</p>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-md">
              <Users className="h-8 w-8 text-gray-500 mb-2" />
              <h4 className="font-medium text-gray-800 mb-1">Developer Forum</h4>
              <p className="text-sm text-gray-600 text-center">Join our community of developers</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button variant="outline" asChild>
            <Link to="/documentation">View Documentation</Link>
          </Button>
          <Button asChild>
            <Link to="/">Return Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const DeveloperDashboard = () => {
  // This is a placeholder for the dashboard that would be shown after approval
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Developer Dashboard</h2>
        <p className="text-gray-700">
          Your developer dashboard will be available after your application is approved.
        </p>
      </div>
    </div>
  );
};

export default DeveloperPortal;

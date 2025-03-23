
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "@/context/OnboardingContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, FileText, UserCheck, Share2, LucideIcon, ArrowLeft } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  comingSoon?: boolean;
}

const FeatureCard = ({ title, description, icon: Icon, comingSoon = false }: FeatureCardProps) => (
  <Card className="h-full transition-all hover:shadow-md">
    <CardHeader className="pb-2">
      <div className="p-2 w-fit rounded-full bg-blue-50 mb-2">
        <Icon className="h-5 w-5 text-blue-600" />
      </div>
      <CardTitle className="text-xl flex items-center gap-2">
        {title}
        {comingSoon && (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">Coming Soon</span>
        )}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription>{description}</CardDescription>
    </CardContent>
    <CardFooter>
      <Button 
        variant={comingSoon ? "outline" : "default"} 
        className="w-full" 
        disabled={comingSoon}
      >
        {comingSoon ? "Notify Me" : "Access"}
      </Button>
    </CardFooter>
  </Card>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const { onboardingData } = useOnboarding();

  // Check if onboarding is completed, if not redirect to onboarding
  useEffect(() => {
    if (!onboardingData.completed) {
      navigate("/onboarding");
    }
  }, [onboardingData.completed, navigate]);

  if (!onboardingData.completed) {
    return null; // Will redirect in useEffect
  }

  return (
    <Layout className="py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {onboardingData.personalInfo.firstName}</h1>
          <p className="text-gray-600 mt-1">Your onboarding has been completed successfully.</p>
        </div>
        <Button 
          variant="outline" 
          className="rounded-lg"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-6 mb-10 text-white shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">KYC Information Submitted</h2>
            <p className="opacity-90 max-w-xl">
              Your KYC information has been successfully submitted. We are now reviewing your documents and will notify you once the verification is complete.
            </p>
          </div>
          <div className="p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-center">
            <p className="text-sm opacity-80">Verification Status</p>
            <p className="text-lg font-semibold">Under Review</p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-6">Platform Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <FeatureCard
          title="KYC Information"
          description="Access and manage your submitted KYC information. Update your details and documents when needed."
          icon={UserCheck}
        />
        
        <FeatureCard
          title="Document Repository"
          description="Access all your financial documents in one place. Securely store and organize your important files."
          icon={FileText}
          comingSoon
        />
        
        <FeatureCard
          title="Information Sharing"
          description="Securely share your KYC information with approved third-parties for streamlined onboarding."
          icon={Share2}
          comingSoon
        />
        
        <FeatureCard
          title="Verification Status"
          description="Track the status of your KYC verification process and receive updates on any required actions."
          icon={CheckCircle}
        />
      </div>

      <div className="bg-blue-50 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-2">Next Steps</h3>
        <p className="text-gray-600 mb-4">
          Our team will review your information and may contact you if additional documentation is required. 
          Once your verification is complete, you'll gain access to all platform features.
        </p>
        <Button>View Verification Status</Button>
      </div>
    </Layout>
  );
};

export default Dashboard;

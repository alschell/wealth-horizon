
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useOnboarding } from "@/context/OnboardingContext";
import Layout from "@/components/Layout";
import OnboardingHeader from "@/components/OnboardingHeader";
import FamilyOfficeInfoForm from "@/components/onboarding/family-office/FamilyOfficeInfoForm";
import { PrimaryContactForm } from "@/components/onboarding/primary-contact";
import AddressForm from "@/components/onboarding/AddressForm";
import LegalDocumentsForm from "@/components/onboarding/LegalDocumentsForm";
import DataSourceForm from "@/components/onboarding/DataSourceForm";
import BeneficialOwnersForm from "@/components/onboarding/BeneficialOwnersForm";
import ReviewStep from "@/components/onboarding/ReviewStep";
import AnimatedTransition from "@/components/AnimatedTransition";

const Onboarding = () => {
  const { currentStep, setCurrentStep } = useOnboarding();
  const location = useLocation();
  const navigate = useNavigate();

  const totalSteps = 7;

  // Detect path changes and update current step
  useEffect(() => {
    const path = location.pathname;
    if (path === "/onboarding/family-office") setCurrentStep(0);
    else if (path === "/onboarding/primary-contact") setCurrentStep(1);
    else if (path === "/onboarding/address") setCurrentStep(2);
    else if (path === "/onboarding/legal-documents") setCurrentStep(3);
    else if (path === "/onboarding/beneficial-owners") setCurrentStep(4);
    else if (path === "/onboarding/data-source") setCurrentStep(5);
    else if (path === "/onboarding/review") setCurrentStep(6);
    else if (path === "/onboarding") setCurrentStep(0);
    
    // Scroll to top when the route changes
    window.scrollTo(0, 0);
  }, [location.pathname, setCurrentStep]);

  // Navigation function that also scrolls to top
  const navigateToStep = (step: number) => {
    // Scroll to top before navigating
    window.scrollTo(0, 0);
    
    switch (step) {
      case 0:
        navigate("/onboarding/family-office");
        break;
      case 1:
        navigate("/onboarding/primary-contact");
        break;
      case 2:
        navigate("/onboarding/address");
        break;
      case 3:
        navigate("/onboarding/legal-documents");
        break;
      case 4:
        navigate("/onboarding/beneficial-owners");
        break;
      case 5:
        navigate("/onboarding/data-source");
        break;
      case 6:
        navigate("/onboarding/review");
        break;
      default:
        navigate("/onboarding/family-office");
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <FamilyOfficeInfoForm />;
      case 1:
        return <PrimaryContactForm />;
      case 2:
        return <AddressForm />;
      case 3:
        return <LegalDocumentsForm />;
      case 4:
        return <BeneficialOwnersForm />;
      case 5:
        return <DataSourceForm />;
      case 6:
        return <ReviewStep />;
      default:
        return <Navigate to="/onboarding/family-office" />;
    }
  };

  return (
    <Layout className="min-h-screen py-12 bg-gradient-to-b from-gray-50/30 to-white">
      <OnboardingHeader />
      
      <div className="max-w-4xl mx-auto">
        <AnimatedTransition>
          {renderCurrentStep()}
        </AnimatedTransition>
      </div>
    </Layout>
  );
};

export default Onboarding;


import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useOnboarding } from "@/context/OnboardingContext";
import Layout from "@/components/Layout";
import OnboardingHeader from "@/components/OnboardingHeader";
import PersonalInfoForm from "@/components/onboarding/PersonalInfoForm";
import AddressForm from "@/components/onboarding/AddressForm";
import IdentityVerificationForm from "@/components/onboarding/IdentityVerificationForm";
import DataSourceForm from "@/components/onboarding/DataSourceForm";
import ReviewStep from "@/components/onboarding/ReviewStep";
import AnimatedTransition from "@/components/AnimatedTransition";

const Onboarding = () => {
  const { currentStep, setCurrentStep } = useOnboarding();
  const location = useLocation();

  // Sync route with current step
  useEffect(() => {
    const path = location.pathname;
    if (path === "/onboarding/personal-info") setCurrentStep(0);
    else if (path === "/onboarding/address") setCurrentStep(1);
    else if (path === "/onboarding/verification") setCurrentStep(2);
    else if (path === "/onboarding/data-source") setCurrentStep(3);
    else if (path === "/onboarding/review") setCurrentStep(4);
    else if (path === "/onboarding") setCurrentStep(0);
  }, [location.pathname, setCurrentStep]);

  // Render the current step component
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoForm />;
      case 1:
        return <AddressForm />;
      case 2:
        return <IdentityVerificationForm />;
      case 3:
        return <DataSourceForm />;
      case 4:
        return <ReviewStep />;
      default:
        return <Navigate to="/onboarding/personal-info" />;
    }
  };

  return (
    <Layout className="min-h-screen py-12 bg-gradient-to-b from-blue-50/30 to-white">
      <OnboardingHeader />
      <AnimatedTransition>
        {renderCurrentStep()}
      </AnimatedTransition>

      <Routes>
        <Route path="/" element={<Navigate to="/onboarding/personal-info" />} />
        <Route path="/personal-info" element={<PersonalInfoForm />} />
        <Route path="/address" element={<AddressForm />} />
        <Route path="/verification" element={<IdentityVerificationForm />} />
        <Route path="/data-source" element={<DataSourceForm />} />
        <Route path="/review" element={<ReviewStep />} />
      </Routes>
    </Layout>
  );
};

export default Onboarding;

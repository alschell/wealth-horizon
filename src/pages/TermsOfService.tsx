
import React from 'react';
import LegalPageTemplate from '@/components/legal/LegalPageTemplate';
import TranslatedText from "@/components/ui/translated-text";

const TermsOfService = () => {
  return (
    <LegalPageTemplate
      title="Terms of Service"
      description="Review our terms of service and usage conditions."
    >
      <TranslatedText>
        By using WealthHorizon's services, you agree to these terms...
      </TranslatedText>
    </LegalPageTemplate>
  );
};

export default TermsOfService;

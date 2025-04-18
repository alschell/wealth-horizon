
import React from 'react';
import LegalPageTemplate from '@/components/legal/LegalPageTemplate';
import TranslatedText from "@/components/ui/translated-text";

const TermsOfService = () => {
  return (
    <LegalPageTemplate
      title={<TranslatedText>Terms of Service</TranslatedText>}
      description={<TranslatedText>Review our terms of service and usage conditions.</TranslatedText>}
    >
      <TranslatedText>
        By using WealthHorizon's services, you agree to these terms...
      </TranslatedText>
    </LegalPageTemplate>
  );
};

export default TermsOfService;

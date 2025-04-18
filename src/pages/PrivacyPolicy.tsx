
import React from 'react';
import LegalPageTemplate from '@/components/legal/LegalPageTemplate';
import TranslatedText from "@/components/ui/translated-text";

const PrivacyPolicy = () => {
  return (
    <LegalPageTemplate
      title={<TranslatedText>Privacy Policy</TranslatedText>}
      description={<TranslatedText>Learn about how we handle and protect your personal information.</TranslatedText>}
    >
      <TranslatedText>
        At WealthHorizon, we take your privacy seriously...
      </TranslatedText>
    </LegalPageTemplate>
  );
};

export default PrivacyPolicy;

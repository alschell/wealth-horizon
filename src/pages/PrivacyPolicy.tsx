
import React from 'react';
import LegalPageTemplate from '@/components/legal/LegalPageTemplate';
import TranslatedText from "@/components/ui/translated-text";

const PrivacyPolicy = () => {
  return (
    <LegalPageTemplate
      title="Privacy Policy"
      description="Learn about how we handle and protect your personal information."
    >
      <TranslatedText>
        At WealthHorizon, we take your privacy seriously...
      </TranslatedText>
    </LegalPageTemplate>
  );
};

export default PrivacyPolicy;

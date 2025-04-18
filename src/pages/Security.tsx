
import React from 'react';
import LegalPageTemplate from '@/components/legal/LegalPageTemplate';
import TranslatedText from "@/components/ui/translated-text";

const Security = () => {
  return (
    <LegalPageTemplate
      title={<TranslatedText>Security</TranslatedText>}
      description={<TranslatedText>Learn about our security practices and data protection measures.</TranslatedText>}
    >
      <TranslatedText>
        Our platform employs industry-leading security measures to protect your sensitive financial data...
      </TranslatedText>
    </LegalPageTemplate>
  );
};

export default Security;

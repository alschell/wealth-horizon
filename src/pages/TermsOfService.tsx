
import React from 'react';
import LegalPageTemplate from '@/components/legal/LegalPageTemplate';
import { TranslatedText } from "@/components/ui/translated-text";

const TermsOfService = () => {
  return (
    <LegalPageTemplate
      title={<TranslatedText>Terms of Service</TranslatedText>}
      description={<TranslatedText>Review our terms of service and usage conditions.</TranslatedText>}
    >
      <TranslatedText as="p">By using WealthHorizon's services, you agree to these terms and conditions. Please read them carefully.</TranslatedText>
      
      <h2><TranslatedText>Service Agreement</TranslatedText></h2>
      <TranslatedText as="p">These terms constitute a legally binding agreement between you and WealthHorizon regarding your use of our platform and services.</TranslatedText>
      
      <h2><TranslatedText>User Obligations</TranslatedText></h2>
      <TranslatedText as="p">You agree to use our services in compliance with all applicable laws and regulations.</TranslatedText>
    </LegalPageTemplate>
  );
};

export default TermsOfService;

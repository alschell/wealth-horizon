
import React from 'react';
import LegalPageTemplate from '@/components/legal/LegalPageTemplate';
import { TranslatedText } from "@/components/ui/translated-text";

const Security = () => {
  return (
    <LegalPageTemplate
      title={<TranslatedText>Security</TranslatedText>}
      description={<TranslatedText>Learn about our security practices and data protection measures.</TranslatedText>}
    >
      <TranslatedText as="p">Our platform employs industry-leading security measures to protect your sensitive financial data.</TranslatedText>
      
      <h2><TranslatedText>Data Encryption</TranslatedText></h2>
      <TranslatedText as="p">All data transmitted through our platform is encrypted using state-of-the-art encryption protocols.</TranslatedText>
      
      <h2><TranslatedText>Access Controls</TranslatedText></h2>
      <TranslatedText as="p">We implement strict access controls and authentication measures to ensure your data remains secure.</TranslatedText>
    </LegalPageTemplate>
  );
};

export default Security;

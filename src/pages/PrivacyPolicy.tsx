
import React from 'react';
import LegalPageTemplate from '@/components/legal/LegalPageTemplate';
import { TranslatedText } from "@/components/ui/translated-text";

const PrivacyPolicy = () => {
  return (
    <LegalPageTemplate
      title={<TranslatedText>Privacy Policy</TranslatedText>}
      description={<TranslatedText>Learn about how we handle and protect your personal information.</TranslatedText>}
    >
      <TranslatedText as="p">At WealthHorizon, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our services.</TranslatedText>
      
      <h2><TranslatedText>Information We Collect</TranslatedText></h2>
      <TranslatedText as="p">We collect information that you provide directly to us, including your name, email address, and financial information necessary to provide our services.</TranslatedText>
      
      <h2><TranslatedText>How We Use Your Information</TranslatedText></h2>
      <TranslatedText as="p">We use your information to provide, maintain, and improve our services, communicate with you, and comply with legal obligations.</TranslatedText>
    </LegalPageTemplate>
  );
};

export default PrivacyPolicy;

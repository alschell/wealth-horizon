
import React from 'react';
import PageTemplate from "@/components/shared/PageTemplate";
import { Building2 } from "lucide-react";
import TranslatedText from "@/components/ui/translated-text";

const About = () => {
  return (
    <PageTemplate
      title={<TranslatedText>About Us</TranslatedText>}
      description={<TranslatedText>Learn about our mission and the team behind WealthHorizon.</TranslatedText>}
      icon={Building2}
    >
      <div className="prose max-w-none">
        <TranslatedText>
          WealthHorizon is revolutionizing wealth management through technology...
        </TranslatedText>
      </div>
    </PageTemplate>
  );
};

export default About;

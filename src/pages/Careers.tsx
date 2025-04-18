
import React from 'react';
import PageTemplate from "@/components/shared/PageTemplate";
import { Briefcase } from "lucide-react";
import TranslatedText from "@/components/ui/translated-text";

const Careers = () => {
  return (
    <PageTemplate
      title={<TranslatedText>Careers</TranslatedText>}
      description={<TranslatedText>Join our team and help shape the future of wealth management.</TranslatedText>}
      icon={Briefcase}
    >
      <div className="space-y-8">
        <TranslatedText>Career opportunities coming soon...</TranslatedText>
      </div>
    </PageTemplate>
  );
};

export default Careers;

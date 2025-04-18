
import React from 'react';
import PageTemplate from "@/components/shared/PageTemplate";
import { Newspaper } from "lucide-react";
import TranslatedText from "@/components/ui/translated-text";

const Press = () => {
  return (
    <PageTemplate
      title={<TranslatedText>Press</TranslatedText>}
      description={<TranslatedText>Latest news and media coverage about WealthHorizon.</TranslatedText>}
      icon={Newspaper}
    >
      <div className="space-y-8">
        <TranslatedText>Press releases and media coverage coming soon...</TranslatedText>
      </div>
    </PageTemplate>
  );
};

export default Press;

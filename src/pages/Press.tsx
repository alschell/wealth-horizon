
import React from "react";
import { Helmet } from "react-helmet-async";
import { Newspaper } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import PageTemplate from "@/components/shared/PageTemplate";
import { 
  PressReleaseSection, 
  MediaCoverageSection, 
  AwardsSection, 
  MediaInquirySection, 
  CompanyInfoSection,
  pressReleases,
  mediaFeatures
} from "@/components/press";

const Press: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Press & Media | WealthHorizon</title>
        <meta name="description" content="Latest news, media coverage, press releases, and contact information for WealthHorizon's media relations." />
        <meta name="keywords" content="wealth management, press releases, media coverage, fintech news, wealth tech" />
      </Helmet>
      
      <PageTemplate
        title="Press & Media"
        description="Discover the latest news, updates, and media coverage of WealthHorizon."
        icon={Newspaper}
      >
        <div className="space-y-12">
          <PressReleaseSection pressReleases={pressReleases} />
          
          <Separator />
          
          <MediaCoverageSection mediaFeatures={mediaFeatures} />
          
          <Separator />
          
          <AwardsSection />
          
          <Separator />
          
          <MediaInquirySection />
          
          <CompanyInfoSection />
        </div>
      </PageTemplate>
    </>
  );
};

export default Press;


import React from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { Newspaper } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Helmet } from "react-helmet-async";
import { 
  PressReleaseSection, 
  MediaCoverageSection, 
  AwardsSection, 
  MediaInquirySection, 
  CompanyInfoSection,
  pressReleases,
  mediaFeatures,
  awards
} from "@/components/press";

const Press = () => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/assets/dashboard-fallback.png';
  };

  return (
    <>
      <Helmet>
        <title>Press & Media | WealthHorizon</title>
        <meta name="description" content="Latest news, press releases, media coverage, and awards about WealthHorizon's wealth management platform for family offices." />
        <meta name="keywords" content="wealth management, press releases, fintech news, family office technology, wealth tech" />
      </Helmet>
      
      <PageTemplate
        title="Press & Media"
        description="News, announcements, and media resources about WealthHorizon."
        icon={Newspaper}
      >
        <div className="space-y-12">
          <PressReleaseSection pressReleases={pressReleases} />
          
          <Separator />
          
          <MediaCoverageSection 
            mediaFeatures={mediaFeatures} 
            handleImageError={handleImageError} 
          />
          
          <AwardsSection 
            awards={awards} 
            handleImageError={handleImageError} 
          />
          
          <MediaInquirySection />
          
          <CompanyInfoSection />
        </div>
      </PageTemplate>
    </>
  );
};

export default Press;

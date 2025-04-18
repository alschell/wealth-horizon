
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async"; 
import { LandingLayout } from "@/components/landing";
import { useTranslation } from "@/context/TranslationContext";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import LoadingSpinner from "@/components/common/LoadingSpinner";

/**
 * Main landing page with SEO optimization and structured data
 */
const LandingPage: React.FC = () => {
  const { translate, currentLanguage } = useTranslation();
  const [title, setTitle] = useState("Wealth Horizon | Intelligent Wealth Management");
  const [description, setDescription] = useState("Wealth Horizon provides comprehensive wealth management solutions for family offices and high-net-worth individuals.");
  const [keywords, setKeywords] = useState("wealth management, family office, financial planning, investment");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    let isMounted = true;
    console.log("LandingPage: Translation effect triggered");
    
    const updateSEO = async () => {
      try {
        console.log("LandingPage: Starting SEO translation");
        setIsLoading(true);
        
        // Use Promise.all to fetch all translations concurrently
        const [translatedTitle, translatedDescription, translatedKeywords] = await Promise.all([
          translate("Wealth Horizon | Intelligent Wealth Management"),
          translate("Wealth Horizon provides comprehensive wealth management solutions for family offices and high-net-worth individuals."),
          translate("wealth management, family office, financial planning, investment")
        ]);
        
        console.log("LandingPage: Translations completed successfully");
        
        if (isMounted) {
          setTitle(translatedTitle);
          setDescription(translatedDescription);
          setKeywords(translatedKeywords);
          setIsLoading(false);
          setHasError(false);
        }
      } catch (error) {
        console.error("Error translating SEO content:", error);
        if (isMounted) {
          // On error, still show the page with default English text
          setIsLoading(false);
          setHasError(true);
        }
      }
    };
    
    updateSEO();
    
    return () => {
      isMounted = false;
    };
  }, [translate, currentLanguage]);

  // Structured data for rich search results
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Wealth Horizon",
    "url": "https://wealthhorizon.com",
    "logo": "https://wealthhorizon.com/logo.png",
    "description": description,
    "sameAs": [
      "https://twitter.com/wealthhorizon",
      "https://www.linkedin.com/company/wealth-horizon",
      "https://www.facebook.com/wealthhorizon"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "customer service",
      "availableLanguage": ["English"]
    },
    "founder": {
      "@type": "Person",
      "name": "Jane Smith"
    },
    "foundingDate": "2018-01-01",
    "areaServed": ["Global", "United States", "Europe", "Asia"],
    "keywords": keywords
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="sm" color="text-gray-400" text="Loading content..." textClassName="text-gray-400" />
      </div>
    );
  }

  // Even if there was an error translating, still render the page with default values
  return (
    <ErrorBoundary>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wealthhorizon.com/" />
        <meta property="og:image" content="https://wealthhorizon.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://wealthhorizon.com/twitter-image.jpg" />
        <link rel="canonical" href="https://wealthhorizon.com/" />
        
        {/* Add language and direction */}
        <html lang={currentLanguage} dir={['ar', 'he', 'fa'].includes(currentLanguage) ? 'rtl' : 'ltr'} />
        
        {/* Add structured data for rich search results */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <LandingLayout />
    </ErrorBoundary>
  );
};

export default LandingPage;

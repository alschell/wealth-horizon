
import React from "react";
import { Helmet } from "react-helmet-async"; 
import { LandingLayout } from "@/components/landing";
import { useTranslation } from "@/context/TranslationContext";

/**
 * Main landing page with SEO optimization and structured data
 */
const LandingPage: React.FC = () => {
  const { currentLanguage } = useTranslation();
  
  // Structured data for rich search results
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Wealth Horizon",
    "url": "https://wealthhorizon.com",
    "logo": "https://wealthhorizon.com/logo.png",
    "description": "Wealth Horizon provides comprehensive wealth management solutions for family offices and high-net-worth individuals.",
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
    "keywords": "wealth management, family office, financial planning, investment, portfolio optimization"
  };

  return (
    <>
      <Helmet>
        <title>Wealth Horizon | Intelligent Wealth Management</title>
        <meta name="description" content="Wealth Horizon provides comprehensive wealth management solutions for family offices and high-net-worth individuals." />
        <meta name="keywords" content="wealth management, family office, financial planning, investment" />
        <meta property="og:title" content="Wealth Horizon | Intelligent Wealth Management" />
        <meta property="og:description" content="Comprehensive wealth management solutions for family offices and high-net-worth individuals." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wealthhorizon.com/" />
        <meta property="og:image" content="https://wealthhorizon.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Wealth Horizon | Intelligent Wealth Management" />
        <meta name="twitter:description" content="Comprehensive wealth management solutions for family offices." />
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
    </>
  );
};

export default LandingPage;

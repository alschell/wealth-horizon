
import React from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { Newspaper, Award, Calendar, ExternalLink, Download, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

// Updated press releases with more realistic content
const pressReleases = [
  {
    id: 1,
    title: "WealthHorizon Announces Strategic Partnership with Blackrock to Enhance Investment Solutions",
    date: "April 10, 2025",
    excerpt: "This collaboration will integrate Blackrock's Aladdin® platform with WealthHorizon's wealth management suite, providing family offices with unparalleled portfolio analytics and risk assessment capabilities.",
    link: "#partnership-blackrock"
  },
  {
    id: 2,
    title: "WealthHorizon Platform Wins 'Wealth Tech Platform of the Year' at 2025 Private Banking Awards",
    date: "March 15, 2025",
    excerpt: "Our wealth management platform was recognized for its innovative approach to portfolio analytics, ESG integration, and client engagement tools for family offices and ultra-high-net-worth individuals.",
    link: "#private-banking-award-2025"
  },
  {
    id: 3,
    title: "WealthHorizon Expands European Presence with New Office in Zurich",
    date: "February 22, 2025",
    excerpt: "This expansion strengthens our commitment to serving family offices and financial institutions across Europe with local expertise while providing enhanced support for our growing Swiss client base.",
    link: "#zurich-office-opening"
  },
  {
    id: 4,
    title: "WealthHorizon Secures $75 Million in Series C Funding to Accelerate Global Expansion",
    date: "January 18, 2025",
    excerpt: "The funding round, led by Sequoia Capital with participation from existing investors, will support our international growth strategy and accelerate our product development roadmap.",
    link: "#series-c-funding"
  }
];

// Enhanced media features with more realistic content
const mediaFeatures = [
  {
    id: 1,
    title: "How WealthHorizon is Revolutionizing Family Office Management",
    publication: "Financial Times",
    date: "March 28, 2025",
    link: "#ft-article",
    image: "/assets/dashboard-preview.png"
  },
  {
    id: 2,
    title: "The Technology Transforming Wealth Management for Ultra-High-Net-Worth Families",
    publication: "Bloomberg",
    date: "March 5, 2025",
    link: "#bloomberg-article",
    image: "/assets/dashboard-fallback.png"
  },
  {
    id: 3,
    title: "WealthHorizon CEO Discusses the Future of Wealth Tech on Bloomberg Markets",
    publication: "Bloomberg TV",
    date: "February 12, 2025",
    link: "#bloomberg-tv-interview",
    image: "/assets/dashboard-preview.png"
  },
  {
    id: 4,
    title: "Family Offices Embrace Digital Transformation with WealthHorizon",
    publication: "Wall Street Journal",
    date: "January 20, 2025",
    link: "#wsj-article",
    image: "/assets/dashboard-fallback.png"
  }
];

// Enhanced awards data
const awards = [
  { 
    year: "2025", 
    award: "Wealth Tech Platform of the Year", 
    organization: "Private Banking Awards",
    logo: "/assets/dashboard-preview.png"
  },
  { 
    year: "2025", 
    award: "Best Platform for Family Offices", 
    organization: "Family Wealth Report Awards",
    logo: "/assets/dashboard-fallback.png"
  },
  { 
    year: "2025", 
    award: "Top 10 FinTech Innovators", 
    organization: "Forbes Fintech 50",
    logo: "/assets/dashboard-preview.png"
  }
];

const Press = () => {
  // Function to handle image loading errors
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
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Press Releases</h2>
            <div className="space-y-6">
              {pressReleases.map((release) => (
                <div key={release.id} className="bg-white border border-gray-100 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center text-gray-500 mb-2">
                    <Calendar size={16} className="mr-2" />
                    <span className="text-sm">{release.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{release.title}</h3>
                  <p className="text-gray-600 mb-4">{release.excerpt}</p>
                  <Button variant="outline" className="flex items-center gap-2" asChild>
                    <a href={release.link}>
                      Read Full Release <ExternalLink size={14} />
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </section>
          
          <Separator />
          
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Media Coverage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mediaFeatures.map((feature) => (
                <div key={feature.id} className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-40 bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden">
                    <img 
                      src={feature.image} 
                      alt={`${feature.publication} article`} 
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-indigo-600 font-medium">{feature.publication}</span>
                      <span className="text-sm text-gray-500">{feature.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">{feature.title}</h3>
                    <a href={feature.link} className="text-indigo-600 hover:text-indigo-800 flex items-center">
                      Read Article <ExternalLink size={14} className="ml-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Awards & Recognition</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {awards.map((item, index) => (
                <div key={index} className="bg-indigo-50 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4 overflow-hidden">
                    <img 
                      src={item.logo} 
                      alt={item.organization}
                      className="w-12 h-12 object-contain"
                      onError={handleImageError}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.award}</h3>
                  <p className="text-gray-600 mb-2">{item.organization}</p>
                  <span className="text-sm text-indigo-600">{item.year}</span>
                </div>
              ))}
            </div>
          </section>
          
          <section className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Media Inquiries</h2>
            <p className="text-gray-600 mb-6">
              For press inquiries, interview requests, or media resources, please contact our communications team at <a href="mailto:press@wealthhorizon.com" className="text-indigo-600 hover:underline">press@wealthhorizon.com</a>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex items-center gap-2">
                <Download size={16} /> Download Press Kit
              </Button>
              <Button variant="outline" className="flex items-center gap-2" asChild>
                <a href="mailto:press@wealthhorizon.com">
                  <Mail size={16} /> Contact Media Relations
                </a>
              </Button>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Company Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">About WealthHorizon</h3>
                <p className="text-gray-600 mb-4">
                  WealthHorizon is a leading wealth management technology provider for family offices and ultra-high-net-worth individuals. Founded in 2018, we now serve over 200 family offices across 15 countries with our comprehensive wealth management platform.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="#about">Learn More</a>
                </Button>
              </div>
              <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Leadership Team</h3>
                <p className="text-gray-600 mb-4">
                  Our leadership team brings together expertise from wealth management, financial services, and technology to build solutions that address the unique needs of family offices and high-net-worth individuals.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="#leadership">Meet the Team</a>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </PageTemplate>
    </>
  );
};

export default Press;

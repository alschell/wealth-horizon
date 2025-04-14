
import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { SocialLinks } from "./contact";
import { LocalizedText, useLocalizedText } from "@/components/ui/localized-text";
import { useLanguage } from "@/context/LanguageContext";

const FooterSection: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLocalizedText();
  const { language } = useLanguage();
  const [, forceUpdate] = useState({});
  
  // Force re-render when language changes
  useEffect(() => {
    console.log(`FooterSection detected language change to: ${language}`);
    forceUpdate({});
  }, [language]);
  
  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = () => {
      console.log("FooterSection detected language change event");
      forceUpdate({});
    };
    
    window.addEventListener('languageChange', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      // If not found on current page, navigate to home with hash
      navigate(`/#${id}`);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-400 py-16" id="about" key={`footer-section-${language}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-white font-bold text-xl mb-4">
              <span className="text-indigo-400">Wealth</span>
              <span className="text-white">Horizon</span>
            </h3>
            <p className="mb-4">
              <LocalizedText 
                textKey="holisticWealthFooter" 
                fallback="Holistic wealth management for family offices and institutions." 
              />
            </p>
            <SocialLinks />
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">
              <LocalizedText textKey="solutions" fallback="Solutions" />
            </h4>
            <ul className="space-y-2">
              <li><Link to="/portfolio-management" className="hover:text-white transition-colors">
                <LocalizedText textKey="portfolioManagement" fallback="Portfolio Management" />
              </Link></li>
              <li><Link to="/trading" className="hover:text-white transition-colors">
                <LocalizedText textKey="trading" fallback="Trading" />
              </Link></li>
              <li><Link to="/analyze-wealth" className="hover:text-white transition-colors">
                <LocalizedText textKey="wealthAnalysis" fallback="Wealth Analysis" />
              </Link></li>
              <li><Link to="/reporting" className="hover:text-white transition-colors">
                <LocalizedText textKey="reporting" fallback="Reporting" />
              </Link></li>
              <li><Link to="/compliance-monitoring" className="hover:text-white transition-colors">
                <LocalizedText textKey="compliance" fallback="Compliance" />
              </Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">
              <LocalizedText textKey="company" fallback="Company" />
            </h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-white transition-colors">
                <LocalizedText textKey="aboutUs" fallback="About Us" />
              </Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">
                <LocalizedText textKey="careers" fallback="Careers" />
              </Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">
                <LocalizedText textKey="blog" fallback="Blog" />
              </Link></li>
              <li><Link to="/press" className="hover:text-white transition-colors">
                <LocalizedText textKey="press" fallback="Press" />
              </Link></li>
              <li><a href="#contact" onClick={(e) => {e.preventDefault(); scrollToSection('contact');}} className="hover:text-white transition-colors">
                <LocalizedText textKey="contact" fallback="Contact" />
              </a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">
              <LocalizedText textKey="resources" fallback="Resources" />
            </h4>
            <ul className="space-y-2">
              <li><Link to="/documentation" className="hover:text-white transition-colors">
                <LocalizedText textKey="documentation" fallback="Documentation" />
              </Link></li>
              <li><Link to="/help-center" className="hover:text-white transition-colors">
                <LocalizedText textKey="helpCenter" fallback="Help Center" />
              </Link></li>
              <li><Link to="/security" className="hover:text-white transition-colors">
                <LocalizedText textKey="security" fallback="Security" />
              </Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">
                <LocalizedText textKey="privacyPolicy" fallback="Privacy Policy" />
              </Link></li>
              <li><Link to="/terms-of-service" className="hover:text-white transition-colors">
                <LocalizedText textKey="termsOfService" fallback="Terms of Service" />
              </Link></li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8 bg-gray-800" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>
            <LocalizedText 
              textKey="copyright" 
              fallback="© 2025 WealthHorizon. All rights reserved." 
            />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

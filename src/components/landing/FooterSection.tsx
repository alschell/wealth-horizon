
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { SocialLinks } from "./contact";
import TranslatedText from "@/components/ui/translated-text";

const FooterSection: React.FC = () => {
  const navigate = useNavigate();

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
    <footer className="bg-gray-900 text-gray-400 py-16" id="about">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-white font-bold text-xl mb-4">
              <span className="text-indigo-400">Wealth</span>
              <span className="text-white">Horizon</span>
            </h3>
            <p className="mb-4">
              <TranslatedText>Holistic wealth management for family offices and institutions</TranslatedText>
            </p>
            <SocialLinks />
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">
              <TranslatedText>Solutions</TranslatedText>
            </h4>
            <ul className="space-y-2">
              <li><Link to="/portfolio-management" className="hover:text-white transition-colors">
                <TranslatedText>Portfolio Management</TranslatedText>
              </Link></li>
              <li><Link to="/trading" className="hover:text-white transition-colors">
                <TranslatedText>Trading</TranslatedText>
              </Link></li>
              <li><Link to="/analyze-wealth" className="hover:text-white transition-colors">
                <TranslatedText>Wealth Analysis</TranslatedText>
              </Link></li>
              <li><Link to="/reporting" className="hover:text-white transition-colors">
                <TranslatedText>Reporting</TranslatedText>
              </Link></li>
              <li><Link to="/compliance-monitoring" className="hover:text-white transition-colors">
                <TranslatedText>Compliance</TranslatedText>
              </Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">
              <TranslatedText>Company</TranslatedText>
            </h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-white transition-colors">
                <TranslatedText>About Us</TranslatedText>
              </Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">
                <TranslatedText>Careers</TranslatedText>
              </Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">
                <TranslatedText>Blog</TranslatedText>
              </Link></li>
              <li><Link to="/press" className="hover:text-white transition-colors">
                <TranslatedText>Press</TranslatedText>
              </Link></li>
              <li><a href="#contact" onClick={(e) => {e.preventDefault(); scrollToSection('contact');}} className="hover:text-white transition-colors">
                <TranslatedText>Contact</TranslatedText>
              </a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">
              <TranslatedText>Resources</TranslatedText>
            </h4>
            <ul className="space-y-2">
              <li><Link to="/documentation" className="hover:text-white transition-colors">
                <TranslatedText>Documentation</TranslatedText>
              </Link></li>
              <li><Link to="/help-center" className="hover:text-white transition-colors">
                <TranslatedText>Help Center</TranslatedText>
              </Link></li>
              <li><Link to="/security" className="hover:text-white transition-colors">
                <TranslatedText>Security</TranslatedText>
              </Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">
                <TranslatedText>Privacy Policy</TranslatedText>
              </Link></li>
              <li><Link to="/terms-of-service" className="hover:text-white transition-colors">
                <TranslatedText>Terms of Service</TranslatedText>
              </Link></li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8 bg-gray-800" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>
            <TranslatedText>© 2025 WealthHorizon. All rights reserved.</TranslatedText>
          </p>
          <div className="mt-4 md:mt-0">
            {/* All footer links completely removed per user request */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

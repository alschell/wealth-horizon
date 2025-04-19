
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
      navigate(`/#${id}`);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-400 py-16 w-full" id="about">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="text-left">
            <h3 className="text-white font-bold text-xl mb-4 text-left">
              <span className="text-indigo-400">Wealth</span>
              <span className="text-white">Horizon</span>
            </h3>
            <p className="mb-4 text-left">
              <TranslatedText>Holistic wealth management for family offices and institutions.</TranslatedText>
            </p>
            <SocialLinks />
          </div>
          
          <div className="text-left">
            <h4 className="text-white font-semibold mb-4 text-left">
              <TranslatedText>Solutions</TranslatedText>
            </h4>
            <ul className="space-y-2 text-left">
              <li><Link to="/portfolio-management" className="hover:text-white transition-colors text-left">
                <TranslatedText>Portfolio Management</TranslatedText>
              </Link></li>
              <li><Link to="/trading" className="hover:text-white transition-colors text-left">
                <TranslatedText>Trading</TranslatedText>
              </Link></li>
              <li><Link to="/analyze-wealth" className="hover:text-white transition-colors text-left">
                <TranslatedText>Wealth Analysis</TranslatedText>
              </Link></li>
              <li><Link to="/reporting" className="hover:text-white transition-colors text-left">
                <TranslatedText>Reporting</TranslatedText>
              </Link></li>
              <li><Link to="/compliance-monitoring" className="hover:text-white transition-colors text-left">
                <TranslatedText>Compliance</TranslatedText>
              </Link></li>
            </ul>
          </div>
          
          <div className="text-left">
            <h4 className="text-white font-semibold mb-4 text-left">
              <TranslatedText>Company</TranslatedText>
            </h4>
            <ul className="space-y-2 text-left">
              <li><Link to="/about" className="hover:text-white transition-colors text-left">
                <TranslatedText>About Us</TranslatedText>
              </Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors text-left">
                <TranslatedText>Careers</TranslatedText>
              </Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors text-left">
                <TranslatedText>Blog</TranslatedText>
              </Link></li>
              <li><Link to="/press" className="hover:text-white transition-colors text-left">
                <TranslatedText>Press</TranslatedText>
              </Link></li>
              <li><a href="#contact" onClick={(e) => {e.preventDefault(); scrollToSection('contact');}} className="hover:text-white transition-colors text-left">
                <TranslatedText>Contact</TranslatedText>
              </a></li>
            </ul>
          </div>
          
          <div className="text-left">
            <h4 className="text-white font-semibold mb-4 text-left">
              <TranslatedText>Resources</TranslatedText>
            </h4>
            <ul className="space-y-2 text-left">
              <li><Link to="/documentation" className="hover:text-white transition-colors text-left">
                <TranslatedText>Documentation</TranslatedText>
              </Link></li>
              <li><Link to="/help-center" className="hover:text-white transition-colors text-left">
                <TranslatedText>Help Center</TranslatedText>
              </Link></li>
              <li><Link to="/security" className="hover:text-white transition-colors text-left">
                <TranslatedText>Security</TranslatedText>
              </Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors text-left">
                <TranslatedText>Privacy Policy</TranslatedText>
              </Link></li>
              <li><Link to="/terms-of-service" className="hover:text-white transition-colors text-left">
                <TranslatedText>Terms of Service</TranslatedText>
              </Link></li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8 bg-gray-800" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-left">
          <p className="text-left">
            <TranslatedText>© 2025 WealthHorizon. All rights reserved.</TranslatedText>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

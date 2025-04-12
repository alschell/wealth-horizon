
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { SocialLinks } from "./contact";

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
            <p className="mb-4">Holistic wealth management for family offices and institutions.</p>
            <SocialLinks />
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2">
              <li><Link to="/portfolio-management" className="hover:text-white transition-colors">Portfolio Management</Link></li>
              <li><Link to="/trading" className="hover:text-white transition-colors">Trading</Link></li>
              <li><Link to="/analyze-wealth" className="hover:text-white transition-colors">Wealth Analysis</Link></li>
              <li><Link to="/reporting" className="hover:text-white transition-colors">Reporting</Link></li>
              <li><Link to="/compliance-monitoring" className="hover:text-white transition-colors">Compliance</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/press" className="hover:text-white transition-colors">Press</Link></li>
              <li><a href="#contact" onClick={(e) => {e.preventDefault(); scrollToSection('contact');}} className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/documentation" className="hover:text-white transition-colors">Documentation</Link></li>
              <li><Link to="/help-center" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/security" className="hover:text-white transition-colors">Security</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8 bg-gray-800" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 WealthHorizon. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li><Link to="/cookies-policy" className="hover:text-white transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

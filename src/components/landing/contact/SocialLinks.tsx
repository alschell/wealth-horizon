
import React from "react";
import { Linkedin, Youtube } from "lucide-react";
import { X, Globe } from "lucide-react";  // Updated Twitter (X) and Glassdoor icons

const SocialLinks: React.FC = () => {
  return (
    <div className="flex space-x-4">
      <a 
        href="https://www.linkedin.com/company/wealthhorizonai" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:bg-indigo-600 hover:text-white transition-colors"
        aria-label="LinkedIn"
      >
        <Linkedin size={18} />
      </a>
      <a 
        href="https://x.com/wealthhorizonai" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:bg-indigo-600 hover:text-white transition-colors"
        aria-label="X (Twitter)"
      >
        <X size={18} />
      </a>
      <a 
        href="https://youtube.com/@wealthhorizonai" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:bg-indigo-600 hover:text-white transition-colors"
        aria-label="YouTube"
      >
        <Youtube size={18} />
      </a>
      <a 
        href="https://glassdoor.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:bg-indigo-600 hover:text-white transition-colors"
        aria-label="Glassdoor"
      >
        <Globe size={18} />
      </a>
    </div>
  );
};

export default SocialLinks;

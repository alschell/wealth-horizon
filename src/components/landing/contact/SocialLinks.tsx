
import React from "react";
import { Linkedin, Twitter, Youtube } from "lucide-react";

const SocialLinks: React.FC = () => {
  return (
    <div className="flex space-x-4">
      <a 
        href="https://www.linkedin.com/company/wealthhorizon" 
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
        aria-label="Twitter"
      >
        <Twitter size={18} />
      </a>
      <a 
        href="https://youtube.com" 
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
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-current"
        >
          <path 
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM10 15.5C10 14.12 11.12 13 12.5 13C13.88 13 15 14.12 15 15.5C15 16.88 13.88 18 12.5 18C11.12 18 10 16.88 10 15.5ZM16 10C16 11.1 15.1 12 14 12C12.9 12 12 11.1 12 10C12 8.9 12.9 8 14 8C15.1 8 16 8.9 16 10ZM8 10C8 8.9 8.9 8 10 8C11.1 8 12 8.9 12 10C12 11.1 11.1 12 10 12C8.9 12 8 11.1 8 10Z" 
            fill="currentColor"
          />
        </svg>
      </a>
    </div>
  );
};

export default SocialLinks;

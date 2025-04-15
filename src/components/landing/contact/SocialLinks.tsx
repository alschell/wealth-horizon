
import React from "react";
import { Globe } from "lucide-react";
import { TranslatedText } from "@/components/ui/translated-text";

const SocialLinks: React.FC = () => {
  const socialLinks = [
    { name: "Twitter", url: "https://twitter.com/wealthhorizon" },
    { name: "LinkedIn", url: "https://linkedin.com/company/wealthhorizon" },
    { name: "Facebook", url: "https://facebook.com/wealthhorizon" },
    { name: "Instagram", url: "https://instagram.com/wealthhorizon" }
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">
        <TranslatedText>Follow Us</TranslatedText>
      </h3>
      <p className="text-gray-600 mb-6">
        <TranslatedText>
          Stay updated with our latest news, updates, and financial insights by following us on our social media channels.
        </TranslatedText>
      </p>
      
      <div className="flex flex-wrap gap-4">
        {socialLinks.map((link, index) => (
          <a 
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            <Globe className="h-4 w-4 mr-2 text-indigo-600" />
            <TranslatedText>{link.name}</TranslatedText>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;

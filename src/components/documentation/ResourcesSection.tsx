
import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { TranslatedText } from "@/components/ui/translated-text";

interface Resource {
  title: string;
  description: string;
  url: string;
  buttonText: string;
}

export const ResourcesSection: React.FC = () => {
  const resources: Resource[] = [
    {
      title: "Developer Guide",
      description: "Comprehensive guide to the WealthHorizon API with step-by-step tutorials",
      url: "/developer-guide",
      buttonText: "View Guide"
    },
    {
      title: "Sample Applications",
      description: "Browse complete sample applications built with our SDK",
      url: "/samples",
      buttonText: "View Samples"
    },
    {
      title: "Community Forums",
      description: "Connect with other developers and share integration experiences",
      url: "/community",
      buttonText: "Join Discussion"
    },
  ];

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        <TranslatedText>Additional Resources</TranslatedText>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <div key={index} className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-800 mb-2">
              <TranslatedText>{resource.title}</TranslatedText>
            </h3>
            <p className="text-gray-600 mb-4">
              <TranslatedText>{resource.description}</TranslatedText>
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              asChild
            >
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={14} /> <TranslatedText>{resource.buttonText}</TranslatedText>
              </a>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ResourcesSection;

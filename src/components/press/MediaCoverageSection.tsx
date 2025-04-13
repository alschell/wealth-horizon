
import React from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useImageErrorHandler } from "@/hooks/useImageErrorHandler";

interface MediaFeature {
  id: number;
  title: string;
  publication: string;
  date: string;
  link: string;
  image: string;
}

interface MediaCoverageSectionProps {
  mediaFeatures: MediaFeature[];
}

const MediaCoverageSection: React.FC<MediaCoverageSectionProps> = ({ mediaFeatures }) => {
  const handleImageError = useImageErrorHandler();

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Media Coverage</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mediaFeatures.map((feature) => (
          <div key={feature.id} className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="h-48 overflow-hidden">
              <img 
                src={feature.image} 
                alt={feature.title}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <span className="text-sm text-indigo-600 mb-1">{feature.publication} • {feature.date}</span>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
              <div className="mt-auto">
                <Button variant="outline" className="flex items-center gap-2 mt-2" asChild>
                  <a href={feature.link}>
                    Read Article <ExternalLink size={14} />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MediaCoverageSection;

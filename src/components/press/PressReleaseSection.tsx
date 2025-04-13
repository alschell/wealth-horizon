
import React from "react";
import { Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PressRelease {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  link: string;
}

interface PressReleaseSectionProps {
  pressReleases: PressRelease[];
}

const PressReleaseSection: React.FC<PressReleaseSectionProps> = ({ pressReleases }) => {
  return (
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
  );
};

export default PressReleaseSection;

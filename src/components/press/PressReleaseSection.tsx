
import React from "react";
import { PressRelease } from "./pressData";

export interface PressReleaseSectionProps {
  pressReleases: PressRelease[];
}

const PressReleaseSection: React.FC<PressReleaseSectionProps> = ({ pressReleases }) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Press Releases</h2>
      <div className="space-y-6">
        {pressReleases.map((release) => (
          <div key={release.id} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold text-gray-800">{release.title}</h3>
              <span className="text-sm text-gray-500">{release.date}</span>
            </div>
            <p className="text-gray-600 mb-4">{release.summary}</p>
            <a 
              href={release.link} 
              className="inline-block text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Read Full Release
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PressReleaseSection;

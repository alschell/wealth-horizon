
import React from "react";
import { Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useImageErrorHandler } from "@/hooks/useImageErrorHandler";
import { leadershipTeam } from "./mockData";

const LeadershipSection: React.FC = () => {
  const handleImageError = useImageErrorHandler();

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Leadership Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leadershipTeam.map((member) => (
          <div key={member.id} className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-64 bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-indigo-600 font-medium mb-3">{member.title}</p>
              <p className="text-gray-600 mb-4">{member.bio}</p>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                  <a href={member.linkedin}>
                    <Linkedin size={14} /> LinkedIn
                  </a>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2" asChild>
                  <a href={`mailto:media@wealthhorizon.ai`}>
                    <Mail size={14} /> Contact
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

export default LeadershipSection;


import React, { useState } from "react";
import { JobPosition } from "./types";
import { Search, MapPin, Briefcase, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface OpenPositionsSectionProps {
  positions: JobPosition[];
  onViewPosition: (position: JobPosition) => void;
}

export const OpenPositionsSection: React.FC<OpenPositionsSectionProps> = ({ 
  positions, 
  onViewPosition 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredPositions = positions.filter(position => 
    position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    position.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    position.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <section>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Open Positions</h2>
        <div className="relative mt-4 md:mt-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search positions..."
            className="pl-10 w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
        {filteredPositions.length > 0 ? (
          filteredPositions.map((position, index) => (
            <React.Fragment key={position.id}>
              {index > 0 && <Separator />}
              <div className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{position.title}</h3>
                    <div className="flex flex-wrap items-center mt-2 text-sm text-gray-600">
                      <span className="mr-4 flex items-center">
                        <Briefcase size={16} className="mr-1" /> {position.department}
                      </span>
                      <span className="mr-4 flex items-center">
                        <MapPin size={16} className="mr-1" /> {position.location}
                      </span>
                      <span className="flex items-center">
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <Button 
                    className="mt-4 md:mt-0 flex items-center" 
                    variant="outline"
                    onClick={() => onViewPosition(position)}
                  >
                    View Position <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
              </div>
            </React.Fragment>
          ))
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-600">No positions match your search. Try different keywords or check back later.</p>
          </div>
        )}
      </div>
    </section>
  );
};

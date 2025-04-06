
import React from "react";
import { Sun, Moon, Cloud, Clock, Calendar, Video, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WelcomeHeader = () => {
  const getCurrentTimeOfDay = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good morning";
    if (hours < 18) return "Good afternoon";
    return "Good evening";
  };

  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date().toLocaleDateString('en-US', options);
  };
  
  const getTimeIcon = () => {
    const hours = new Date().getHours();
    if (hours < 6) return <Moon className="h-5 w-5 mr-2 text-indigo-400" />;
    if (hours < 18) return <Sun className="h-5 w-5 mr-2 text-amber-500" />;
    return <Moon className="h-5 w-5 mr-2 text-indigo-400" />;
  };

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl mb-6 border border-gray-100 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <div className="flex items-center">
            {getTimeIcon()}
            <h2 className="text-2xl font-semibold">{getCurrentTimeOfDay()}, James</h2>
          </div>
          <p className="text-gray-600 mt-1 flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formatDate()}</span>
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Video className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Next Advisory Meeting</p>
              <p className="text-xs text-gray-600">April 10, 2025 • 2:00 PM EST</p>
            </div>
            <Button size="sm" variant="ghost" className="ml-3" asChild>
              <Link to="/calendar">
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;

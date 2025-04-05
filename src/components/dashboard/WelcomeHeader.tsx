
import React from "react";
import { Sun, Clock, Calendar } from "lucide-react";

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

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl mb-6 border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <div className="flex items-center">
            <Sun className="h-5 w-5 mr-2 text-amber-500" />
            <h2 className="text-2xl font-semibold">{getCurrentTimeOfDay()}, James</h2>
          </div>
          <p className="text-gray-600 mt-1 flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formatDate()}</span>
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
          <Clock className="h-5 w-5 mr-2 text-blue-500" />
          <div>
            <p className="text-sm font-medium">Next Advisory Meeting</p>
            <p className="text-xs text-gray-600">April 10, 2025 • 2:00 PM EST</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;

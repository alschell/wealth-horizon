
import React from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const WelcomeHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Welcome to Wealth Pro</h1>
        <p className="text-gray-500 mt-1">Your comprehensive wealth management platform</p>
      </div>
      <Button className="mt-2 sm:mt-0">
        <Clock className="mr-2 h-4 w-4" /> Activity Log
      </Button>
    </div>
  );
};

export default WelcomeHeader;
